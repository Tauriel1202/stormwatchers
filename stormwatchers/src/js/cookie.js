import { useNavigate } from "react-router-dom";

class Cookies {
  static setCookie(
    name,
    value,
    expires = new Date().setMonth(new Date().getMonth() + 3),
    path = "/"
  ) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires) {
      const date = new Date(expires);

      cookie += `; expires=${date.toUTCString()}`;
    }

    cookie += `; path=${path}`;

    document.cookie = cookie;
  }

  static getCookie(name) {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }

    return undefined;
  }

  static deleteCookie(name) {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(name + "=")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        let a = document.createElement("a");
        a.href = "/account";
        a.click();
      }
    }
  }
}

export default Cookies;
