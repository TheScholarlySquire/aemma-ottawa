import { useTranslation, Trans } from 'react-i18next'
import FaqCards from '../components/faqCards'

import '../styles/faq.css'

export default function Faq() {
    const { t } = useTranslation('faq');
    const faqs = t('items', { returnObjects: true });

    return (
        <div id="faqContainer">
            <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
            <div>
                {faqs.map((item, index) => (
                    <FaqCards
                        key={index}
                        q={item.q}
                        a={item.a}
                    />
                ))}
            </div>
        </div>
    );
}
