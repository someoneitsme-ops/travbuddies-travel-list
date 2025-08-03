import { db, auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const adminEmail = 'admin@sgtrek.com';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const isAdmin = user.email === adminEmail;
    const querySnapshot = await getDocs(collection(db, "traveler_entries"));

    let tableHTML = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      tableHTML += `
        <tr>
          <td>${data.name}</td>
          <td>${data.destination}</td>
          <td>${data.startDate}</td>
          <td>${data.endDate}</td>
          <td>
            <button class="deleteBtn" data-id="${docSnap.id}" style="color: red; ${isAdmin ? '' : 'display: none;'}">
              Delete
            </button>
          </td>
        </tr>
      `;
    });

    document.querySelector("#travelerTableBody").innerHTML = tableHTML;

    if (isAdmin) {
      document.querySelectorAll('.deleteBtn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const docId = e.target.getAttribute('data-id');
          await deleteDoc(doc(db, "traveler_entries", docId));
          alert('Entry deleted!');
          location.reload();
        });
      });
    }
  }
});
