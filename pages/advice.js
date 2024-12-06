import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import ScenarioAdvice from "../components/ScenarioAdvice";
import CharacterCard from "../components/CharacterCard";

const AdvicePage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { id: 1, name: "Aragorn", class: "Fighter", race: "Human" },
    { id: 2, name: "Gandalf", class: "Wizard", race: "Maia" },
    { id: 3, name: "Bilbo", class: "Rogue", race: "Hobbit" },
  ];

  return (
    <ProtectedRoute>
      <div>
        <h1>Select a Character</h1>
        <div className="flex space-x-4">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onEdit={() => setSelectedCharacter(char)}
              onDelete={() => alert("Delete character functionality here!")}
            />
          ))}
        </div>
        <ScenarioAdvice character={selectedCharacter} />
      </div>
    </ProtectedRoute>
  );
};

export default AdvicePage;
