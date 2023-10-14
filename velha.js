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

function outputPElement(piece) {
  color = "";
  if (piece == "X") color = "red";
  else if (piece == "O") color = "blue";

  return '<p style="color:' + color + '">' + piece + "</p>";
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
    console.log(
      "X Venceu? [" + row.every((square) => xArr.includes(square)) + "]"
    );
    console.log(
      "O Venceu? [" + row.every((square) => oArr.includes(square)) + "]"
    );
  });
}

function handleQuadrant() {
  // Clique em um quadrante do jogo...
  if (this.innerHTML != "") return;

  // this.innerHTML = playerPiece;
  this.innerHTML = outputPElement(playerPiece);
  this.style.animation = "scale 0.5s forwards";

  doCheckWinner(); // Verificamos Vencedores ou VELHA

  doTurn(); // Alternancia de TURNo
}

document.addEventListener("DOMContentLoaded", function () {
  consoleTrace("DOMContentLoaded -- init");
  document.querySelectorAll("td").forEach((element) => {
    console.log(element.id);
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
