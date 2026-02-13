import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { rolarPericia, calcularBonusMaestria } from "./motor.js";

let especializacoesData = {};
let characterId = new URLSearchParams(location.search).get("id");

document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  };
});

async function carregarEspecializacoes() {
  const snapshot = await getDocs(collection(db, "specializations"));
  snapshot.forEach(docSnap => {
    especializacoesData[docSnap.id] = docSnap.data();
    listaEspecializacoes.innerHTML += `
      <label>${docSnap.data().nome}</label>
      <input type="number" id="esp-${docSnap.id}" min="0" value="0"><br>
    `;
  });
}
carregarEspecializacoes();

document.getElementById("salvarFicha").onclick = async () => {
  await setDoc(doc(db, "characters", characterId), {
    atributos: {
      forca: parseInt(forca.value) || 0,
      tecnica: parseInt(tecnica.value) || 0,
      controle: parseInt(controle.value) || 0,
      velocidade: parseInt(velocidade.value) || 0,
      resistencia: parseInt(resistencia.value) || 0
    }
  }, { merge: true });

  alert("Salvo!");
};

const periciasBase = [
  { nome: "Combate", atributo: "forca" },
  { nome: "Ocultismo", atributo: "controle" }
];

periciasBase.forEach(p => {
  listaPericias.innerHTML += `
    <strong>${p.nome}</strong>
    <input type="checkbox" id="treinado-${p.nome}">Treinado
    <input type="checkbox" id="mestre-${p.nome}">Mestre
    <button onclick="rolar('${p.nome}', '${p.atributo}')">Rolar</button><br><br>
  `;
});

window.rolar = async function(nome, atributo) {
  const mod = parseInt(document.getElementById(atributo).value) || 0;
  const bonus = calcularBonusMaestria(1);

  const treinado = document.getElementById(`treinado-${nome}`).checked;
  const mestre = document.getElementById(`mestre-${nome}`).checked;

  const resultado = rolarPericia(mod, bonus, treinado, mestre);

  await addDoc(collection(db, "rollLogs"), {
    tipo: "pericia",
    nome,
    ...resultado,
    timestamp: Date.now()
  });
};

onSnapshot(collection(db, "rollLogs"), snapshot => {
  listaLog.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    listaLog.innerHTML += `${data.nome} - ${data.total} (${data.resultado})<br>`;
  });
});
