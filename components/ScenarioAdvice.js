import React, { useEffect, useState } from "react";
import { getSpecificClass } from "../utils/open5e";

const ScenarioAdvice = ({ character }) => {
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!character || !character.class) return;

        const fetchClassData = async () => {
            try {
                setLoading(true);
                const data = await getSpecificClass(character.class.toLowerCase());
                setClassData(data);
            } catch (err) {
                setError("Failed to fetch class data.");
            } finally {
                setLoading(false);
            }
        };

        fetchClassData();
    }, [character]);

    if (!character) {
        return <p>Please select a character to view advice.</p>;
    }

    if (loading) {
        return <p>Loading advice...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <h2>Advice for {character.name} ({character.class})</h2>
            {classData ? (
                <div>
                    <p><strong>Hit Die:</strong> {classData.hit_dice}</p>
                    <p><strong>Armor Proficiencies:</strong> {classData.prof_armor}</p>
                    <p><strong>Weapon Proficiencies:</strong> {classData.prof_weapons}</p>
                    <p><strong>Saves:</strong> {classData.saving_throws}</p>
                    <p><strong>Class Description:</strong> {classData.desc}</p>
                </div>
            ) : (
                <p>No additional information available for this class.</p>
            )}
        </div>
    );
};

export default ScenarioAdvice;
