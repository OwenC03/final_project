import { useState } from "react";
import { races, classes } from "../utils/constants";

const CharacterForm = ({ onSubmit }) => {
  const [character, setCharacter] = useState({
    name: "",
    race: "",
    characterClass: "", // Changed from `class` to avoid conflicts
    level: 1,
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  const handleStatChange = (stat, value) => {
    setCharacter({
      ...character,
      stats: { ...character.stats, [stat]: parseInt(value, 10) },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(character);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={character.name}
          onChange={handleChange}
          className="border p-2"
          required
        />
      </div>

      <div>
        <label>Race:</label>
        <select
          name="race"
          value={character.race}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select</option>
          {races.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Class:</label>
        <select
          name="characterClass"
          value={character.characterClass}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(character.stats).map((stat) => (
        <div key={stat}>
          <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</label>
          <input
            type="number"
            value={character.stats[stat]}
            onChange={(e) => handleStatChange(stat, e.target.value)}
            className="border p-2"
            min="1"
            max="20"
          />
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Save Character
      </button>
    </form>
  );
};

export default CharacterForm;