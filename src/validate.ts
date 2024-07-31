interface RegexModel {
  Email: (text: string, customRegex?: RegExp) => boolean;
  IPv4: (text: string, customRegex?: RegExp) => boolean;
  IPv6: (text: string, customRegex?: RegExp) => boolean;
  Url: (text: string, customRegex?: RegExp) => boolean;
  Port: (value: string | number, customRegex?: RegExp) => boolean;
  Range: (min: number, max: number, value: number, equal: boolean) => boolean;
  Alphanumeric: (value: string | number, customRegex?: RegExp) => boolean;
  Password: (
    text: string,
    {
      min,
      max,
      customRegex,
      isIncludeCapitalLetter,
      isIncludeNumber,
      isIncludeString,
      isIncludeSpecialCharacter,
    }: PasswordModel
  ) => boolean;
}

interface PasswordModel {
  min: number;
  max: number;
  customRegex?: RegExp;
  isIncludeNumber?: boolean;
  isIncludeString?: boolean;
  isIncludeSpecialCharacter?: boolean;
  isIncludeCapitalLetter?: boolean;
}

type RegexType = {
  [key in string]: RegExp;
};

const Regexs: RegexType = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  ipv4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  ipv6: /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i,
  url: /^(?:(?:https?|ftp):\/\/)?(?:\S+\.)+[a-zA-Z]{2,}(?:\/|\S*)$/,
  port: /^(0|6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{0,3})$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  empty: /\s/,
  includeNumber: /\d+/,
  includeLetter: /[a-zA-Z]+/,
  includeCapitalLetter: /[A-Z]+/,
  includeSpecalChar: /[!@#$%^&*()_+=[\]{}|\\:;"'<>,.?/~`]+/,
};

export const validate: RegexModel = {
  Email: email,
  IPv4: ipv4,
  IPv6: ipv6,
  Url: url,
  Port: port,
  Range: range,
  Alphanumeric: alphanumeric,
  Password: password,
};

function email(text: string, customRegex?: RegExp) {
  const regex = customRegex || Regexs.email;
  return regex.test(text);
}
function ipv4(text: string, customRegex?: RegExp) {
  const regex = customRegex || Regexs.ipv4;
  return regex.test(text);
}
function ipv6(text: string, customRegex?: RegExp) {
  const regex = customRegex || Regexs.ipv6;
  return regex.test(text);
}

function url(text: string, customRegex?: RegExp) {
  const regex = customRegex || Regexs.url;
  return regex.test(text);
}

function port(value: string | number, customRegex?: RegExp) {
  const regex = customRegex || Regexs.port;
  return regex.test(value.toString());
}

function range(min: number, max: number, value: number, equal: boolean) {
  if (equal) {
    if (min <= value && max >= value) {
      return true;
    } else {
      return false;
    }
  } else {
    if (min < value && max > value) {
      return true;
    } else {
      return false;
    }
  }
}

function alphanumeric(text: string | number, customRegex?: RegExp) {
  const regex = customRegex || Regexs.alphanumeric;
  return regex.test(text.toString());
}

function password(
  text: string,
  {
    min,
    max,
    customRegex,
    isIncludeCapitalLetter = false,
    isIncludeNumber = false,
    isIncludeString = false,
    isIncludeSpecialCharacter = false,
  }: PasswordModel
) {
  if (min > text.length || text.length > max) {
    return false;
  }
  if (Regexs.empty.test(text)) {
    return false;
  }
  if (customRegex) {
    if (!customRegex.test(text)) {
      return false;
    }
  }
  if (isIncludeNumber) {
    if (!Regexs.includeNumber.test(text)) {
      return false;
    }
  }
  if (isIncludeString) {
    if (!Regexs.includeLetter.test(text)) {
      return false;
    }
  }
  if (isIncludeCapitalLetter) {
    if (!Regexs.includeCapitalLetter.test(text)) {
      return false;
    }
  }
  if (isIncludeSpecialCharacter) {
    if (!Regexs.includeSpecalChar.test(text)) {
      return false;
    }
  }
  return true;
}

const doValidate = validate.Password("1234567890.Tc", {
  min: 5,
  max: 25,
  isIncludeNumber: true,
  isIncludeString: true,
  isIncludeCapitalLetter: true,
  isIncludeSpecialCharacter: true,
});
console.log(doValidate);

/*


function generate(
  length: number,
  type: "number" | "string" | "both",
  options?: {
    specialCharacter?: boolean;
    customCharacter?: string;
  }
) {
  if (options?.customCharacter?.length === 0) {
    throw new Error("Invalid Property!");
  }
  let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let b = "abcdefghijklmnopqrstuvwxyz";
  let c = "1234567890";
  let d = "!@#$%^&*()_+=[]{}|:;<>,.?/~`";
  const query =
    type === "number"
      ? c
      : type === "string"
      ? a + b
      : type === "both"
      ? a + b + c
      : "";

  const query2 = options?.specialCharacter ? query + d : query;
  let merge = options?.customCharacter
    ? query2 + options?.customCharacter
    : query2;
  let value = "";

  for (let i = 0; i < length; i++) {
    value += merge.charAt(Math.floor(Math.random() * merge.length));
  }

  return value;
}

console.log(
  generate(10, "string", {
    specialCharacter: false,
    customCharacter: "*",
  })
);

*/
