const full = (
  type: "range" | "even" | "odd" | "full-square",
  to: number,
  from: number = type === "even" || "range" ? 0 : 1
): number | Error =>
  type === "range"
    ? (to * (to + 1)) / 2 - ((from - 1) * from) / 2
    : type === "even"
    ? to % 2 !== 0 || from % 2 !== 0
      ? Error("Please enter a even number")
      : (to / 2) * (to / 2 + 1) - ((from - 2) / 2) * ((from - 2) / 2 + 1)
    : type === "odd"
    ? to % 2 === 0 || from % 2 === 0
      ? Error("Please enter a odd number")
      : ((to + 1) / 2) * ((to + 1) / 2) - ((from - 1) / 2) * ((from - 1) / 2)
    : type === "full-square"
    ? (to * (to + 1) * (2 * to + 1)) / 6 -
      ((from - 1) * from * (2 * (from - 1) + 1)) / 6
    : Error("Invalid type!");

const sumRange = (to: number, from: number = 0): number =>
  (to * (to + 1)) / 2 - ((from - 1) * from) / 2;
const sumEven = (to: number, from: number = 0): Error | number =>
  to % 2 !== 0 || from % 2 !== 0
    ? Error("Please enter a even number")
    : (to / 2) * (to / 2 + 1) - ((from - 2) / 2) * ((from - 2) / 2 + 1);
const sumOdd = (to: number, from: number = 1): Error | number =>
  to % 2 === 0 || from % 2 === 0
    ? Error("Please enter a odd number")
    : ((to + 1) / 2) * ((to + 1) / 2) - ((from - 1) / 2) * ((from - 1) / 2);
const sumFullSquare = (to: number, from: number = 1): number =>
  (to * (to + 1) * (2 * to + 1)) / 6 -
  ((from - 1) * from * (2 * (from - 1) + 1)) / 6;
