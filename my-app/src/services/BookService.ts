import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Book, NewBook, BookStatus } from '../types/Book';

// URL base da API crudcrud.com
// IMPORTANTE: Esta URL deve ser substituída por uma URL única obtida em https://crudcrud.com
// Durante desenvolvimento, usa proxy do Vite para contornar CORS
const API_BASE_URL = import.meta.env.DEV
    ? '/api/60049d94784c4f4c8c3f1d156dc9a4de'  // Proxy local para dev
    : 'https://crudcrud.com/api/60049d94784c4f4c8c3f1d156dc9a4de'; // URL direta para produção

// Configuração do axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Serviços da API para livros
export class BookService {

    /**
     * Buscar todos os livros
     */
    static async getAllBooks(): Promise<Book[]> {
        try {
            const response: AxiosResponse<Book[]> = await api.get('/books');
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar livros:', error);

            // Verificar se é erro 400 (Bad Request) - indica URL da API inválida/expirada
            if (error.response?.status === 400) {
                throw new Error('URL da API crudcrud.com inválida ou expirada. Clique em "⚙️ Configurar API" para obter uma nova URL.');
            }

            throw new Error('Falha ao carregar os livros. Tente novamente.');
        }
    }

    /**
     * Adicionar um novo livro
     */
    static async addBook(newBook: NewBook): Promise<Book> {
        try {
            const response: AxiosResponse<Book> = await api.post('/books', newBook);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
            throw new Error('Falha ao adicionar o livro. Tente novamente.');
        }
    }

    /**
     * Remover um livro
     */
    static async deleteBook(id: string): Promise<void> {
        try {
            await api.delete(`/books/${id}`);
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
            throw new Error('Falha ao remover o livro. Tente novamente.');
        }
    }

    /**
     * Atualizar o status de um livro
     */
    static async updateBookStatus(id: string, status: BookStatus, currentBook?: Book): Promise<Book> {
        try {
            // Se temos o livro atual, enviamos todos os dados para preservar title e author
            const updateData = currentBook
                ? { title: currentBook.title, author: currentBook.author, status }
                : { status };

            const response: AxiosResponse<Book> = await api.put(`/books/${id}`, updateData);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar status do livro:', error);
            throw new Error('Falha ao atualizar o status do livro. Tente novamente.');
        }
    }

    /**
     * Atualizar um livro completo
     */
    static async updateBook(id: string, updatedBook: Partial<NewBook>): Promise<Book> {
        try {
            const response: AxiosResponse<Book> = await api.put(`/books/${id}`, updatedBook);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            throw new Error('Falha ao atualizar o livro. Tente novamente.');
        }
    }
}

// Interceptor para tratamento global de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Timeout da requisição');
            throw new Error('A requisição demorou muito para responder. Tente novamente.');
        }

        if (!error.response) {
            console.error('Erro de rede');
            throw new Error('Erro de conexão. Verifique sua internet.');
        }

        switch (error.response.status) {
            case 400:
                throw new Error('URL da API crudcrud.com inválida ou expirada. Configure uma nova URL.');
            case 404:
                throw new Error('Recurso não encontrado.');
            case 500:
                throw new Error('Erro interno do servidor.');
            default:
                throw new Error('Erro inesperado. Tente novamente.');
        }
    }
);

export default api;