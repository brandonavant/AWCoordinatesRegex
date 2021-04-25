/**
 * Regular expression which takes an Active Worlds coordinates formatted string and matches the X, Y, Z, and Yaw parts.
 */
let coordinateRegex = /^(\d*\.?\d+[NS]){1}\s+(\d*\.?\d+[EW]){1}(\s+\d*\.?\d+[A])?(\s+\d+)?/i;

/**
 * Enumeration of Regex group indices.
 */
const groups = {
    CAPTURE: 0,
    NS: 1,
    EW: 2,
    ALT: 3,
    YAW: 4
};

/**
 * Tests that given only N and W values ), the X and Z are matched accordingly.
 */
it('North and West, No Decimals; X and Z are parsed.', () => {
    let coordinates = parseCoordinates('120N 130W');

    expect(coordinates.x).toBe('130W');
    expect(coordinates.y).toBe(undefined);
    expect(coordinates.z).toBe('120N');
    expect(coordinates.yaw).toBe(undefined);
});

/**
 * Tests that given only S and E values, the X and Z are matched accordingly.
 */
it('South and East, No Decimals; X and Z are parsed.', () => {
    let coordinates = parseCoordinates('120S 130E');

    expect(coordinates.x).toBe('130E');
    expect(coordinates.y).toBe(undefined);
    expect(coordinates.z).toBe('120S');
    expect(coordinates.yaw).toBe(undefined);
});

/**
 * Tests that given 
 */
it('North and West, Decimals; X and Z are parsed.', () => {
    let coordinates = parseCoordinates('120.58N 4.62W');

    expect(coordinates.x).toBe('4.62W');
    expect(coordinates.y).toBe(undefined);
    expect(coordinates.z).toBe('120.58N');
    expect(coordinates.yaw).toBe(undefined);
});

/**
 * Takes a given coordinate string value and uses the coordinate regex
 * to parse out the pieces.
 * @param {String} value 
 * @returns An object containing the X, Y, Z, and Yaw values
 * parsed from the given coordinate string.
 */
function parseCoordinates(value) {
    let execResults = coordinateRegex.exec(value);

    return {
        x: execResults[groups.EW],
        y: execResults[groups.ALT],
        z: execResults[groups.NS],
        yaw: execResults[groups.YAW]
    };
}