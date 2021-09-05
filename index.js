const { generateEaid } = require("./lib/eaid.js");

const args = process.argv.slice(2);

const issuerId = args[0] || 1;
const rangeId = args[1] || 1;
const issuerAssignedNumberMin = args[2] || 1;
const issuerAssignedNumberMax = args[3] || 125;

const timerTitle = `Time taken to generate ${
  issuerAssignedNumberMax - issuerAssignedNumberMin + 1
} EAIDs`;
console.time(timerTitle);

console.log("#index,EAID");
for (let i = issuerAssignedNumberMin; i <= issuerAssignedNumberMax; i++) {
  const eaid = generateEaid(issuerId, rangeId, i);
  console.log(`${i},${eaid}`);
}

console.timeEnd(timerTitle);
