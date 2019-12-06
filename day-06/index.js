const data = require('./orbits').default;
const orbits = data.split(/\r?\n/);

const orbitsArray = orbits.map(orbit => {
    const bits = orbit.split(')');
    return { orbitee: bits[0], orbiter: bits[1] };
});

const getSteps = (orbit) => {
    let orbitSteps = [];
    let currentOrbiter = orbit.orbiter;
    let currentOrbitee = orbit.orbitee;
    orbitSteps.push(currentOrbitee);
    let orbitCount = 1;
    while (currentOrbitee !== 'COM' && currentOrbitee !== undefined) {
        currentOrbiter = currentOrbitee;
        const newOrbit =  orbitsArray.find(orbit => currentOrbiter === orbit.orbiter);
        currentOrbitee = newOrbit ? newOrbit.orbitee : undefined;
        if (currentOrbitee) {
            orbitCount++;
            orbitSteps.push(currentOrbitee);
        }
    }
    return { orbitCount, orbitSteps };
}

const getTotalOrbits = () => {
    let count = 0;
    orbitsArray.forEach(orbit => {
        const { orbitCount } = getSteps(orbit);
        count += orbitCount;
    });
    return count;
};

const findStepsToSanta = () => {
    const me = orbitsArray.find(orbit => orbit.orbiter === 'YOU');
    const meToCOM = getSteps(me);
    const santa = orbitsArray.find(orbit => orbit.orbiter === 'SAN');
    const santaToCOM = getSteps(santa);

    let stepCountToSanta = undefined;
    let meIndex = 0;
    while (!stepCountToSanta) {
        const meStep = meToCOM.orbitSteps[meIndex];
        const santaIndex = santaToCOM.orbitSteps.findIndex(santaStep => santaStep === meStep);
        if (santaIndex !== -1) {
            stepCountToSanta = meIndex + santaIndex;
        }
        meIndex++;
    }
    return stepCountToSanta;
};

// part one
console.log(`total number of orbits: ${getTotalOrbits()}`);
// part two
console.log(`total steps to santa: ${findStepsToSanta()}`);
