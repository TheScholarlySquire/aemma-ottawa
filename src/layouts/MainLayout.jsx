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
                    <nav id="topNav" className="flex justify-between items-center px-6 py-4 border-b">
                        <Link to="/" className="navLink text-xl font-bold">
                            {t('title')}<img src="./img/AEMMA-logo.png" style={{ width:'35px', height:'35px', display:'inline-block', marginLeft: '10px' }}/>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="navLink hover:underline">{t('home')}</Link>
                            <Link to="/about" className="navLink hover:underline">{t('about')}</Link>
                            <Link to="/events" className="navLink hover:underline">{t('events')}</Link>
                            <Link to="/classes" className="navLink hover:underline">{t('classes')}</Link>
                            <Link to="/contact" className="navLink hover:underline">{t('contact')}</Link>
                            <Link to="/faq" className="navLink hover:underline">{t('faq')}</Link>

                            {/* Language Switcher */}
                            <div className="inline-flex rounded-full border overflow-hidden">
                                <button
                                    onClick={() => i18n.changeLanguage('en')}
                                    className={`px-3 py-1 text-sm hover:cursor-pointer ${i18n.language === 'en' ? 'bg-blue-100 text-blue-800' : 'text-[#f1f1f1] hover:text-gray-600 hover:bg-gray-100'}`}>
                                    EN
                                </button>
                                <button
                                    onClick={() => i18n.changeLanguage('fr')}
                                    className={`px-3 py-1 text-sm hover:cursor-pointer ${i18n.language === 'fr' ? 'bg-blue-100 text-blue-800' : 'text-[#f1f1f1] hover:text-gray-600 hover:bg-gray-100'}`}>
                                    FR
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Page Content */}
                <main className="flex-grow">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-gray-200 text-sm text-gray-600 py-8 px-[9vw]">
                    <div className="container flex flex-wrap mx-auto gap-6 items-center " style={{justifyContent: "center"}}>
                        <a href="https://www.instagram.com/aemma_ottawa/" className="p-[5px]"><span className="hidden">{t('follow')} Instagram</span><img className=" aspect-square w-[29px]" src="./img/icon_ig.png" alt="Instagram"/></a>
                        <a href="https://www.facebook.com/AEMMAOttawa/" className="p-[5px]"><span className="hidden">{t('follow')} Facebook</span><img className=" aspect-square w-[29px]" src="./img/icon_fb.png" alt="Facebook"/></a>
                        <span className="w-full flex-[1 0 100%] text-center md:flex-1 md:w-[auto] md:text-right">© {new Date().getFullYear()} {t('title')} — {t('footer')}</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
