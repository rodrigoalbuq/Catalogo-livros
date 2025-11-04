import React from 'react';
import BookItem from './BookItem';
import type { BookListProps } from '../types/Book';
import './BookList.css';

const BookList: React.FC<BookListProps> = ({ books, onDelete, onToggleStatus, loadingOperations = new Set() }) => {
  
  if (books.length === 0) {
    return (
      <div className="book-list-empty">
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3 className="empty-title">Nenhum livro encontrado</h3>
          <p className="empty-description">
            Adicione o primeiro livro ao seu catálogo usando o formulário acima.
          </p>
        </div>
      </div>
    );
  }

  const readBooks = books.filter(book => book.status === 'Lido');
  const unreadBooks = books.filter(book => book.status === 'Não lido');

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2 className="list-title">📖 Meu Catálogo de Livros</h2>
        <div className="book-stats">
          <div className="stat-item">
            <span className="stat-number">{books.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item stat-read">
            <span className="stat-number">{readBooks.length}</span>
            <span className="stat-label">Lidos</span>
          </div>
          <div className="stat-item stat-unread">
            <span className="stat-number">{unreadBooks.length}</span>
            <span className="stat-label">Não lidos</span>
          </div>
        </div>
      </div>

      <div className="book-list">
        {books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
            isDeleting={loadingOperations.has(`delete-book-${book._id}`)}
            isTogglingStatus={loadingOperations.has(`toggle-status-${book._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;