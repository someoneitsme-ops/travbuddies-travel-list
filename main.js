import { auth, db } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.login = async function () {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('form-section').classList.remove('hidden');
  } catch (error) {
    alert(error.message);
  }
};

window.register = async function () {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('form-section').classList.remove('hidden');
  } catch (error) {
    alert(error.message);
  }
};

window.submitEntry = async function () {
  const data = {
    startDate: document.getElementById('start-date').value,
    endDate: document.getElementById('end-date').value,
    destination: document.getElementById('destination').value,
    traveler: document.getElementById('traveler-name').value,
  };
  try {
    await addDoc(collection(db, 'travels'), data);
    loadEntries();
  } catch (error) {
    alert(error.message);
  }
};

async function loadEntries() {
  const querySnapshot = await getDocs(collection(db, 'travels'));
  const tableBody = document.querySelector('#travel-table tbody');
  tableBody.innerHTML = '';
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const row = document.createElement('tr');
    row.innerHTML = `<td>${data.startDate}</td><td>${data.endDate}</td><td>${data.destination}</td><td>${data.traveler}</td>`;
    tableBody.appendChild(row);
  });
}

window.filterTable = function () {
  const filter = document.getElementById('filter-destination').value.toLowerCase();
  const rows = document.querySelectorAll('#travel-table tbody tr');
  rows.forEach(row => {
    const destination = row.cells[2].textContent.toLowerCase();
    row.style.display = destination.includes(filter) ? '' : 'none';
  });
};

window.showLogin = function () {
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('register-section').classList.add('hidden');
};

window.showRegister = function () {
  document.getElementById('register-section').classList.remove('hidden');
  document.getElementById('login-section').classList.add('hidden');
};

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById('form-section').classList.remove('hidden');
  }
  loadEntries();
});
