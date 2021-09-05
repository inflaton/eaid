import { generateEaidList } from "./lib/eaid.js";

const args = process.argv.slice(2);

const issuerId = args[0] || 1;
const rangeId = args[1] || 1;
const issuerAssignedNumberMin = args[2] || 1;
const issuerAssignedNumberMax = args[3] || 125;

let timerTitle = `Time taken to generate ${
  issuerAssignedNumberMax - issuerAssignedNumberMin + 1
} EAIDs - w/ output`;
console.time(timerTitle);
generateEaidList(
  issuerId,
  rangeId,
  issuerAssignedNumberMin,
  issuerAssignedNumberMax,
  true
);

console.timeEnd(timerTitle);

timerTitle = `Time taken to generate ${
  issuerAssignedNumberMax - issuerAssignedNumberMin + 1
} EAIDs - w/o output`;
console.time(timerTitle);
generateEaidList(
  issuerId,
  rangeId,
  issuerAssignedNumberMin,
  issuerAssignedNumberMax,
  false
);

console.timeEnd(timerTitle);
