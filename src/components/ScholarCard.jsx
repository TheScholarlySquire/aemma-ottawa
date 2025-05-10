export default function ScholarCard({ id, name, challenge, date, location }) {
const eventDate = new Date(date);
const formattedDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'long',
    timeStyle: 'short',
}).format(eventDate);

    return (
        <div className="bg-white shadow-md p-4 w-full my-5">
            <h3 className="text-xl font-bold text-blue-800">{name}</h3>
            <p className="text-sm text-gray-500 my-2 flex justify-between flex-nowrap"><span>{formattedDate}</span><span>{location}</span></p>
            <hr />
            <p className="text-gray-700 mt-1">{challenge}</p>
        </div>
    );
}
