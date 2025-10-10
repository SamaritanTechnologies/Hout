export const setAccessToken = (value) => {
  let name = "_UserHoutAccess";
  let path = "/";
  if (value) {
    const encodedToken = encodeURIComponent(value);
    document.cookie = `${name}=${encodedToken}; path=${path}`;
  } else {
    // If value is null or undefined, remove the cookie
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  }
};

export const getAccessToken = () => {
  const cookieName = "_UserHoutAccess";
  const decodedCookie = decodeURIComponent(document.cookie);

  if (decodedCookie) {
    const cookieArray = decodedCookie.split(";");
    const cookie = cookieArray.find((cookie) =>
      cookie.trim().startsWith(cookieName + "=")
    );

    if (cookie) {
      const encodedToken = cookie.split("=")[1];
      return encodedToken;
    }
  }

  return null;
};

export const setRefreshToken = (value) => {
  let name = "_UserHoutRefresh";
  let path = "/";
  if (value) {
    const encodedToken = encodeURIComponent(value);
    document.cookie = `${name}=${encodedToken}; path=${path}`;
  } else {
    // If value is null or undefined, remove the cookie
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  }
};

export const getRefreshToken = () => {
  const cookieName = "_UserHoutRefresh";
  const decodedCookie = decodeURIComponent(document.cookie);

  if (decodedCookie) {
    const cookieArray = decodedCookie.split(";");
    const cookie = cookieArray.find((cookie) =>
      cookie.trim().startsWith(cookieName + "=")
    );

    if (cookie) {
      const encodedToken = cookie.split("=")[1];
      return encodedToken;
    }
  }

  return null;
};

export const setDefaultLanguage = (value) => {
  let name = "_HoutLanguage";
  let path = "/";
  document.cookie = `${name}=${value}; path=${path}`;
};

export const getDefaultLanguage = () => {
  let cookieName = "_HoutLanguage";
  if (document.cookie.length > 0) {
    let cookieStart = document.cookie.indexOf(cookieName + "=");
    if (cookieStart !== -1) {
      cookieStart = cookieStart + cookieName.length + 1;
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }

      let value = window.unescape(
        document.cookie.substring(cookieStart, cookieEnd)
      );
      if (value == "en" || value == "nl") {
        return value;
      } else {
        return null;
      }
    }
  }

  return null;
};
