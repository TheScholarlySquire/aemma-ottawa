import { useTranslation } from 'react-i18next';
import HeroBanner from '../components/HeroBanner'
import AboutSection from '../components/AboutSection'
import ImageCarousel from '../components/ImageCarousel'
import InfoCards from '../components/InfoCards'

export default function Home() {
    const { t } = useTranslation('home');

    return (
        <div>
            <HeroBanner />
            <AboutSection />
            <ImageCarousel />
            <InfoCards />
        </div>
    );
}
