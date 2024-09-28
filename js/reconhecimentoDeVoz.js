const elementoChute = document.getElementById('chute');
const elementoTentativas = document.getElementById('tentativas')
const elementoReconhecer = document.getElementById('reconhecer')
// Obtém o elemento HTML com o id 'chute', onde o resultado do reconhecimento de voz será exibido.

let tentativas = 0

let estaReconhecendo = false;
// Variável de controle que verifica se o reconhecimento de voz está ativo. Inicialmente definida como 'false'.

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// Verifica se a API de reconhecimento de voz é suportada pelo navegador. Se for, atribui à variável `SpeechRecognition` a instância correta (pode ser `SpeechRecognition` ou `webkitSpeechRecognition` para compatibilidade com navegadores baseados no WebKit).

if (!SpeechRecognition) {
    alert('API de reconhecimento de voz não é suportada no seu navegador.');
    // Caso o navegador não suporte a API de reconhecimento de voz, uma mensagem de alerta será exibida para o usuário.
} else {
    const recognition = new SpeechRecognition();
    // Cria uma nova instância do reconhecimento de voz.

    recognition.lang = 'pt-Br';
    // Define o idioma do reconhecimento de voz como português do Brasil.

    // Adiciona um ouvinte de eventos para o teclado. Quando uma tecla é pressionada, a função será chamada.
    document.addEventListener('keydown', function (event) {
        // Verifica se a tecla pressionada é a barra de espaço e se o reconhecimento de voz não está ativo.
        if (event.code === 'Space' && !estaReconhecendo) {
            recognition.start();
            // Inicia o reconhecimento de voz.
            estaReconhecendo = true
            elementoReconhecer.innerHTML = 'reconhecendo...'
            // Define que o reconhecimento de voz está ativo, evitando que o reconhecimento seja iniciado novamente enquanto já está em execução.
            document.body.style.backgroundColor = 'blue';
            // Altera a cor de fundo do elemento `<body>` para azul enquanto o reconhecimento de voz está ativo.
        }
    });

    recognition.addEventListener('result', onSpeak);
    // Adiciona um ouvinte de eventos que é acionado quando o reconhecimento de voz obtém um resultado. Esse resultado será processado pela função `onSpeak`.

    function onSpeak(e) {
        chute = e.results[0][0].transcript;
        // Obtém o texto transcrito da fala reconhecida, que está localizado em `e.results[0][0].transcript`.

        exibeChuteNaTela(chute);
        // Chama a função para exibir o texto falado no elemento 'chute'.

        verificaSeOChutePossuiUmValorValido(chute);
        // Verifica se o texto falado contém um valor válido para a lógica do seu programa (essa função não está mostrada aqui, mas provavelmente faz parte do restante do código).
    }

    function exibeChuteNaTela(chute) {
        elementoChute.innerHTML = `
            <div>Você disse</div>
            <span class="box">${chute}</span>
        `;
        // Exibe o texto transcrito dentro do elemento HTML identificado como 'chute'. O texto aparece dentro de uma `<span>` com a classe 'box' e é precedido pelo texto "Você disse".
    }

    recognition.addEventListener('end', () => { 
        estaReconhecendo = false;
        elementoReconhecer.innerHTML = 'Precione espaço para ligar o reconhecimento de voz'
        document.body.style.backgroundColor = 'green';

     });
    // Adiciona um ouvinte para o evento `end`, que é disparado quando o reconhecimento de voz para. Quando isso ocorre, o reconhecimento é automaticamente reiniciado (isso pode ser útil para manter o reconhecimento contínuo).
}
