// First Commit
// Variavel lista de números sorteados
let listaDeNumerosSorteados = []; // iniciando lista vazia
// Variavel limite de numero sorteado
let numeroLimite = 100;

// Função para exibir mensagem na tela
function mensagemNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função de mensagens iniciais
function mensagemInicial() {
    mensagemNaTela('h1', 'Jogo do Número Secreto');
    mensagemNaTela('p', `Escolha um número de 1 a ${numeroLimite}`);
}

mensagemInicial(); // Executando função de mensagens iniciais

// Função para gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Numero aleatorio inteiro
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Qde. de elementos na lista igual a tamanho da lista;
    if (quantidadeDeElementosNaLista == numeroLimite) { // Se quantidade de elementos na lista for igual a número limite...
        listaDeNumerosSorteados = []; // ...zera lista
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Se número da lista incluído na lista...
        return gerarNumeroAleatorio(); // ...executar função novamente
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Senão: incluir número a lista...
        return numeroEscolhido; // ...continuar com número escolhido
    }
}

// Variavel número secreto
let numeroSecreto = gerarNumeroAleatorio();
// Variavel número de tentativas
let tentativas = 1;

// Função para limpar campo
function limparCampo() {
    chute = document.querySelector('input'); // Chute recebe valor da caixa
    chute.value = ' '; // Caixa limpa campo
}

// Função para verificar chute
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        // Variavel palavra tentativa
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        mensagemNaTela('h1', 'Acertou!');
        mensagemNaTela('p', `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            mensagemNaTela('p', 'O número secreto é menor');
        } else {
            mensagemNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Função para reiniciar jogo
function reiniciarJogo() {
   mensagemInicial();
   numeroSecreto = gerarNumeroAleatorio();
   tentativas = 1;
   limparCampo();
   document.getElementById('reiniciar').setAttribute('disabled', true);
}