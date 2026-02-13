document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  };
});
import { db } from "./firebase.js";
import { collection, getDocs, doc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let especializacoesData = {};
let characterId = new URLSearchParams(window.location.search).get("id");

async function carregarEspecializacoes() {
  const snapshot = await getDocs(collection(db, "specializations"));

  const container = document.getElementById("listaEspecializacoes");

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    especializacoesData[docSnap.id] = data;

    const div = document.createElement("div");

    div.innerHTML = `
      <label>${data.nome}</label>
      <input type="number" min="0" value="0" id="esp-${docSnap.id}">
    `;

    container.appendChild(div);
  });
}

carregarEspecializacoes();
