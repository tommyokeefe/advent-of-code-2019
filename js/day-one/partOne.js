const csv = require('csvtojson');

const csvFile = './fuel-requirements.csv';

const getFuelRequirements = async () => {
    const fuelRequirements = await csv().fromFile(csvFile);
    return fuelRequirements.map(fuel => parseInt(fuel['fuel']));
};

const totalCellReducer = (totalCells, fuel) => {
    const cells = (Math.floor(fuel / 3) - 2);
    return totalCells + cells;
};

const calculateTotal = (fuelRequirements) => {
    return fuelRequirements.reduce(totalCellReducer, 0);
};

const requirements = getFuelRequirements();

requirements.then(fuelRequirements => {
    console.log(calculateTotal(fuelRequirements));
});