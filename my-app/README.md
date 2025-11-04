# 📚 Catálogo de Livros

Uma aplicação React com TypeScript para gerenciar seu catálogo pessoal de livros, com integração à API real do crudcrud.com.

## 🚀 Funcionalidades

- ✅ **Listagem de livros** - Visualize todos os livros cadastrados
- ➕ **Adicionar livros** - Formulário para cadastrar novos livros
- 🗑️ **Remover livros** - Exclua livros do catálogo
- 🔄 **Alterar status** - Marque livros como "Lido" ou "Não lido"
- 📊 **Estatísticas** - Visualize contador de livros lidos/não lidos
- 📱 **Responsivo** - Interface adaptada para desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e servidor de desenvolvimento
- **Axios** - Cliente HTTP para requisições à API
- **CSS3** - Estilização com Flexbox e Grid
- **crudcrud.com** - API REST para persistência de dados

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação e Configuração

1. **Clone o repositório** (se aplicável):
   ```bash
   git clone [url-do-repositorio]
   cd catalogo-livros/my-app
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure a URL da API**:
   - Acesse https://crudcrud.com
   - Copie a URL única gerada
   - Abra o arquivo `src/services/BookService.ts`
   - Substitua a constante `API_BASE_URL` pela sua URL:
   ```typescript
   const API_BASE_URL = 'https://crudcrud.com/api/SUA_URL_AQUI';
   ```

4. **Execute a aplicação**:
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**:
   - Abra http://localhost:5173

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── BookForm.tsx    # Formulário para adicionar livros
│   ├── BookForm.css    # Estilos do formulário
│   ├── BookItem.tsx    # Item individual de livro
│   ├── BookItem.css    # Estilos do item
│   ├── BookList.tsx    # Lista de livros
│   └── BookList.css    # Estilos da lista
├── services/           # Serviços de API
│   └── BookService.ts  # Comunicação com crudcrud.com
├── types/              # Definições TypeScript
│   └── Book.ts         # Interfaces e tipos
├── App.tsx             # Componente principal
├── App.css             # Estilos principais
├── index.css           # Estilos globais
└── main.tsx            # Ponto de entrada
```

## 🔍 Tipagem TypeScript

### Interface Book
```typescript
interface Book {
  _id?: string;     // ID gerado pela API
  title: string;    // Título do livro
  author: string;   // Autor do livro
  status: BookStatus; // Status de leitura
}

type BookStatus = 'Lido' | 'Não lido';
```

### Props dos Componentes
- `BookFormProps` - Props do formulário
- `BookListProps` - Props da lista
- `BookItemProps` - Props do item individual

## 🌐 Integração com API

A aplicação utiliza o serviço gratuito crudcrud.com para persistência:

### Operações Suportadas

- **GET** `/books` - Listar todos os livros
- **POST** `/books` - Adicionar novo livro
- **PUT** `/books/:id` - Atualizar status do livro
- **DELETE** `/books/:id` - Remover livro

### Tratamento de Erros

- ✅ Timeout de requisições (10 segundos)
- ✅ Interceptadores para erros globais
- ✅ Mensagens de erro amigáveis
- ✅ Fallbacks para falhas de rede

## 🎨 Design e UX

- **Design responsivo** com breakpoints para mobile
- **Feedback visual** para todas as ações
- **Loading states** durante requisições
- **Confirmação** antes de remover livros
- **Validação** de formulários em tempo real
- **Animações CSS** suaves

## 📱 Responsividade

- **Desktop** (1024px+) - Layout em duas colunas
- **Tablet** (768px-1023px) - Layout adaptado
- **Mobile** (< 768px) - Layout empilhado

## 🚦 Como Usar

1. **Primeira vez**: Configure a URL da API conforme instruções
2. **Adicionar livro**: Preencha o formulário e clique em "Adicionar"
3. **Alterar status**: Clique no botão de status do livro
4. **Remover livro**: Clique no botão "Remover" e confirme
5. **Visualizar estatísticas**: Observe os contadores no topo da lista

## 🐛 Solução de Problemas

### Erro de CORS
Se encontrar erros de CORS, verifique se:
- A URL da API está correta
- Não há caracteres especiais na URL
- A API do crudcrud.com está funcionando

### Erro de Conexão
- Verifique sua conexão com a internet
- Teste a URL da API diretamente no navegador
- Gere uma nova URL no crudcrud.com se necessário

## 🔮 Melhorias Futuras

- [ ] Busca e filtros por título/autor
- [ ] Ordenação personalizada
- [ ] Categorias de livros
- [ ] Export/Import de dados
- [ ] Dark mode
- [ ] PWA (Progressive Web App)
- [ ] Offline support

## 📝 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificação de código
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido por Rodrigo Albuquerque usando React + TypeScript**