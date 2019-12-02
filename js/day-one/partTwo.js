const csv = require('csvtojson');

const csvFile = './fuel-requirements.csv';

const getFuelRequirements = async () => {
    const fuelRequirements = await csv().fromFile(csvFile);
    return fuelRequirements.map(fuel => parseInt(fuel['fuel']));
};

const getCellsFromFuel = fuel => (Math.floor(fuel / 3) - 2);

const totalCellReducer = (totalCells, fuel) => {
    let cells = getCellsFromFuel(fuel);
    let latestCells = cells;
    while (latestCells >= 0) {
        latestCells = getCellsFromFuel(latestCells);
        if (latestCells > 0) {
            cells += latestCells;
        }
    }
    return totalCells + cells;
};

const calculateTotal = (fuelRequirements) => {
    return fuelRequirements.reduce(totalCellReducer, 0);
};

const requirements = getFuelRequirements();

requirements.then(fuelRequirements => {
    console.log(calculateTotal(fuelRequirements));
});
