import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.login = function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const email = userCredential.user.email;
      if (email === "admin@sgtrek.com") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "traveler-dashboard.html";
      }
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}