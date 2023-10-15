const DEBUG_FLAG = 1;
var playerName = "";
var playerPiece = "X";
var player2Piece = "O";
var PCPiece = player2Piece;
function consoleTrace(msg) {
  if (DEBUG_FLAG) console.log(msg);
}

// nw n ne    |
//  w c  e <--|  Concatenar todos ids com fld (field)
// sw s se    |

const winnerSequences = [
  ["nw", "n", "ne"], // Linhas
  ["w", "c", "e"],
  ["sw", "s", "se"],
  ["ne", "e", "se"], // Colunas
  ["nw", "w", "sw"],
  ["n", "c", "s"],
  ["sw", "c", "ne"], // Diagonais
  ["nw", "c", "se"],
];
function doTurn() {
  playerPiece = playerPiece == "X" ? "O" : "X";
}

function outputPElement(piece, objelem) {
  var p = document.createElement("p");
  color = "";
  if (piece == "X") color = "red";
  else if (piece == "O") color = "blue";

  p.style.color = color;
  p.style.margin = "0px";
  p.innerHTML = piece;
  objelem.appendChild(p);
}

function doCheckWinner() {
  var xArr = new Array();
  var oArr = new Array();
  document.querySelectorAll("td").forEach((element) => {
    if (element.innerHTML != "") {
      if (element.childNodes[0].textContent == "X") xArr.push(element.id);
      if (element.childNodes[0].textContent == "O") oArr.push(element.id);
    }
  });
  winnerSequences.map((row) => {
    console.debug("winnerSequences row=" + row);

    if (row.every((square) => xArr.includes(square))) {
      alert("VENCEDOR: Jogador P1(peça X) ");
    }
    if (row.every((square) => oArr.includes(square))) {
      msg = "VENCEDOR: Jogador PC(peça O) ";
      if (!gameMode) msg = "VENCEDOR: Jogador P2(peça O) ";

      alert(msg);
    }
  });
}

function handleQuadrant() {
  // Clique em um quadrante do jogo...
  // if (this.childNodes[0].textContent != "&nbsp;") return;
  if (this.textContent != "") return;

  // this.innerHTML = playerPiece;
  // this.childNodes[0].remove();
  outputPElement(playerPiece, this);
  this.style.animation = "scale 0.5s forwards";

  doCheckWinner(); // Verificamos Vencedores ou VELHA

  doTurn(); // Alternancia de TURNo
}

document.addEventListener("DOMContentLoaded", function () {
  consoleTrace("DOMContentLoaded -- init");
  document.querySelectorAll("td").forEach((element) => {
    element.addEventListener("click", handleQuadrant);
  });
  playerName = prompt("Informe o seu nome:", "");
  gameMode = confirm(
    'Modo dois jogadores(P1xP2).\n"OK" para confirmar ou\n' +
      '"Cancel" para modo versus maquina(P1xPC)',
    ""
  );
  consoleTrace(
    "playerName=[" + playerName + "] playerName=[" + gameMode + "]s"
  );

  // drawInitialBoard("boardcreate", readyHandler);
});
