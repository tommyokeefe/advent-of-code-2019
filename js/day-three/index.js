
const getCoordinates = trip => {
    const coordinates = [];
    let last = { x: 0, y: 0, steps: 0 };
    const tripArray = trip.split(',');
    return tripArray.flatMap(stop => {
        const direction = stop[0];
        const steps = parseInt(stop.substring(1));
        let leg = [];
        for (i = 0; i < steps; i++) {
            const newLocation = getNewLocation(last, direction);
            last = newLocation;
            leg.push(newLocation);
        }
        return leg;
    });
};

const getNewLocation = (last, direction) => {
    switch (direction) {
        case 'R':
            return { x: last.x, y: last.y + 1, steps: last.steps + 1 };
        case 'L':
            return { x: last.x, y: last.y - 1, steps: last.steps + 1  };
        case 'D':
            return { x: last.x + 1, y: last.y, steps: last.steps + 1  };
        case 'U':
            return { x: last.x - 1, y: last.y, steps: last.steps + 1  };
    }
};

// find the intersections
const getintersections = (route1, route2) => {
    const intersections = route1.filter(position1 => {
        return route2.some(position2 => {
            return (position1.x === position2.x && position1.y === position2.y);
        });
    });
    return intersections;
};

const closestIntersection = (intersections) => {
    return intersections.reduce((previous, current) => {
        const manhattanDistance = Math.abs(current.x) + Math.abs(current.y);
        if (previous === 0 || manhattanDistance < previous) {
            return manhattanDistance;
        }
        return previous;
    }, 0);
};

closestIntersectionActualStepCount = (intersections, route1, route2) => {
    return intersections.reduce((previous, current) => {
        const steps1 = Math.min(route1
            .filter(intersection => {
                return current.x === intersection.x && current.y === intersection.y;
            })
            .map(intersection => intersection.steps)
        );

        const steps2 = Math.min(route2
            .filter(intersection => {
                return current.x === intersection.x && current.y === intersection.y;
            })
            .map(intersection => intersection.steps)
        );
        const totalSteps = steps1 + steps2;
        if (previous === 0 || totalSteps < previous) {
            return totalSteps;
        }
        return previous;
    }, 0);
}

const route1 = getCoordinates(/* data here */);
const route2 = getCoordinates(/* data here */);
const intersections = getintersections(route1, route2);
console.log(closestIntersection(intersections));
console.log(closestIntersectionActualStepCount(intersections, route1, route2));
