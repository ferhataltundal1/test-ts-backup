const fullName = "F Altundal";

function hideString(str: string, character: string = "*") {
  let v = "";
  const wC = str.split(" ");
  for (let i = 0; i < wC.length; i++) {
    v +=
      wC[i][0] +
      character.repeat(wC[i].length - 2) +
      wC[i][wC[i].length - 1] +
      " ";
  }
  return v;
}
console.log(hideString(fullName));
