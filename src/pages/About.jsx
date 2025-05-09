import { useTranslation } from 'react-i18next'
import ProfileCards from '../components/ProfileCards'
import ClassCards from '../components/ClassCards'

export default function About() {
    const { t } = useTranslation('about');
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
                    <p className="py-15 border-y-4 border-black">{t('aemma.missionDesc')}</p>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6">{t('aemma.cocTitle')}</h2>
                    <p>{t('aemma.cocDesc')}</p>
                </div>

                <div>
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-6">{t('aemma.rankingTitle')}</h2>
                        <ol className="list-decimal ml-15">
                            <li className="my-2">{t('aemma.rankingRecruit')}</li>
                            <li className="my-2">{t('aemma.rankingScholar')}</li>
                            <li className="my-2">{t('aemma.rankingFreeScholar')}</li>
                            <li className="my-2">{t('aemma.rankingProvost')}</li>
                        </ol>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-6">{t('aemma.ourTeam')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
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
