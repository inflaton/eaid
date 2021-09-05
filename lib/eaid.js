/*
 * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
 */

/* luhnChecksum
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit.
 */
function luhnChecksum(code) {
  const len = code.length;
  const parity = len % 2;
  let sum = 0;
  for (let i = len - 1; i >= 0; i--) {
    let d = parseInt(code.charAt(i));
    if (i % 2 === parity) {
      d *= 2;
    }
    if (d > 9) {
      d -= 9;
    }
    sum += d;
  }
  return sum % 10;
}

/* luhnCalculate
 * Return a full code (including check digit), from the specified partial code (without check digit).
 */
function luhnCalculate(partCode) {
  const checksum = luhnChecksum(partCode + "0");
  return checksum === 0 ? 0 : 10 - checksum;
}

/* luhnValidate
 * Return true if specified code (with check digit) is valid.
 */
export function luhnValidate(fullCode) {
  return luhnChecksum(fullCode) === 0;
}

/**
 * Prepend leading zeros to numbers so that it results in a string of fixed length
 * https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
 */
function padZero(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export function generateEaid(
  issuerId,
  rangeId,
  issuerAssignedNumber,
  debug = false
) {
  const partCode = `${padZero(issuerId, 6)}${padZero(rangeId, 4)}${padZero(
    issuerAssignedNumber,
    5
  )}`;
  const fullCode = `${partCode}${luhnCalculate(partCode)}`;
  if (debug) {
    console.log(
      `generated EAID: ${fullCode} luhnValidate: ${luhnValidate(fullCode)}`
    );
  }
  return fullCode;
}

export function generateEaidList(
  issuerId,
  rangeId,
  issuerAssignedNumberMin,
  issuerAssignedNumberMax,
  outputCsv = false
) {
  const result = [];
  if (outputCsv) {
    console.log("#index,EAID");
  }
  for (let i = issuerAssignedNumberMin; i <= issuerAssignedNumberMax; i++) {
    const eaid = generateEaid(issuerId, rangeId, i);
    result.push({ issuerAssignedNumber: i, eaid });
    if (outputCsv) {
      console.log(`${i},${eaid}`);
    }
  }
  return result;
}
