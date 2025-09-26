import { it, expect, describe } from "vitest";
import { convertCentsToDollars } from "./money";

describe("convertCentsToDollars test", () => {
  it("converts 1999 cents as $19.99", () => {
    expect(convertCentsToDollars(1999)).toBe("19.99");
  });

  it("displays two decimals", () => {
    expect(convertCentsToDollars(1900)).toBe("19.00");
    expect(convertCentsToDollars(1090)).toBe("10.90");
  });
});
