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
 * Tests that given only N and W values (no decimals), the X and Z are matched accordingly.
 */
it('coordinateRegex_northAndWestNoDecimals_parsesSuccessfully', () => {
    let coordinates = parseCoordinates('120N 130W');

    expect(coordinates.x).toBe(130);
    expect(coordinates.y).toBe(0);
    expect(coordinates.z).toBe(120);
    expect(coordinates.yaw).toBe(0);
});

/**
 * Tests that given only S and E values (no decimals), the X and Z are matched accordingly.
 */
it('coordinateRegex_southAndEastNoDecimals_parsesSuccessfully', () => {
    let coordinates = parseCoordinates('120S 130E');

    expect(coordinates.x).toBe(-130);
    expect(coordinates.y).toBe(0);
    expect(coordinates.z).toBe(-120);
    expect(coordinates.yaw).toBe(0);
});

/**
 * Tests that given only N and W values (with decimals), the X and Z are matched accordingly.
 */
it('coordinateRegex_northAndWestWithDecimals_parsesSuccessfully', () => {
    let coordinates = parseCoordinates('120.58N 4.62W');

    expect(coordinates.x).toBe(4.62);
    expect(coordinates.y).toBe(0);
    expect(coordinates.z).toBe(120.58);
    expect(coordinates.yaw).toBe(0);
});

/**
 * Tests that given all values (with no decimals), the X, Y, Z, and Yaw are matched accordingly.
 */
it('coordinateRegex_allValuesNoDecimals_parsesSuccessfully', () => {
    let coordinates = parseCoordinates('120N 4W 0A 3599');

    expect(coordinates.x).toBe(4);
    expect(coordinates.y).toBe(0);
    expect(coordinates.z).toBe(120);
    expect(coordinates.yaw).toBe(3599);
});

/**
 * Tests that given all value (each with decimals) the X, Y, Z, and Yaw are matched accordingly.
 */
it('coordinateRegex_allValuesWithDecimals_parsesSuccessfully', () => {
    let coordinates = parseCoordinates('145.76S 175.34E 120.44A 2700');

    expect(coordinates.x).toBe(-175.34);
    expect(coordinates.y).toBe(120.44);
    expect(coordinates.z).toBe(-145.76);
    expect(coordinates.yaw).toBe(2700);
});

/**
 * Calling getValueFromCoordinatePiece with a properly formatted portion of coordinates
 * parses the value out successfully.
 */
it('getValueFromCoordinatePiece_validCoordinatePiece_parsesSuccessfully', () => {
    let value = getValueFromCoordinatePiece('120W');

    expect(value).toBe(120);
});

/**
 * Takes a given coordinate string value and uses the coordinate regex
 * to parse out the pieces.
 * @param {String} value The value from which the coordinates are parsed.
 * @returns An object containing the X, Y, Z, and Yaw valuesW
 * parsed from the given coordinate string.
 */
function parseCoordinates(value) {
    let execResults = coordinateRegex.exec(value);

    return {
        x: getValueFromCoordinatePiece(execResults[groups.EW]),
        y: getValueFromCoordinatePiece(execResults[groups.ALT]),
        z: getValueFromCoordinatePiece(execResults[groups.NS]),
        yaw: getValueFromCoordinatePiece(execResults[groups.YAW])
    };
}

/**
 * Parses the numeric portion of a coordinate string.
 * @param {String} value The value from which numbers are parsed.
 * @returns The coordinate value from the formatted string.
 */
function getValueFromCoordinatePiece(value) {
    let matches = /^\s*\d*\.?\d+/.exec(value);
    let dValue = 0;

    if (matches) {
        dValue = parseFloat(matches[0]);

        if(/[SE]/i.exec(value))
        {
            dValue *= -1;
        }        
    }
    
    return dValue;
}