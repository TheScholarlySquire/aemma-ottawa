import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import ClassCards from '../components/ClassCards'
import ScholarCard from '../components/ScholarCard'
import SignUpModal from '../components/SignUpModal'

import '../styles/classes.css'

export default function Classes() {
    const { t } = useTranslation('classes');
    const courses = t('courseList', { returnObjects: true });
    const scholars = t('scholars', { returnObjects: true });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

    return (
    <>
        <div id="classesContainer">
            <div id="classesIntro">
                <h1 className="text-3xl font-bold mb-6">{t('classesPageTitle')}</h1>
                <p className="text-sm">{t('classesPageIntro')}</p>
            </div>

            <div id="classes" className="my-5 rounded-md p-5">
                <h2 className="text-2xl font-semibold mb-4">{t('classesTitle')}</h2>
                <div className="flex flex-wrap md:justify-between sm:justify-center gap-4">
                    {courses.map((course, index) => (
                        <ClassCards
                            key={index}
                            {...course}
                            onSignupClick={
                                course.lvl === 0 || course.lvl === 1
                                ? () => {
                                    setSelectedCourseIndex(index);
                                    setModalOpen(true);
                                }
                                : undefined
                            }
                        />
                    ))}
                </div>
            </div>

            <div id="groupDevelopments" className="rounded-md p-5">
                <h2 className="text-2xl font-semibold mb-4">{t('internalEvents')}</h2>
                <div id="scholars">
                    <div>
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
            </div>
        </div>

        <SignUpModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            selectedCourseIndex={selectedCourseIndex}
        />
    </>
);

}
