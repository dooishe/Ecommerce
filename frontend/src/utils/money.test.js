import { it, expect, describe } from "vitest";
import { convertCentsToDollars } from "./money";

describe("convertCentsToDollars test", () => {
  it("converts 1999 cents as 19.99", () => {
    expect(convertCentsToDollars(1999)).toBe("19.99");
  });
  it("displays two decimals", () => {
    expect(convertCentsToDollars(1900)).toBe("19.00");
    expect(convertCentsToDollars(1090)).toBe("10.90");
  });
  it("displays 0 cents as 0.00", () => {
    expect(convertCentsToDollars(0)).toBe("0.00");
  });
  it("displays -999 cents as -9.99", () => {
    expect(convertCentsToDollars(-999)).toBe("-9.99");
  });
  it("displays -100 cents as -1.00", () => {
    expect(convertCentsToDollars(-100)).toBe("-1.00");
  });
});
