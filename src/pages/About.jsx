import { useTranslation, Trans } from 'react-i18next'
import ProfileCards from '../components/ProfileCards'
import ClassCards from '../components/ClassCards'

export default function About() {
    const { t } = useTranslation('about');
    const ranks = t('ranks', { returnObjects: true });
    const members = t('team', { returnObjects: true });
    const classes = t('classes', { returnObjects: true });

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div>
                <div className="my-10">
                    <h1 className="text-3xl font-bold mb-6">{t('aemma.title')}</h1>
                    <p>{t('aemma.intro1')}</p>
                    <p>{t('aemma.intro2')}</p>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6">{t('aemma.mission')}</h2>
                    <p className="py-10 border-y-4 border-black"><em>{t('aemma.missionDesc')}</em></p>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6">{t('aemma.cocTitle')}</h2>
                    <Trans i18nKey="aemma.cocDesc" t={t}>
                        Studying a martial art... <a className="underline" href="https://drive.google.com/file/d/1Hz3CQHkULfceY009M7E7RWXZgiUsAJ0j/view" target="_blank" rel="noopener noreferrer">Code of Conduct</a>
                    </Trans>
                </div>

                <div>
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-6">{t('aemma.rankingTitle')}</h2>
                        <div className="grid gap-6 md:grid-cols-2 sm:grid-cols-1 justify-items-center">
                            {ranks.map((ranks, index) => (
                                <div className="bg-white shadow-lg rounded-2xl p-4 sm:w-full text-center">
                                    <h3 className="text-xl font-semibold">{ranks.name}</h3>
                                    <p className="text-gray-600 text-left my-5 font-medium mb-2">{ranks.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-6">{t('aemma.ourTeam')}</h2>
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 mt-12 justify-items-center">
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

                <div className="mt-20 border border-slate-300 rounded-md p-5">
                    <h2 className="text-2xl font-semibold mb-4">{t('aemma.classesTitle')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {classes.map((classes, index) => (
                            <ClassCards
                                key={index}
                                type={classes.type}
                                time={classes.time}
                                description={classes.description}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-4">{t('gio.title')}</h2>
                <p>{t('gio.text')}</p>
            </div>
        </div>
    );
}
