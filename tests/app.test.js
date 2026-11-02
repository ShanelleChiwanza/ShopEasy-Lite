const calculateTotal = require("../src/app");

test("calculates the total price", () => {
  expect(calculateTotal(100, 2)).toBe(200);
});

test("handles zero quantity", () => {
  expect(calculateTotal(100, 0)).toBe(0);
});
