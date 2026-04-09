const statusElement = document.querySelector("#status");
const sessionStateElement = document.querySelector("#session-state");
const sessionIndicatorElement = document.querySelector("#session-indicator");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const logoutButton = document.querySelector("#logout");
const tabButtons = document.querySelectorAll("[data-tab-trigger]");
const tabPanels = document.querySelectorAll("[data-tab-panel]");

const TOKEN_KEY = "auth-api-token";

function setActiveTab(tabName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTrigger === tabName);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === tabName);
  });
}

function setStatus(message = "", type = "") {
  statusElement.textContent = message;
  statusElement.className = "status";

  if (type) {
    statusElement.classList.add(`is-${type}`);
  }
}

function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function updateSessionState(isValidated) {
  sessionIndicatorElement.classList.toggle("is-validated", isValidated);
  sessionIndicatorElement.classList.toggle("is-unvalidated", !isValidated);
  sessionStateElement.textContent = isValidated ? "Validated" : "Not validated";
}

async function syncSessionState() {
  const token = getToken();

  if (!token) {
    updateSessionState(false);
    return false;
  }

  try {
    await request("/api/users/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    updateSessionState(true);
    return true;
  } catch {
    clearToken();
    updateSessionState(false);
    return false;
  }
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  const formData = new FormData(loginForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const data = await request("/api/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    saveToken(data.token);
    await syncSessionState();
    setStatus("Signed in", "success");
    setActiveTab("session");
    loginForm.reset();
  } catch (error) {
    await syncSessionState();
    setStatus(error.message, "error");
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  const formData = new FormData(registerForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    await request("/api/users/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setStatus("Account created", "success");
    setActiveTab("login");
    registerForm.reset();
  } catch (error) {
    setStatus(error.message, "error");
  }
});

logoutButton.addEventListener("click", () => {
  clearToken();
  updateSessionState(false);
  setStatus("Signed out", "success");
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.tabTrigger);

    if (button.dataset.tabTrigger === "session") {
      syncSessionState();
    }
  });
});

syncSessionState();
