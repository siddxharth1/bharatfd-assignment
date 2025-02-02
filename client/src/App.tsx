import FaqList from './components/FaqList';
import CreateFaqForm from './components/CreateFaqForm';
import { useState } from 'react';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleFaqCreated = () => {
    setRefreshKey(prev => prev + 1);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1 className="title">FAQ Management</h1>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="button"
          >
            <span>+</span> Add FAQ
          </button>
        </div>
      </header>

      <main className="main">
        {isCreateModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2 className="title">Create New FAQ</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="close-button"
                >
                  ✕
                </button>
              </div>
              <CreateFaqForm onSuccess={handleFaqCreated} />
            </div>
          </div>
        )}
        <div>
          <FaqList key={refreshKey} />
        </div>
      </main>
    </div>
  );
}

export default App;
