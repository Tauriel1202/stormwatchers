export function toTitleCase(string) {
  return string.slice(0, 1)[0].toUpperCase() + string.slice(1, string.length);
}

export function checkPlural(string) {
  if (string.at(-1) === "s") {
    return <span>are {string}</span>;
  } else {
    return <span>is {string}</span>;
  }
}