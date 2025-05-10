import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const images = [
    { src: './img/group1.jpg', alt: 'Group event' },
    { src: './img/b1.jpg', alt: 'Historical drills in action' },
    { src: './img/bc1.jpg', alt: 'Training with sidesword' },
    { src: './img/cs1.jpg', alt: 'Fencing' },
    { src: './img/mc1.jpg', alt: 'Fencing' },
];

export default function HeroBanner() {
    const { t } = useTranslation('home');

    return (
        <section className="relative h-[500px] mb-8 overflow-hidden rounded-lg shadow-md">
            {/* Background Carousel */}
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 4000 }}
                loop
                allowTouchMove={false}
                className="absolute inset-0 w-full h-full z-0"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-10 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-4xl font-bold mb-4 drop-shadow-md">{t('hero.title')}</h1>
                <p className="text-lg mb-6 drop-shadow-md">{t('hero.subtitle')}</p>
                <Link
                    to="/classes"
                    className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition drop-shadow-md"
                    >
                    {t('hero.ctaButton')}
                </Link>
            </div>
        </section>
    );
}
