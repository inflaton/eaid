const { generateEaid, luhnValidate } = require("../eaid.js");

test("validate luhn algorithm", () => {
  expect(luhnValidate("5555555555554444")).toBe(true);
  expect(luhnValidate("5555555555554443")).toBe(false);
});

test("validate eaid generation", () => {
  const eaid = generateEaid(1, 1, 3458, true);
  expect(luhnValidate(eaid)).toBe(true);
});
