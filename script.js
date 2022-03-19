// carrega os primeiros comandos
window.onload = function() {
    iniciar(); // inicializa os comandos e variaveis
        setInterval(principal, 1000 / 30); // roda o jogo dentro do laço
}

function iniciar() {

     folhaDesenho = document.getElementById("folha");
     areaDesenho = folhaDesenho.getContext("2d");

     larguraCampo = 600;
     alturaCampo = 500;
     espessuraRede =  8;

     diametroBola = 10;
     espessuraRaquete = 11;
     alturaRaquete = 100;

     efeitoRaquete = 0.3;
     velocidadeJogador2 = 5;

     posicaoJogador1 = posicaoJogador2 = 40;
     posicaoBolaX = posicaoBolaY = 10;
     velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
     pontuacaoJogador1 = pontuacaoJogador2 = 0;
     
     folhaDesenho.addEventListener('mousemove', function(e) {
    posicaoJogador1 = e.clientY - alturaRaquete / 2;
    });
}


function principal() {
    desenhar();
    calcular();
}

function desenhar() {
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
}

function calcular() {
    
    desenhar();

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

            continuar();
           
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
            
            continuar();
        }
    }

    // colocar a bola no centro
    if(posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    }else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }
}

function continuar() {
     // colocar a bola no centro
     posicaoBolaX = larguraCampo / 2;
     posicaoBolaY = larguraCampo / 2;
     velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
     velocidadeBolaPosicaoY = 3;
}