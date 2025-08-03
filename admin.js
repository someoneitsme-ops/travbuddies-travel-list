import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const dbRef = collection(db, "travelerEntries");

window.addEntry = async function () {
  const destination = document.getElementById('destination').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const travelerName = document.getElementById('travelerName').value;

  await addDoc(dbRef, { destination, startDate, endDate, travelerName });
  loadData();
}

async function loadData() {
  const table = document.getElementById('dataTable');
  table.innerHTML = "<tr><th>Destination</th><th>Start</th><th>End</th><th>Name</th><th>Action</th></tr>";
  const snapshot = await getDocs(dbRef);
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const row = table.insertRow();
    row.innerHTML = `
      <td>${data.destination}</td>
      <td>${data.startDate}</td>
      <td>${data.endDate}</td>
      <td>${data.travelerName}</td>
      <td><button onclick="deleteEntry('${docSnap.id}')">Delete</button></td>
    `;
  });
}

window.deleteEntry = async function (id) {
  await deleteDoc(doc(db, "travelerEntries", id));
  loadData();
}

loadData();