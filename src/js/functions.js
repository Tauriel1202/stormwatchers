export function toTitleCase(string) {
  return string
    .split(" ")
    .map(
      (x) =>
        x.slice(0, 1)[0].toUpperCase() + x.slice(1, x.length)
    )
    .join(" ");
}

export function checkPlural(string) {
  if (string.at(-1) === "s") {
    return <span>are {string}</span>;
  } else {
    return <span>is {string}</span>;
  }
}
