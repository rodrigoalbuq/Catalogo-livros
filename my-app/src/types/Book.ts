// Tipos e interfaces para o catálogo de livros

// Status possíveis para um livro
export type BookStatus = 'Lido' | 'Não lido';

// Interface principal para um livro
export interface Book {
  _id?: string; // ID gerado pela API crudcrud.com
  title: string;
  author: string;
  status: BookStatus;
}

// Interface para criar um novo livro (sem ID)
export interface NewBook {
  title: string;
  author: string;
  status: BookStatus;
}

// Props para o componente BookForm
export interface BookFormProps {
  onAddBook: (book: NewBook) => void;
  isLoading?: boolean; // Para indicar estado de loading não bloqueante
}

// Props para o componente BookList
export interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, newStatus: BookStatus) => void;
  loadingOperations?: Set<string>; // Para rastrear operações em andamento
}

// Props para o componente BookItem
export interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, newStatus: BookStatus) => void;
  isDeleting?: boolean; // Estado de loading para deleção
  isTogglingStatus?: boolean; // Estado de loading para alteração de status
}

// Interface para dados do formulário
export interface FormData {
  title: string;
  author: string;
  status: BookStatus;
}

// Interface para resposta da API
export interface ApiResponse<T> {
  data: T;
  status: number;
}

// Interface para tratamento de erros da API
export interface ApiError {
  message: string;
  status?: number;
}