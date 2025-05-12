import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
    const { t, i18n } = useTranslation('nav');
    console.log("MainLayout rendered");

    return (
        <div className="relative min-h-screen font-sans">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                {/* Header */}
                <header className="bg-gray-100 shadow-md hidden md:block">
                    <nav className="flex justify-between items-center px-6 py-4 border-b">
                        <Link to="/" className="text-xl font-bold text-blue-700">
                            {t('title')}
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-blue-600 hover:underline">{t('home')}</Link>
                            <Link to="/about" className="text-blue-600 hover:underline">{t('about')}</Link>
                            <Link to="/events" className="text-blue-600 hover:underline">{t('events')}</Link>
                            <Link to="/classes" className="text-blue-600 hover:underline">{t('classes')}</Link>
                            <Link to="/contact" className="text-blue-600 hover:underline">{t('contact')}</Link>

                            {/* Language Switcher */}
                            <div className="inline-flex rounded-full border overflow-hidden">
                                <button
                                    onClick={() => i18n.changeLanguage('en')}
                                    className={`px-3 py-1 text-sm ${i18n.language === 'en' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    EN
                                </button>
                                <button
                                    onClick={() => i18n.changeLanguage('fr')}
                                    className={`px-3 py-1 text-sm ${i18n.language === 'fr' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    FR
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Page Content */}
                <main className="flex-grow p-6">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-gray-200 text-center text-sm text-gray-600 py-4">
                    © {new Date().getFullYear()} {t('title')} — {t('footer')}
                </footer>
            </div>
        </div>
    );
}
