export function toTitleCase(string) {
  return string
    .split(" ")
    .map((x) => x.slice(0, 1)[0].toUpperCase() + x.slice(1, x.length))
    .join(" ");
}

export function checkPlural(string) {
  if (string.at(-1) === "s") {
    return <span>are {string}</span>;
  } else {
    return <span>is {string}</span>;
  }
}

export function stormType(json, dict) {
  return Object.keys(json[dict]).map((sType, i) => {
    return <option key={sType}>{toTitleCase(sType)}</option>;
  });
}

export function imageToBase64(src, callback) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let image = new Image();
  image.src = src;

  image.onload = function () {
    let [width, height] = keepAspect(500, image.width, image.height);
    canvas.width = width;
    canvas.height = height;
    console.log(width, height);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    // console.log(canvas.toDataURL("image/jpeg", .5))

    let b64 = canvas.toDataURL("image/jpeg", 1);
    let kb = Math.round(b64.length / 1000);
    if (kb > 80) {
      b64 = canvas.toDataURL("image/jpeg", 0.5);
    }
    callback(b64);
  };
}

function keepAspect(s, w, h) {
  let aspect = w / h;
  if (w > h) {
    return [s, s / aspect];
  } else {
    return [aspect * s, s];
  }
}

export function getUrl() {
  let url = "http://localhost:2024";
  url = "https://stormwatchers.onrender.com";
  if (!window.location.host.includes("localhost")) {
  }
  return url;
}
