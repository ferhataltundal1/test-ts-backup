//@ts-ignore
import JSON from "./data.json" assert { type: "json" };
import { UserTypes } from "./types";

const username = document.getElementById("username") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const login = document.getElementById("onPressLogin") as HTMLButtonElement;
const logout = document.getElementById("onPressLogout") as HTMLButtonElement;
const body = document.getElementById("body") as HTMLBodyElement;

const usernameSession = sessionStorage.getItem("username");
const passwordSession = sessionStorage.getItem("password");

const activeUser: UserTypes = JSON.find((r: UserTypes) =>
  r.username === usernameSession && r.password === passwordSession ? r : null
);

export const selectedUserId = activeUser?.id;

const loginContainer = document.getElementById(
  "login-container"
) as HTMLDivElement;
type LoginType = Pick<UserTypes, "username" | "password">;
async function findUser(username: string, password: string): Promise<any> {
  if (username == "" || password == "") {
    return "Accessing rejected!";
  }
  const userList: LoginType = await JSON.find((r: LoginType) =>
    r.username === username && r.password === password ? r : null
  );
  return userList;
}

login.addEventListener("click", () => {
  let uname = username.value;
  let pass = password.value;
  if (uname == "" || pass == "") {
    return console.log("NULL");
  }
  findUser(uname, pass)
    .then((user) => {
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("password", user.password);
      window.location.reload();
    })
    .then(() => {
      loginContainer.style.display = "none";
      logout.style.display = "block";
    })
    .catch(console.log);
});

logout.addEventListener("click", () => {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("password");
  window.location.reload();
});

body.onload = () => {
  if (usernameSession && passwordSession) {
    loginContainer.style.display = "none";
    logout.style.display = "block";
  } else {
    loginContainer.style.display = "block";
    logout.style.display = "none";
  }
};
