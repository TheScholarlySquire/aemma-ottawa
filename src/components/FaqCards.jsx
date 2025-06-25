import { Trans, useTranslation } from 'react-i18next'

export default function faqCard({ q, a }) {

    return (
        <div className="bg-white shadow-md p-4 w-full my-5">
            <h3 className="font-semibold">{q}</h3>
            <hr />
            <p className="text-gray-700 mt-1">
                <Trans
                    i18nKey={a}
                    components={{
                        1: <a href="/classes" className="text-blue-600 underline hover:text-blue-800 hover:cursor-pointer" />
                    }}
                />
            </p>
        </div>
    );
}
