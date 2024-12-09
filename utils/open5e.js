import axios from "axios";

const BASE_URL = "https://api.open5e.com";

export const getClasses = async () => {
    const response = await axios.get(`${BASE_URL}/classes/`);
    return response.data;
};

export const getSpells = async () => {
    const response = await axios.get(`${BASE_URL}/spells/`);
    return response.data;
};

export const getMonsters = async () => {
    const response = await axios.get(`${BASE_URL}/monsters/`);
    return response.data;
};

export const getSpecificClass = async (className) => {
    const response = await axios.get(`${BASE_URL}/classes/${className}/`);
    return response.data;
};
