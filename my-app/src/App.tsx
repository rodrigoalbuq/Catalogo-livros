import { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import ApiUrlAlert from './components/ApiUrlAlert';
import { BookService } from './services/BookService';
import type { Book, NewBook, BookStatus } from './types/Book';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingOperations, setLoadingOperations] = useState<Set<string>>(new Set());
  const [showApiAlert, setShowApiAlert] = useState(false);

  // Função para gerenciar operações de loading não bloqueantes
  const setOperationLoading = useCallback((operationId: string, isLoading: boolean) => {
    setLoadingOperations(prev => {
      const newSet = new Set(prev);
      if (isLoading) {
        newSet.add(operationId);
      } else {
        newSet.delete(operationId);
      }
      return newSet;
    });
  }, []);

  // Carregar livros ao iniciar a aplicação
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const booksData = await BookService.getAllBooks();
      setBooks(booksData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar livros';
      setError(errorMessage);

      // Se o erro for relacionado à API, mostrar alerta de configuração
      if (errorMessage.includes('URL da API') ||
        errorMessage.includes('inválida') ||
        errorMessage.includes('expirada') ||
        errorMessage.includes('Falha ao carregar') ||
        errorMessage.includes('Erro de conexão')) {
        setShowApiAlert(true);
      }

      console.error('Erro ao carregar livros:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook: NewBook) => {
    const operationId = 'add-book';
    try {
      setOperationLoading(operationId, true);
      setError(null);

      // Toast de carregamento
      const loadingToast = toast.loading(`Adicionando "${newBook.title}"...`);

      const addedBook = await BookService.addBook(newBook);
      setBooks(prevBooks => [...prevBooks, addedBook]);

      // Toast de sucesso
      toast.success(`"${newBook.title}" adicionado com sucesso!`, {
        id: loadingToast,
        duration: 3000,
        icon: '📚'
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar livro';
      setError(errorMessage);

      // Toast de erro
      toast.error(`Erro ao adicionar "${newBook.title}": ${errorMessage}`, {
        duration: 4000,
        icon: '❌'
      });

      throw err;
    } finally {
      setOperationLoading(operationId, false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    const operationId = `delete-book-${id}`;

    // Encontrar o livro para mostrar o nome no toast
    const book = books.find(b => b._id === id);
    const bookTitle = book?.title || 'Livro';

    try {
      setOperationLoading(operationId, true);
      setError(null);

      // Toast de carregamento
      const loadingToast = toast.loading(`Removendo "${bookTitle}"...`);

      await BookService.deleteBook(id);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));

      // Toast de sucesso
      toast.success(`"${bookTitle}" removido com sucesso!`, {
        id: loadingToast,
        duration: 3000,
        icon: '🗑️'
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover livro';
      setError(errorMessage);

      // Toast de erro
      toast.error(`Erro ao remover "${bookTitle}": ${errorMessage}`, {
        duration: 4000,
        icon: '❌'
      });

      console.error('Erro ao remover livro:', err);
    } finally {
      setOperationLoading(operationId, false);
    }
  };

  const handleToggleStatus = async (id: string, newStatus: BookStatus) => {
    const operationId = `toggle-status-${id}`;

    // Encontrar o livro para mostrar o nome no toast
    const book = books.find(b => b._id === id);
    const bookTitle = book?.title || 'Livro';

    const statusText = newStatus === 'Lido' ? 'Lido' : 'Não Lido';

    try {
      setOperationLoading(operationId, true);
      setError(null);

      // Toast de carregamento
      const loadingToast = toast.loading(`Alterando status de "${bookTitle}"...`);

      await BookService.updateBookStatus(id, newStatus, book);
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book._id === id ? { ...book, status: newStatus } : book
        )
      );

      // Toast de sucesso
      toast.success(`"${bookTitle}" marcado como ${statusText}!`, {
        id: loadingToast,
        duration: 2500,
        icon: '✅'
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar status';
      setError(errorMessage);

      // Toast de erro
      toast.error(`Erro ao alterar status de "${bookTitle}": ${errorMessage}`, {
        duration: 4000,
        icon: '❌'
      });

      console.error('Erro ao atualizar status:', err);
    } finally {
      setOperationLoading(operationId, false);
    }
  };

  // Função para tentar reconectar quando houver erro
  const handleRetry = useCallback(() => {
    setError(null);
    loadBooks();
  }, []);

  // Função para limpar mensagens de erro
  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  // Renderizar componente de loading inicial
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Carregando catálogo de livros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Alerta de configuração da API */}
      {showApiAlert && (
        <ApiUrlAlert onDismiss={() => setShowApiAlert(false)} />
      )}

      <header className="app-header">
        <h1 className="app-title">📚 Contos Infinitos</h1>
        <p className="app-subtitle">
          Gerencie sua biblioteca de catálogos de livros com facilidade e organização
        </p>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Banner de erro não bloqueante */}
          {error && (
            <div className="error-banner">
              <div className="error-content">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
                <div className="error-actions">
                  <button onClick={handleRetry} className="btn-retry" title="Tentar carregar novamente">
                    🔄 Tentar Novamente
                  </button>
                  <button onClick={dismissError} className="error-dismiss" title="Fechar mensagem">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Formulário para adicionar livros */}
          <BookForm
            onAddBook={handleAddBook}
            isLoading={loadingOperations.has('add-book')}
          />

          {/* Lista de livros */}
          <BookList
            books={books}
            onDelete={handleDeleteBook}
            onToggleStatus={handleToggleStatus}
            loadingOperations={loadingOperations}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>
          &copy; 2025 Contos Infinitos |
          <strong> Desenvolvido por <a
            href="https://github.com/rodrigoalbuq"
            target="_blank"
            rel="noopener noreferrer"
            className="author-link"
          >
            Rodrigo Albuquerque
          </a> com React + TypeScript</strong> |
          <em> API: crudcrud.com</em> | Todos os direitos reservados.
        </p>
      </footer>

      {/* Componente Toaster para notificações */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
            padding: '12px 16px'
          },
          success: {
            style: {
              background: '#10b981',
              color: '#fff'
            }
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff'
            }
          },
          loading: {
            style: {
              background: '#3b82f6',
              color: '#fff'
            }
          }
        }}
      />
    </div>
  );
}

export default App;
