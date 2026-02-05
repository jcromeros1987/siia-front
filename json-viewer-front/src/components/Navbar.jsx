import React, { useState } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'entidades', label: 'ENTIDADES' },
    { id: 'academicos', label: 'ACADÉMICOS' },
    { id: 'produccion', label: 'PRODUCCIÓN' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
        
            <img 
                  src="./../siia.png"
                  alt="Logotipo UNAM" 
                  className="h-12 w-auto object-contain "
                />
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id === activeSection ? '' : item.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-gray-800 text-white'
                    : 'text-[#082C3B] hover:text-[#192C38] hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#082C3B]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
