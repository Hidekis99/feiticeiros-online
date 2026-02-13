// BONUS DE MAESTRIA BASEADO NA TABELA OFICIAL
export function calcularBonusMaestria(nivel) {
    if (nivel >= 17) return 6;
    if (nivel >= 13) return 5;
    if (nivel >= 9) return 4;
    if (nivel >= 5) return 3;
    return 2;
}

// ROLAGEM D20
export function rolarD20() {
    return Math.floor(Math.random() * 20) + 1;
}

// ATAQUE RAW
export function calcularAtaque(modificador, bonusMaestria, criticoMinimo = 20) {
    const dado = rolarD20();

    let resultado = "normal";

    if (dado === 1) {
        resultado = "desastre";
    } else if (dado >= criticoMinimo) {
        resultado = "critico";
    }

    const total = dado + modificador + bonusMaestria;

    return {
        dado,
        total,
        resultado
    };
}

// ROLAGEM DE DANO (STRING EX: "1d8")
export function rolarDano(danoString, critico = false) {
    const [quantidade, dado] = danoString.split("d").map(Number);
    const vezes = critico ? quantidade * 2 : quantidade;

    let total = 0;

    for (let i = 0; i < vezes; i++) {
        total += Math.floor(Math.random() * dado) + 1;
    }

    return total;
}
