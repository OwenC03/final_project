import "../styles/globals.css";
import ProtectedRoute from "../components/ProtectedRoute";
import CharacterCard from "../components/CharacterCard";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { classes, races } from "../utils/constants";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [formData, setFormData] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "characters"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const chars = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCharacters(chars);
      } catch (err) {
        setError("Failed to load characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!editingCharacter) return;

    try {
      const characterRef = doc(db, "characters", editingCharacter.id);
      await updateDoc(characterRef, formData);
      alert("Character updated successfully!");
      setEditingCharacter(null);
      setFormData({});
    } catch (err) {
      setError("Failed to update character.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading characters...</p>;
  }

  return (
    <ProtectedRoute>
      <div>
        <button onClick={() => router.push("/home")} className="option-button">
          Back
        </button>
        {editingCharacter ? (
          // Show the Edit Character form if editing
          <div>
            <h1>Edit Character</h1>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || editingCharacter.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Class:</label>
                <select
                  name="characterClass"
                  value={formData.characterClass || editingCharacter.characterClass}
                  onChange={handleInputChange}
                >
                  {classes.map((classOption) => (
                    <option key={classOption} value={classOption}>
                      {classOption}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Race:</label>
                <select
                  name="race"
                  value={formData.race || editingCharacter.race}
                  onChange={handleInputChange}
                >
                  {races.map((raceOption) => (
                    <option key={raceOption} value={raceOption}>
                      {raceOption}
                    </option>
                  ))}
                </select>
              </div>
              {/* Stats Fields */}
              <div>
                <label>Strength:</label>
                <input
                  type="number"
                  name="strength"
                  value={formData.strength || editingCharacter.stats.strength}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Dexterity:</label>
                <input
                  type="number"
                  name="dexterity"
                  value={formData.dexterity || editingCharacter.stats.dexterity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Constitution:</label>
                <input
                  type="number"
                  name="constitution"
                  value={formData.constitution || editingCharacter.stats.constitution}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Intelligence:</label>
                <input
                  type="number"
                  name="intelligence"
                  value={formData.intelligence || editingCharacter.stats.intelligence}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Wisdom:</label>
                <input
                  type="number"
                  name="wisdom"
                  value={formData.wisdom || editingCharacter.stats.wisdom}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Charisma:</label>
                <input
                  type="number"
                  name="charisma"
                  value={formData.charisma || editingCharacter.stats.charisma}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => setEditingCharacter(null)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h1>Your Characters</h1>
            {error && <p className="text-red-500">{error}</p>} {/* Show error if any */}
            {characters.length > 0 ? (
              characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onEdit={() => {
                    setEditingCharacter(char); // Set the character to be edited
                    setFormData(char); // Set the form data to current character data
                  }}
                  onDelete={() => alert("Delete character functionality here!")}
                />
              ))
            ) : (
              <p>No characters found.</p>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Characters;
