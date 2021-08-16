export function formatMinutes(minutes) {
  return minutes < 10 ? `0${minutes}` : minutes;
}

export function formatSeconds(seconds) {
  return seconds < 10 ? `0${seconds}` : seconds;
}
