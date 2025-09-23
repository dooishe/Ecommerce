export function isStringValidIntegerNumberGreaterZeroBelowOneHundred(value) {
  if (typeof value !== "string") {
    return false;
  }
  const trimmed = value.trim();
  if (trimmed === "") {
    return false;
  }
  const digitsOnly = /^[1-9]\d*$/.test(trimmed);
  if (!digitsOnly) {
    return false;
  }
  const number = Number(trimmed);
  return number > 0 && number < 100;
}
