import { db } from "./firebase.js";
import { doc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const id = new URLSearchParams(location.search).get("id");

onSnapshot(doc(db, "characters", id), snap => {
  const data = snap.data();
  if (!data) return;

  nome.innerText = data.nome || "";

  if (data.hp) {
    hpBar.style.width = (data.hp.atual / data.hp.base) * 100 + "%";
  }

  if (data.energia) {
    energiaBar.style.width = (data.energia.atual / data.energia.base) * 100 + "%";
  }
});
