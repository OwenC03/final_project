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
        Fighter: "Use your high strength to engage in melee combat!",
        Wizard: "Keep your distance and use spells effectively.",
        Rogue: "Take advantage of stealth and sneak attacks.",
      };
  
      return adviceMap[character.class] || "Adapt your actions to the scenario.";
    };
  
    return (
      <div className="p-4 border rounded shadow-md bg-white">
        <h2 className="text-xl font-bold">Scenario Advice</h2>
        <p>{getAdvice()}</p>
      </div>
    );
  };
  
  export default ScenarioAdvice;
  