export default function ClassCards({ type, time, description}) {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 max-w-xs text-center">
            <h3 className="text-xl font-semibold">{type}</h3>
            <p className="text-blue-600 font-medium mb-2">{time}</p>
            <p className="text-gray-700 text-sm">{description}</p>
        </div>
    );
}
