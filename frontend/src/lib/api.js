const API_BASE_URL = "http://localhost:3001/api";

// Helper function to check if JWT is expired
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function getAccessToken() {
  try {
    // prefer sessionStorage so token does not persist across browser restarts
    const token = sessionStorage.getItem("accessToken");

    // Check if token is expired
    if (token && isTokenExpired(token)) {
      console.log("Token expired, removing from storage");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("club_id");
      sessionStorage.removeItem("userId");
      return null;
    }

    return token;
  } catch (err) {
    console.error("Could not read accessToken:", err);
    return null;
  }
}

async function refreshToken() {
  try {
    const response = await fetch(API_BASE_URL + "/auth/refresh", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    const body = await response.json();
    if (body && body.accessToken) {
      // store in sessionStorage by default (non-persistent). keep localStorage for compatibility.
      try {
        sessionStorage.setItem("accessToken", body.accessToken);
      } catch (err) {
        console.debug("sessionStorage set failed:", err);
      }
      return body.accessToken;
    }
    return null;
  } catch (err) {
    console.error("refreshToken error:", err);
    return null;
  }
}

async function makeRequest(method, endpoint, data) {
  const headers = { "Content-Type": "application/json" };
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const options = {
    method: method,
    credentials: "include",
    headers: headers,
  };
  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  let response = await fetch(API_BASE_URL + endpoint, options);
  if (response.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      headers["Authorization"] = "Bearer " + newToken;
      options.headers = headers;
      response = await fetch(API_BASE_URL + endpoint, options);
    }
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    let body = text;
    try {
      body = JSON.parse(text);
    } catch (err) {
      console.debug(err);
    }
    const msg = `HTTP ${response.status} - ${JSON.stringify(body)}`;
    throw new Error(msg);
  }

  const text = await response.text().catch(() => "");
  try {
    return JSON.parse(text);
  } catch (err) {
    console.debug(err);
    return text;
  }
}

const api = {
  get(endpoint) {
    return makeRequest("GET", endpoint);
  },
  post(endpoint, data) {
    return makeRequest("POST", endpoint, data);
  },
  put(endpoint, data) {
    return makeRequest("PUT", endpoint, data);
  },
  delete(endpoint) {
    return makeRequest("DELETE", endpoint);
  },
};

export default api;
