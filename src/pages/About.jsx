import { useTranslation } from 'react-i18next'
import ProfileCards from '../components/ProfileCards'

export default function About() {
    const { t } = useTranslation('about');
    const members = t('cards', { returnObjects: true });

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div>
                <div>
                    <h1 className="text-3xl font-bold mb-6">{t('aemma.title')}</h1>
                    <p className="mb-4">{t('aemma.intro')}</p>
                    <p className="mb-8">{t('aemma.history')}</p>
                </div>

                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                        {members.map((card, index) => (
                            <ProfileCards
                                key={index}
                                name={card.name}
                                title={card.title}
                                bio={card.bio}
                                image={card.image || null}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Classes</h2>
                    <p>{t('aemma.beginnerClass')}</p>
                    <p>{t('aemma.advancedClass')}</p>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-4">{t('gio.title')}</h2>
                <p>{t('gio.text')}</p>
            </div>
        </div>
    );
}
