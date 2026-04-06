const WORKER_AUTH_URL = "https://albaspace-api.nncdecdgc.workers.dev/auth/google";
const WORKER_ME_URL = "https://albaspace-api.nncdecdgc.workers.dev/me";

function login() {
  window.location.href = WORKER_AUTH_URL;
}

async function checkUser() {
  const userElement = document.getElementById("user");

  try {
    const res = await fetch(WORKER_ME_URL, {
      credentials: "include"
    });

    if (res.ok) {
      const user = await res.json();
      console.log("Logged in:", user);

      if (userElement) {
        userElement.innerText = "Hello " + (user.name || user.email || "user");
      }
    } else {
      console.log("Not logged in");

      if (userElement) {
        userElement.innerText = "";
      }
    }
  } catch (error) {
    console.error("Failed to check current user:", error);

    if (userElement) {
      userElement.innerText = "";
    }
  }
}

window.login = login;
window.checkUser = checkUser;

checkUser();
