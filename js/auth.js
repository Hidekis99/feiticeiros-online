import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("loginBtn").onclick = async () => {
  const email = email.value;
  const senha = senha.value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};

document.getElementById("registerBtn").onclick = async () => {
  const email = email.value;
  const senha = senha.value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};
