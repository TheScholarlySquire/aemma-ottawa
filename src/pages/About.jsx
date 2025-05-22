import { useTranslation, Trans } from 'react-i18next'
import ProfileCards from '../components/ProfileCards'

import '../styles/about.css'

export default function About() {
    const { t } = useTranslation('about');
    const ranks = t('ranks', { returnObjects: true });
    const members = t('team', { returnObjects: true });

    return (
        <div id="aboutContainer">
            <div id="aemma-general">
                <div id="intro" className="aboutContent">
                    <h1 className="text-3xl font-bold mb-6">{t('aemma.title')}</h1>
                    <p>{t('aemma.intro1')}</p>
                    <p>{t('aemma.intro2')}</p>
                </div>

                <div id="mission" className="aboutContent">
                    <h2 className="text-2xl font-semibold mb-6">{t('aemma.mission')}</h2>
                    <p className="py-10"><em>{t('aemma.missionDesc')}</em></p>
                </div>

                <div id="coc" className="aboutContent">
                    <h2 className="text-2xl font-semibold mb-6">{t('aemma.cocTitle')}</h2>
                    <p>
                        <Trans
                            i18nKey="aemma.cocDesc"
                            ns="about"
                            components={{
                                1: (
                                    <a
                                        href={t('aemma.cocLink', { ns: 'about' })}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 underline hover:text-blue-900"
                                    />
                                ),
                            }}
                        />
                    </p>
                </div>
                <div className="skewed"></div>
            </div>
            <div id="aemma-ottawa">
                <div id="ranks" className="aboutContent mt-10">
                    <h2 className="text-2xl font-semibold mb-6">{t('aemma.rankingTitle')}</h2>
                    <div className="grid gap-6 md:grid-cols-2 sm:grid-cols-1 justify-items-center">
                        {ranks.map((ranks, index) => (
                            <div
                                id={`rank-`+index}
                                key={ranks.name}
                                className="ranksCard shadow-lg rounded-2xl p-4 sm:w-full text-center"
                            >
                                <h3 className="text-xl font-semibold">{ranks.name}</h3>
                                <p className="text-left my-5 font-medium mb-2">{ranks.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="team" className="aboutContent mt-10">
                    <h2 className="text-2xl font-semibold">{t('aemma.ourTeam')}</h2>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 mt-5 justify-items-center">
                        {members.map((team, index) => (
                            <ProfileCards
                                key={index}
                                name={team.name}
                                title={team.title}
                                bio={team.bio}
                                image={team.image || null}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div id="history" className="aboutContent mt-16">
                <h2 className="text-2xl font-semibold mb-4">{t('gio.title')}</h2>
                <p>{t('gio.text')}</p>
            </div>
        </div>
    );
}
