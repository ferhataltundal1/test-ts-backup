interface MathModel {
  Cmb: (n: number, r: number) => number;
  Pmt: (n: number, r: number) => number;
  Fct: (n: number) => number;
  Arm: ([...numbers]: number[], round?: "ceil" | "floor") => number;
  Geom: ([...numbers]: number[]) => number;
  Harm: ([...numbers]: number[]) => number;
  Volume: VolumeModel;
  Area: AreaModel;
  Perimeter: PerimeterModel;
  Currencies: CurrencyModel;
}

interface CurrencyModel {
  Currency: (amount: number, units: UnitTypes, fixed?: number) => UnitTypes;
  Parity: (unit1: number, unit2: number, fixed?: number) => number;
}

interface PerimeterModel {
  Square: () => number;
  Rectangle: () => number;
  Circle: () => number;
  EquilateralTriangle: () => number;
  IsoscelesTriangle: () => number;
  ScaleneTriangle: () => number;
}

interface AreaModel {
  Square: ({
    width,
    height,
  }: Pick<PropertiesType, "width" | "height">) => number;
  Rectangle: ({
    width,
    height,
  }: Pick<PropertiesType, "width" | "height">) => number;
  Triangle: ({
    baseWidth,
    height,
  }: Pick<PropertiesType, "baseWidth" | "height">) => number;
  Circle: ({ radius }: Pick<PropertiesType, "radius">) => number;
  Cylinder: ({
    radius,
    height,
  }: Pick<PropertiesType, "radius" | "height">) => number;
  Sphere: ({ radius }: Pick<PropertiesType, "radius">) => number;
  Cube: ({ side }: Pick<PropertiesType, "side">) => number;
  Cone: ({
    radius,
    height,
  }: Pick<PropertiesType, "radius" | "height">) => number;
}

interface VolumeModel {
  Cylinder: ({
    height,
    radius,
  }: Pick<PropertiesType, "height" | "radius">) => number;
  Cube: ({ side }: Pick<PropertiesType, "side">) => number;
  Sphere: ({ radius }: Pick<PropertiesType, "radius">) => number;
  Cone: ({
    height,
    radius,
  }: Pick<PropertiesType, "height" | "radius">) => number;
  Cuboid: ({
    height,
    length,
    width,
  }: Pick<PropertiesType, "height" | "length" | "width">) => number;
  SquarePyramid: ({
    height,
    baseWidth,
  }: Pick<PropertiesType, "height" | "baseWidth">) => number;
  RegularTetrahedron: ({ side }: Pick<PropertiesType, "side">) => number;
  RectanglesPrism: ({
    length,
    width,
    height,
  }: Pick<PropertiesType, "length" | "width" | "height">) => number;
}

type PropertiesType = {
  height: number;
  radius: number;
  side: number;
  width: number;
  length: number;
  baseWidth: number;
};

type UnitTypes = {
  [key in string]: number;
};

export const MathKit: MathModel = {
  Cmb: combination,
  Pmt: permutation,
  Fct: factorial,
  Arm: arithmeticMean,
  Geom: geometricMean,
  Harm: harmonicMean,
  Volume: {
    Cylinder: cylinderVolume,
    Cube: cubeVolume,
    Sphere: sphereVolume,
    Cone: coneVolume,
    Cuboid: cuboidVolume,
    SquarePyramid: squarePyramidVolume,
    RegularTetrahedron: regularTetrahedronVolume,
    RectanglesPrism: rectanglesPrismVolume,
  },
  Area: {
    Square: squareArea,
    Triangle: triangleArea,
    Rectangle: rectangleArea,
    Circle: circleArea,
    Cylinder: cylinderArea,
    Sphere: sphereArea,
    Cube: cubeArea,
    Cone: coneArea,
  },
  Perimeter: {
    Square: () => 0,
    Rectangle: () => 0,
    Circle: () => 0,
    EquilateralTriangle: () => 0,
    IsoscelesTriangle: () => 0,
    ScaleneTriangle: () => 0,
  },
  Currencies: {
    Currency: currency,
    Parity: parity,
  },
};

function combination(n: number, r: number) {
  if (n <= 0 || r <= 0) {
    return 0;
  }
  return permutation(n, r) / factorial(r);
}

function permutation(n: number, r: number) {
  if (n <= 0 || r <= 0) {
    return 0;
  }
  return factorial(n) / factorial(n - r);
}

function factorial(number: number) {
  let fct = 1;
  if (number < 0) {
    return 0;
  }
  for (let i = 1; i <= number; i++) {
    fct = fct * i;
  }
  return fct;
}

function arithmeticMean([...numbers]: number[], round?: "ceil" | "floor") {
  const sum = numbers.reduce((a: number, b: number) => a + b);
  let calc = sum / numbers.length;
  switch (round) {
    case "ceil":
      calc = Math.ceil(sum / numbers.length);
      break;
    case "floor":
      calc = Math.floor(sum / numbers.length);
      break;
  }
  return calc;
}

function geometricMean([...numbers]: number[]) {
  if (numbers.some((r) => r <= 0)) {
    return 0;
  }
  return Math.pow(
    numbers.reduce((a: number, b: number) => a * b),
    1 / numbers.length
  );
}
function harmonicMean([...numbers]: number[]) {
  if (numbers.some((r) => r === 0)) {
    return 0;
  }
  const calc = numbers.reduce((acc, current) => acc + 1 / current, 0);
  return numbers.length / calc;
}

function cylinderVolume({
  height,
  radius,
}: Pick<PropertiesType, "height" | "radius">) {
  const PI = Math.PI;
  if (height <= 0 || radius <= 0) {
    return 0;
  }
  return PI * (radius * radius) * height;
}
function cubeVolume({ side }: Pick<PropertiesType, "side">) {
  if (side <= 0) {
    return 0;
  }
  return side * side * side;
}

function sphereVolume({ radius }: Pick<PropertiesType, "radius">) {
  const PI = Math.PI;
  if (radius <= 0) {
    return 0;
  }
  return (4 / 3) * PI * radius * radius * radius;
}

function coneVolume({
  height,
  radius,
}: Pick<PropertiesType, "height" | "radius">) {
  const PI = Math.PI;
  if (radius <= 0 || height <= 0) {
    return 0;
  }
  return (1 / 3) * PI * (radius * radius) * height;
}

function cuboidVolume({
  height,
  length,
  width,
}: Pick<PropertiesType, "height" | "length" | "width">) {
  if (width <= 0 || length <= 0 || height <= 0) {
    return 0;
  }
  return height * length * width;
}

function squarePyramidVolume({
  height,
  baseWidth,
}: Pick<PropertiesType, "height" | "baseWidth">) {
  if (baseWidth <= 0 || height <= 0) {
    return 0;
  }
  return (1 / 3) * (baseWidth * baseWidth) * height;
}

function regularTetrahedronVolume({ side }: Pick<PropertiesType, "side">) {
  if (side <= 0) {
    return 0;
  }
  return (Math.pow(2, 1 / 2) / 12) * (side * side * side);
}

function rectanglesPrismVolume({
  length,
  width,
  height,
}: Pick<PropertiesType, "length" | "width" | "height">) {
  if (length <= 0 || length <= 0 || length <= 0) {
    return 0;
  }
  return length * width * height;
}

function squareArea({
  width
}: Pick<PropertiesType, "width">) {
  return width * width;
}
function rectangleArea({
  width,
  height,
}: Pick<PropertiesType, "width" | "height">) {
  return width * height;
}
function triangleArea({
  baseWidth,
  height,
}: Pick<PropertiesType, "baseWidth" | "height">) {
  return (baseWidth * height) / 2;
}

function circleArea({ radius }: Pick<PropertiesType, "radius">) {
  const PI = Math.PI;
  return PI * radius * radius;
}

function cylinderArea({
  radius,
  height,
}: Pick<PropertiesType, "radius" | "height">) {
  const PI = Math.PI;
  return 2 * PI * radius * radius + 2 * PI * radius * height;
}

function sphereArea({ radius }: Pick<PropertiesType, "radius">) {
  const PI = Math.PI;
  return 4 * PI * radius * radius;
}

function cubeArea({ side }: Pick<PropertiesType, "side">) {
  return 6 * side * side;
}

function coneArea({
  radius,
  height,
}: Pick<PropertiesType, "radius" | "height">) {
  const PI = Math.PI;
  if (radius <= 0 || height <= 0) {
    return 0;
  }
  return (
    PI * radius * (radius + Math.pow(radius * radius + height * height, 1 / 2))
  );
}

function parity(unit1: number, unit2: number, fixed: number = 4) {
  if (unit1 <= 0 || unit2 <= 0) {
    return 0;
  }
  return Number((unit1 / unit2).toFixed(fixed));
}

function currency(amount: number, units: UnitTypes, fixed: number = 2) {
  return Object.keys(units).reduce((result, key) => {
    if (units[key]) {
      result[key] = Number((amount * units[key]!).toFixed(fixed));
    }
    return result;
  }, {} as UnitTypes);
}

const calc = MathKit.Currencies.Parity(0, 10);
//console.log(calc);

const calculate = MathKit.Area.Cone({
  radius: 10,
  height: 5,
});

//console.log(calculate);
const sumConsecutiveNumber = (
  type: "range" | "even" | "odd" | "full-square",
  to: number,
  from: number = type === "even" || type === "range" ? 0 : 1
): number | Error =>
  type === "range"
    ? (to * (to + 1)) / 2 - ((from - 1) * from) / 2
    : type === "even"
    ? to % 2 !== 0 || from % 2 !== 0
      ? Error("Please enter a even number")
      : (to / 2) * (to / 2 + 1) - ((from - 2) / 2) * ((from - 2) / 2 + 1)
    : type === "odd"
    ? to % 2 !== 1 || from % 2 !== 1
      ? Error("Please enter a odd number")
      : ((to + 1) / 2) * ((to + 1) / 2) - ((from - 1) / 2) * ((from - 1) / 2)
    : type === "full-square"
    ? (to * (to + 1) * (2 * to + 1)) / 6 -
      ((from - 1) * from * (2 * (from - 1) + 1)) / 6
    : Error("Invalid type!");
//console.log(sumConsecutiveNumber("odd", 5));
