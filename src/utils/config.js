import { io } from "socket.io-client";

// export const socket = io("http://localhost:5000/");

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getTime() {
  const d = new Date()
  let hours = d.getHours();
  const minutes = d.getMinutes();

  if (hours > 12) {
    hours = hours - 12;
    return `${hours} : ${minutes} PM`
  } else {
    return `${hours} : ${minutes} AM`
  }
}

export function getDay() {
  const d = new Date();
  const date = d.getDate();
  const monthIndex = d.getMonth();
  const month = months[monthIndex];
  const weekDayIndex = d.getDay();
  const weekDay = weekDays[weekDayIndex];

  return `${weekDay}, ${month} ${date}`

}