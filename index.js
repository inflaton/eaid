/*
 * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
 */

/* luhn_checksum
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit.
 */
function luhn_checksum(code) {
    var len = code.length;
    var parity = len % 2;
    var sum = 0;
    for (var i = len - 1; i >= 0; i--) {
        var d = parseInt(code.charAt(i));
        if (i % 2 == parity) {
            d *= 2;
        }
        if (d > 9) {
            d -= 9;
        }
        sum += d;
    }
    return sum % 10;
}

/* luhn_caclulate
 * Return a full code (including check digit), from the specified partial code (without check digit).
 */
function luhn_caclulate(partcode) {
    var checksum = luhn_checksum(partcode + "0");
    return checksum == 0 ? 0 : 10 - checksum;
}

/* luhn_validate
 * Return true if specified code (with check digit) is valid.
 */
function luhn_validate(fullcode) {
    return luhn_checksum(fullcode) == 0;
}

/**
 * Prepend leading zeros to numbers so that it results in a string of fixed length
 * https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
 */
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function generate_eaid(issuerId, rangeId, issuerAssignedNumber, debug = false) {
    let partcode = `${pad(issuerId, 6)}${pad(rangeId, 4)}${pad(issuerAssignedNumber, 5)}`;
    let fullcode = `${partcode}${luhn_caclulate(partcode)}`;
    if (debug) {
        console.log(
            `generated EAID: ${fullcode} luhn_validate: ${luhn_validate(
                fullcode
            )}`
        );
    }
    return fullcode;
}

const issuerId = 1;
const rangeId = 1;
const issuerAssignedNumberMin = 1;
const issuerAssignedNumberMax = 125;

console.log("#index,EAID");
for (let i = issuerAssignedNumberMin; i <= issuerAssignedNumberMax; i++) {
    const eaid = generate_eaid(issuerId, rangeId, i);
    console.log(`${i},${eaid}`);
}

