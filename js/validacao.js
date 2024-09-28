
function verificaSeOChutePossuiUmValorValido(chute) {
    const numero = +chute;
    if (chuteForInvalido(numero)) {
        elementoChute.innerHTML += '<div>valor invalido</div>'
        return
    }
    if (chuteForaDosLimites(numero)) {
        elementoChute.innerHTML += `<div>valor inválido, o número deve estar entre ${menorValor} e ${maiorValor}</div>`
        return
    }
    if (numero === numeroSecreto) {
        document.body.innerHTML = `
        <h2>Você Acertou!</h2>
        <h3>O numero secreto era ${numeroSecreto}</h3>
        <button id="jogar_novamente" class="btn_jogar">Jogar Novamente</button>
        `
    } else if (numero > numeroSecreto) {
        tentativas = tentativas + 1
        console.log(tentativas)
        elementoTentativas.innerHTML = `<span>${tentativas}º tentativa</span>`
        elementoChute.innerHTML += `<div>O numero secreto é menor que ${numero}<i class="fa-solid fa-down-long"></i></div>`
    } else {
        tentativas = tentativas + 1
        console.log(tentativas)
        elementoTentativas.innerHTML = `<span>${tentativas}º tentativa</span>`
        elementoChute.innerHTML += `<div>O numero secreto é maior que ${numero}<i class="fa-solid fa-up-long"></i></div>`
    }
}

function chuteForInvalido(numero) {
    return Number.isNaN(numero);
}
function chuteForaDosLimites(numero) {
    return numero > maiorValor || numero < menorValor;
}

document.body.addEventListener('click', e => {
    if(e.target.id == 'jogar_novamente'){
        window.location.reload()
    }
})