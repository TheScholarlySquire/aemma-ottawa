export default function ProfileCards({ name, title, bio, image}) {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-full text-center">
            {image && (
                <img
                    src={image || './img/placeholder-profile.png'}
                    alt={name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-200"
                />
            )}
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-blue-600 font-medium mb-2">{title}</p>
            <p className="text-gray-700 text-sm">{bio}</p>
        </div>
    );
}
