import states from '../data/states-data.json';




export const getAllWilayas = () => {
    return [...new Set(states.map(val => val.wilaya_name))];
};

export const getCommunsForWilayaByName = (wilayaName: string) => {
    return states
        .filter(val => val.wilaya_name === wilayaName)
        .map(val => val.commune_name);
};
