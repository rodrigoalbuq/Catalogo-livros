import React from 'react';
import type { BookItemProps, BookStatus } from '../types/Book';
import './BookItem.css';

const BookItem: React.FC<BookItemProps> = ({ 
  book, 
  onDelete, 
  onToggleStatus, 
  isDeleting = false, 
  isTogglingStatus = false 
}) => {
  
  const handleDelete = () => {
    if (book._id) {
      onDelete(book._id);
    }
  };

  const handleToggleStatus = () => {
    if (book._id) {
      const newStatus: BookStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
      onToggleStatus(book._id, newStatus);
    }
  };

  const getStatusClass = () => {
    return book.status === 'Lido' ? 'status-read' : 'status-unread';
  };

  const getStatusIcon = () => {
    return book.status === 'Lido' ? '✓' : '○';
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <div className="book-header">
          <h3 className="book-title">{book.title}</h3>
          <span className={`book-status ${getStatusClass()}`}>
            <span className="status-icon">{getStatusIcon()}</span>
            {book.status}
          </span>
        </div>
        <p className="book-author">por {book.author}</p>
      </div>
      
      <div className="book-actions">
        <button
          className="btn btn-toggle"
          onClick={handleToggleStatus}
          title={`Marcar como ${book.status === 'Lido' ? 'Não lido' : 'Lido'}`}
          disabled={isTogglingStatus}
        >
          {isTogglingStatus ? (
            <>
              <span className="spinner"></span>
              Atualizando...
            </>
          ) : (
            book.status === 'Lido' ? 'Marcar como Não lido' : 'Marcar como Lido'
          )}
        </button>
        
        <button
          className="btn btn-delete"
          onClick={handleDelete}
          title="Remover livro"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <span className="spinner"></span>
              Removendo...
            </>
          ) : (
            <>🗑️ Remover</>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookItem;