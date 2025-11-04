import React, { useState } from 'react';
import type { BookFormProps, FormData } from '../types/Book';
import './BookForm.css';

const BookForm: React.FC<BookFormProps> = ({ onAddBook, isLoading = false }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    status: 'Não lido'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Usar loading externo ou interno
  const isCurrentlyLoading = isLoading || isSubmitting;

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Título deve ter pelo menos 2 caracteres';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Autor é obrigatório';
    } else if (formData.author.trim().length < 2) {
      newErrors.author = 'Nome do autor deve ter pelo menos 2 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newBook = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        status: formData.status
      };

      await onAddBook(newBook);

      // Limpar formulário após sucesso
      setFormData({
        title: '',
        author: '',
        status: 'Não lido'
      });
      setErrors({});
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      status: 'Não lido'
    });
    setErrors({});
  };

  // Verificar se há dados para limpar
  const hasDataToClear = formData.title.trim() !== '' || 
                        formData.author.trim() !== '' || 
                        formData.status !== 'Não lido';

  return (
    <div className="book-form-container">
      <h2 className="form-title">📚 Adicionar Novo Livro</h2>
      
      <form onSubmit={handleSubmit} className="book-form" noValidate>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'input-error' : ''}`}
            placeholder="Digite o título do livro"
            disabled={isCurrentlyLoading}
          />
          {errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Autor *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className={`form-input ${errors.author ? 'input-error' : ''}`}
            placeholder="Digite o nome do autor"
            disabled={isCurrentlyLoading}
          />
          {errors.author && (
            <span className="error-message">{errors.author}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status de Leitura
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="form-select"
            disabled={isCurrentlyLoading}
          >
            <option value="Não lido">Não lido</option>
            <option value="Lido">Lido</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={isCurrentlyLoading || !hasDataToClear}
            title={!hasDataToClear ? 'Nenhum dado para limpar' : 'Limpar formulário'}
          >
            Limpar
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isCurrentlyLoading || !formData.title.trim() || !formData.author.trim()}
          >
            {isCurrentlyLoading ? (
              <>
                <span className="spinner"></span>
                Adicionando...
              </>
            ) : (
              <>
                ➕ Adicionar Livro
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;