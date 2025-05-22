export default function ProfileCards({ name, title, bio, image}) {
    return (
        <div className="profileCard shadow-lg w-full text-center">
            <img
                src={image || '../img/placeholder-profile.png'}
                alt={name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4"
            />
            <div className="w-full">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="font-medium mb-2">{title}</p>
                <p className="text-sm">{bio}</p>
            </div>
        </div>
    );
}
