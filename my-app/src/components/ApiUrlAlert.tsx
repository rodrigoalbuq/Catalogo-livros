import React from 'react';
import './ApiUrlAlert.css';

interface ApiUrlAlertProps {
  onDismiss: () => void;
}

const ApiUrlAlert: React.FC<ApiUrlAlertProps> = ({ onDismiss }) => {
  return (
    <div className="api-url-alert">
      <div className="alert-content">
        <div className="alert-icon">⚠️</div>
        <div className="alert-body">
          <h3 className="alert-title">⚙️ Configuração da API Necessária</h3>
          <p className="alert-text">
            Para usar a aplicação, você precisa configurar sua própria URL do <strong>crudcrud.com</strong>:
          </p>
          <ol className="alert-steps">
            <li>
              Acesse <a href="https://crudcrud.com" target="_blank" rel="noopener noreferrer" className="alert-link">
                <strong>crudcrud.com</strong>
              </a>
            </li>
            <li>Copie a <em>URL única</em> gerada automaticamente</li>
            <li>Abra o arquivo <code className="code-highlight">src/services/BookService.ts</code></li>
            <li>Substitua a URL na constante <code className="code-highlight">API_BASE_URL</code></li>
            <li>Reinicie o servidor de desenvolvimento (<code className="code-inline">npm run dev</code>)</li>
          </ol>
          <div className="alert-example">
            <div className="example-title">💡 Exemplo de configuração:</div>
            <div className="code-block">
              <code>const API_BASE_URL = 'https://crudcrud.com/api/<span className="highlight-url">SUA_URL_AQUI</span>';</code>
            </div>
          </div>
          <div className="alert-note">
            <span className="note-icon">ℹ️</span>
            <span className="note-text">A URL é única para cada sessão e expira após algumas horas.</span>
          </div>
        </div>
        <button 
          className="alert-dismiss"
          onClick={onDismiss}
          aria-label="Fechar alerta"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ApiUrlAlert;