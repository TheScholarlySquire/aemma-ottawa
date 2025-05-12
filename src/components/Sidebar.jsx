import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'events', path: '/events' },
  { name: 'classes', path: '/classes' },
  { name: 'contact', path: '/contact' },
];

export default function Sidebar() {
  const { t, i18n } = useTranslation('nav');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile header with toggle */}
      <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-3">
        <span className="font-bold text-lg">{t('title')}</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          {t('title')}
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-800 font-semibold' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {t(item.name)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Language Switcher */}
        <div className="p-4 border-t border-gray-700 flex justify-center space-x-2">
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`px-3 py-1 text-sm rounded ${
              i18n.language === 'en'
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => i18n.changeLanguage('fr')}
            className={`px-3 py-1 text-sm rounded ${
              i18n.language === 'fr'
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            FR
          </button>
        </div>
      </div>
    </div>
  );
}
