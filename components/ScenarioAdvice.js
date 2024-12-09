const ScenarioAdvice = ({ character }) => {
    if (!character) {
      return (
        <div className="p-4 border rounded shadow-md bg-white">
          <p>Please select a character to view scenario advice.</p>
        </div>
      );
    }
  
    const getAdvice = () => {
      const adviceMap = {
        Fighter: "Use your high strength or dexterity to engage in melee combat!",
        Wizard: "Keep your distance and use spells effectively.",
        Rogue: "Take advantage of stealth and sneak attacks.",
        Barbarian: "Use your rage ability to take less damage, and attack aggressively",
        Bard: "Use your movement to get away from enemies, and support your allies with spells",
        Cleric: "Observe your surroundings, if allies need help heal them, if near enemies attack",
        Druid: "Use your wild shape ability to change shapes and attack enemies",
        Monk: "Approach the enemies and use your ki points to deal massive damage",
        Paladin: "Observe your surroundings, if allies need health use lay on hands, if far away from enemies use ranged spells or support spells, if close to allies attack and use Smite abilities as wanted",
        Ranger: "Use your spells to select a enemy to gain advantages against",
        Sorcerer: "Use your spells and sorcery points to make the most of each of your turns",
        Warlock: "Attack enemies with spells",
        Artificer: "combined your infusions and spells to adapt to any situation",

      };
  
      return adviceMap[character.characterClass] || "Adapt your actions to the scenario.";
    };
  
    return (
      <div className="p-4 border rounded shadow-md bg-white">
        <h2 className="text-xl font-bold">Scenario Advice</h2>
        <p>{getAdvice()}</p>
      </div>
    );
  };
  
  export default ScenarioAdvice;
  