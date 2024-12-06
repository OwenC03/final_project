const CharacterCard = ({ character, onEdit, onDelete }) => (
    <div className="border p-4 rounded shadow-md bg-white">
        <h2 className="text-xl font-bold">{character.name}</h2>
        <p><strong>Race:</strong> {character.race}</p>
        <p><strong>Class:</strong> {character.class}</p>
        <p><strong>Level:</strong> {character.level}</p>
        <p><strong>Stats:</strong> STR {character.stats.strength}, DEX {character.stats.dexterity}, CON {character.stats.constitution}, INT {character.stats.intelligence}, WIS {character.stats.wisdom}, CHA {character.stats.charisma}</p>
        <div className="flex justify-between mt-4">
            <button onClick={() => onEdit(character)} className="bg-blue-500 text-white p-2 rounded">Edit</button>
            <button onClick={() => onDelete(character.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
    </div>
);

export default CharacterCard;