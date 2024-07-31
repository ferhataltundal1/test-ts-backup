const timeSelector = document.getElementById("time") as HTMLDivElement;
const oneSec = document.getElementById("oneSec") as HTMLButtonElement;
const hundredMs = document.getElementById("hundredMs") as HTMLButtonElement;
const tenMs = document.getElementById("tenMs") as HTMLButtonElement;
const oneMs = document.getElementById("oneMs") as HTMLButtonElement;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let time = 100;
let timer: NodeJS.Timeout | ReturnType<typeof setInterval>;
function useTime(time: number) {
  timer = setInterval(() => {
    const date = new Date();
    const currentMonth = months[date.getMonth()]
      .toLocaleUpperCase()
      .slice(0, 3);
    const currentDayName = days[date.getDay()].toLocaleUpperCase().slice(0, 3);
    const currentTime = `
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date
      .getMilliseconds()
      .toLocaleString()
      .slice(0, 2)}`;
    const convertTimezone = `(GMT ${date.getTimezoneOffset() / 60}:00)`;
    const fullDate = `${currentDayName} ${currentMonth} ${date.getDate()} ${date.getFullYear()} ${currentTime} ${convertTimezone}`;
    timeSelector.innerHTML = fullDate.toString();
  }, time);
  return () => clearInterval(timer);
}

function setTime(newTime: number) {
  clearInterval(timer);
  time = newTime;
  useTime(time);
}
oneSec.addEventListener("click", () => setTime(1000));
hundredMs.addEventListener("click", () => setTime(100));
tenMs.addEventListener("click", () => setTime(10));
oneMs.addEventListener("click", () => setTime(1));
useTime(time);
