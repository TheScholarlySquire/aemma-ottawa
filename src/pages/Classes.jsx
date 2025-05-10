import { useTranslation } from 'react-i18next'
import ClassCards from '../components/ClassCards'
import ScholarCard from '../components/ScholarCard';

export default function Classes() {
    const { t } = useTranslation('classes');
    const courses = t('courseList', { returnObjects: true });
    const scholars = t('scholars', { returnObjects: true });

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div id="classesIntro">
                <h1 className="text-3xl font-bold mb-6">{t('classesPageTitle')}</h1>
                <p className="text-gray-700 text-sm">{t('classesPageIntro')}</p>
            </div>

            <div id="classes" className="my-5 rounded-md p-5">
                <h2 className="text-2xl font-semibold mb-4">{t('classesTitle')}</h2>
                <div className="flex flex-wrap md:justify-apart sm:justify-center gap-4">
                    {courses.map((classes, index) => (
                        <ClassCards
                            key={classes.type}
                            {...classes}
                        />
                    ))}
                </div>
            </div>

            <div className="my-5 rounded-md p-5">
                <h2 className="text-2xl font-semibold mb-4">{t('internalEvents')}</h2>
                <div id="scholars">
                    <div className="">
                        {scholars.map((scholar, index) => (
                            <ScholarCard
                                key={scholar.id}
                                name={scholar.name}
                                challenge={scholar.description}
                                location={scholar.location}
                                date={scholar.datetime}
                            />
                        ))}
                    </div>
                </div>

                <div id="freescholars" className="my-5 p-5">

                </div>
            </div>
        </div>
    );
}
