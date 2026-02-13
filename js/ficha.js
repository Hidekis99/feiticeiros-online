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
function calcularHP() {
  let total = 0;
  let primeira = true;

  for (const key in especializacoesData) {
    const niveis = parseInt(document.getElementById(`esp-${key}`).value) || 0;
    const dados = especializacoesData[key];

    for (let i = 1; i <= niveis; i++) {
      if (primeira && i === 1) {
        total += dados.hpPrimeiroNivel;
        primeira = false;
      } else {
        total += dados.hpPorNivel;
      }
    }
  }

  return total;
}

function calcularEnergia() {
  let total = 0;

  for (const key in especializacoesData) {
    const niveis = parseInt(document.getElementById(`esp-${key}`).value) || 0;
    const dados = especializacoesData[key];

    if (!dados.usaEnergia) continue;

    total += niveis * dados.energiaPorNivel;
  }

  return total;
}
document.getElementById("salvarFicha").onclick = async () => {

  let especializacoes = {};

  for (const key in especializacoesData) {
    const valor = parseInt(document.getElementById(`esp-${key}`).value) || 0;
    if (valor > 0) {
      especializacoes[key] = valor;
    }
  }

  const hpBase = calcularHP();
  const energiaBase = calcularEnergia();

  const personagem = {
    especializacoes,
    atributos: {
      forca: parseInt(forca.value),
      tecnica: parseInt(tecnica.value),
      controle: parseInt(controle.value),
      velocidade: parseInt(velocidade.value),
      resistencia: parseInt(resistencia.value)
    },
    hp: {
      base: hpBase,
      bonusExtra: 0,
      atual: hpBase
    },
    energia: {
      base: energiaBase,
      bonusExtra: 0,
      atual: energiaBase
    }
  };

  await setDoc(doc(db, "characters", characterId), personagem);

  alert("Ficha salva com sucesso!");
};
