const CharacterCard = ({ character, onEdit, onDelete, buttonLabels = {edit: "Edit", delete: "Delete"} }) => {
    const stats = character.stats ||{
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{character.name}</h2>
      <p>
        <strong>Race:</strong> {character.race}
      </p>
      <p>
        <strong>Class:</strong> {character.characterClass}
      </p>
      <p>
        <strong>Level:</strong> {character.level}
      </p>
      <p>
        <strong>Stats:</strong> 
        STR {stats.strength}, 
        DEX {stats.dexterity}, 
        CON {stats.constitution}, 
        INT {stats.intelligence}, 
        WIS {stats.wisdom}, 
        CHA {stats.charisma}
      </p>
      <div className="flex justify-between mt-4">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {buttonLabels.edit}
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          {buttonLabels.delete}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
