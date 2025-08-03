import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const dbRef = collection(db, "travelerEntries");

window.submitEntry = async function () {
  const destination = document.getElementById('destination').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const travelerName = document.getElementById('travelerName').value;

  await addDoc(dbRef, { destination, startDate, endDate, travelerName });
  alert("Entry submitted!");
}