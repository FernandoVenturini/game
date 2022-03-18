var folhaDesenho = document.getElementById("folha");
var areaDesenho = folhaDesenho.getContext("2d");

var larguraCampo = 600;
var alturaCampo = 500;
var larguraLinha =  8;
var larguraBola = 8;
var alturaRaquete = 50;

// Cor da folha
areaDesenho.fillStyle = '#286047';

// Dimensões da folha
areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

//Cor da Linha "Branca do jogo"
areaDesenho.fillStyle = '#ffffff';

//Linha
areaDesenho.fillRect(larguraCampo/2 - larguraLinha/2, 0, larguraLinha, alturaCampo);

//Raquete 1
areaDesenho.fillRect(0, 30, larguraLinha, alturaRaquete);

//Raquete 2
areaDesenho.fillRect(larguraCampo - larguraLinha, 300, larguraLinha, alturaRaquete);

//Bola
areaDesenho.fillRect(30, 30, larguraBola, larguraLinha);

//Variaveis