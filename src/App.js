import React from 'react';
import ROTC from './components/ROTC';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-6 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-xl font-bold text-gray-900">
            ROTC 프롬프트 프레임워크
          </h1>
        </div>
      </header>
      
      <main className="py-8">
        <ROTC />
      </main>
      
      <footer className="py-4 text-center text-gray-600">
        <p>© 2025 Isabelle Choi. Made with ❤️ </p>
      </footer>
    </div>
  );
}

export default App;