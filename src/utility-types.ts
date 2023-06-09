/*//Partial: Optional types
interface User {
  id?: string;
  name: string;
  activation: boolean;
}

function userTest<T extends User>(inf: Partial<T>): Partial<T> {
  return { ...inf };
}
userTest({ id: "1", name: "Ferhat" });

//Required: Required types
function userTest2<T extends User>(inf: Required<T>): Required<T> {
  return { ...inf };
}
userTest2({ id: "1", name: "Ferhat", activation: true });

//Pick: Select types
type pickType = Pick<User, "id" | "name">;
function userTest3(inf: pickType): pickType {
  return { ...inf };
}
userTest3({ id: "1", name: "Ferhat" });

//Record: Merge types
type recordType = Record<string, Omit<User, "id">>;
function userTest4(inf: User[]): recordType {
  return inf.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      //@ts-ignore
      [id]: other,
    };
  }, {});
}
console.log(userTest4([{ name: "Ferhat", activation: false }]));

//Omit: Remove types
type omitType = Omit<User, "id" | "name">;
function userTest5(inf: omitType): omitType {
  return { ...inf };
}
userTest5({ activation: false });

*/
