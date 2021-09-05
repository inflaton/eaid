import { generateEaid, generateEaidList, luhnValidate } from "../eaid.js";

test("validate luhn algorithm", () => {
  expect(luhnValidate("5555555555554444")).toBe(true);
  expect(luhnValidate("5555555555554443")).toBe(false);
});

test("validate eaid generation", () => {
  const eaid = generateEaid(1, 1, 3458, true);
  expect(luhnValidate(eaid)).toBe(true);
  expect(eaid.length).toBe(16);
});

test("validate eaid list generation - w output", () => {
  const eaidList = generateEaidList(1, 1, 50, 52, true);
  expect(eaidList.length).toBe(3);
  expect(eaidList[0].issuerAssignedNumber).toBe(50);
  expect(eaidList[0].eaid).toBe("0000010001000503");
});

test("validate eaid list generation - w/o output", () => {
  const eaidList = generateEaidList(1, 1, 1, 100);
  expect(eaidList.length).toBe(100);
  expect(eaidList[49].issuerAssignedNumber).toBe(50);
  expect(eaidList[49].eaid).toBe("0000010001000503");
});
