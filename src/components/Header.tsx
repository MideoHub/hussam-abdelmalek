
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Home, BookText, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'الرئيسية' },
    { path: '/poems', icon: BookText, label: 'القصائد' },
    { path: '/books', icon: Book, label: 'الكتب' },
    { path: '/contact', icon: Mail, label: 'تواصل' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-poetry-gold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="font-rakkas text-2xl md:text-3xl text-white hover:text-poetry-cream transition-colors"
          >
            حسام عبدالملك
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-white text-poetry-gold'
                    : 'text-white hover:bg-white/10 hover:text-poetry-cream'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="فتح القائمة"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-poetry-gold border-t border-white/20">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-white text-poetry-gold'
                      : 'text-white hover:bg-white/10 hover:text-poetry-cream'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
