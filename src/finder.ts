export default function finder<T>(
  array: T[],
  key: string | number,
  search: string | number,
  case_sensitivity: boolean,
  messages?: {
    successful?: string;
    unsuccessful?: string;
  }
): any[] {
  let result: boolean = false;
  let message: string = "";
  function searchValue(value: any[typeof key]): boolean {
    const caseSensitivityControl = !case_sensitivity
      ? String(value[key]).toLowerCase() === String(search).toLowerCase()
      : String(value[key]) === String(search);
    if (caseSensitivityControl) {
      result = true;
      message = messages?.successful || "SUCCESFULLY!";
      return result;
    } else {
      result = false;
      message = messages?.unsuccessful || "DATA NOT FOUND!";
      return result;
    }
  }
  const data = array.find(searchValue) || [];
  return [{ ...data, info: { message, result } }];
}

type Users = {
  id: number;
  name: string;
};
const dummyValue: Users[] = [
  {
    id: 1,
    name: "Ferhat",
  },
  {
    id: 2,
    name: "Ali",
  },
  {
    id: 3,
    name: "Veli",
  },
];

const result: Users[] = finder(dummyValue, "id", 2, true, {
  successful: "User exist!",
  unsuccessful: "User not found!",
});
