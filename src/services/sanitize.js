export function toId(string = "") {
  return string.toLowerCase().trim().replace(/ /g, "_");
}

export function toName(string = "") {
  return string.toLowerCase().trim().replace(/_/g, " ");
}
