window.onload = function() {
        setInterval(executar, 1000 / 30);
}

var folhaDesenho = document.getElementById("folha");
var areaDesenho = folhaDesenho.getContext("2d");

var larguraCampo = 600;
var alturaCampo = 500;
var espessuraRede =  8;

var diametroBola = 10;
var espessuraRaquete = 11;
var alturaRaquete = 100;

var efeitoRaquete = 0.3;
var velocidadeJogador2 = 5;

var posicaoJogador1 = posicaoJogador2 = 40;
var posicaoBolaX = posicaoBolaY = 10;
var velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
var pontuacaoJogador1 = pontuacaoJogador2 = 0;

folhaDesenho.addEventListener('mousemove', function(e) {
    posicaoJogador1 = e.clientY - alturaRaquete / 2;
})

function executar() {
    

    // Cor da folha
    areaDesenho.fillStyle = '#286047';// cor verde

    // Dimensões da folha
    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

    //Cor da Linha "Branca do jogo"
    areaDesenho.fillStyle = '#ffffff';// cor branca

    //Linha rede do meio da quadra
    areaDesenho.fillRect(larguraCampo/2 - espessuraRede/2, 0, espessuraRede, alturaCampo);

    // Desenha bola
    areaDesenho.fillRect(posicaoBolaX - diametroBola / 2, posicaoBolaY - diametroBola / 2, diametroBola, diametroBola);

    //raquete
    areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete, alturaRaquete);
    areaDesenho.fillRect(larguraCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete, alturaRaquete);

    // Escrever a pontuação dos jogadores
    areaDesenho.fillText("Humano - " + pontuacaoJogador1 + " pontos", 100, 100);
    areaDesenho.fillText("Computador - " + pontuacaoJogador2 + " pontos", larguraCampo - 200, 100);

    //calculando os movimentos da bola
    posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

    //Condição - Verifica lateral superior
    if(posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    //Verifica lateral interior
    if(posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    //Verifica se o jogador 2 fez um ponto
    if(posicaoBolaX < 0) {
        if(posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete) {
            //Rebater a posição da bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
        }else {
            //ponto do jogador 2
            pontuacaoJogador2 = pontuacaoJogador2 + 1;
            // colocar a bola no centro
            posicaoBolaX = larguraCampo / 2;
            posicaoBolaY = larguraCampo / 2;
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
            velocidadeBolaPosicaoY = 3;
        }
    }

    // Verifica se o jogador 1 fez ponto
    if(posicaoBolaX > larguraCampo) {
        if(posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {
            // Rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
        }else {
            pontuacaoJogador1 = pontuacaoJogador1 + 1;
            // colocar a bola no centro
            posicaoBolaX = larguraCampo / 2;
            posicaoBolaY = larguraCampo / 2;
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
            velocidadeBolaPosicaoY = 3;
        }
    }

    // colocar a bola no centro
    if(posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    }else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }
}