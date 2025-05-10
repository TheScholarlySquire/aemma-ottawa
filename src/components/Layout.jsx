import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Layout() {
    const { t, i18n } = useTranslation('nav');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Header */}
            <header className="bg-gray-100 shadow-md">
                <nav className="container mx-auto p-4 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-blue-700">{t('title')}</Link>
                    <div className="space-x-4">
                        <Link to="/" className="text-blue-600 hover:underline">{t('home')}</Link>
                        <Link to="/about" className="text-blue-600 hover:underline">{t('about')}</Link>
                        <Link to="/events" className="text-blue-600 hover:underline">{t('events')}</Link>
                        <Link to="/classes" className="text-blue-600 hover:underline">{t('classes')}</Link>
                        <Link to="/contact" className="text-blue-600 hover:underline">{t('contact')}</Link>

                        <div className="inline-flex rounded-full border overflow-hidden">
                            <button
                                onClick={() => i18n.changeLanguage('en')}
                                className={`px-3 py-1 text-sm ${i18n.language === 'en' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'} hover:cursor-pointer `}>
                                EN
                            </button>
                            <button
                                onClick={() => i18n.changeLanguage('fr')}
                                className={`px-3 py-1 text-sm ${i18n.language === 'fr' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'} hover:cursor-pointer`}>
                                FR
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-center text-sm text-gray-600 py-4 mt-8">
                © {new Date().getFullYear()} {t('title')} — {t('footer')}
            </footer>
        </div>
    );
}
