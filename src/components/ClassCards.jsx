export default function ClassCards({ lvl, type, time, description, signupUrl, signupBtn, onSignupClick }) {
    return (
        <div className="classCard bg-white shadow-lg md:w-[30%] rounded-2xl p-4 flex flex-col justify-between">
            <div className="text-center">
                <h3 className="text-xl font-semibold">{type}</h3>
                <p className="text-blue-600 font-medium mb-2">{time}</p>
                <p className="text-gray-700 text-sm">{description}</p>
            </div>
            {( lvl === 0 || lvl === 1 ) && (
                <div className="text-center mt-5">
                    {onSignupClick ? (
                        <button
                            onClick={onSignupClick}
                            className="siteBtn inline-block px-6 py-2 rounded hover:cursor-pointer"
                        >
                            {signupBtn}
                        </button>
                    ) : (
                        <a
                            href={signupUrl || '#'}
                            className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition hover:cursor-pointer"
                        >
                            {signupBtn}
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
