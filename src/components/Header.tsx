import React from 'react';
import { ServerIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-500 text-white p-2 rounded-md">
            <ServerIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">IT Support Language Assistant</h1>
            <p className="text-xs text-neutral-500">AI-powered multilingual support system</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;