export function getLocalState(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setLocalState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}