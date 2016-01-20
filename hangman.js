var word, newWord, temp, c, categ;
var lives = 5;
newWord = "";

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("B").disabled = false;
    document.getElementById("C").disabled = false;
    document.getElementById("D").disabled = false;
    document.getElementById("F").disabled = false;
    document.getElementById("G").disabled = false;
    document.getElementById("H").disabled = false;
    document.getElementById("X").disabled = false;
    document.getElementById("J").disabled = false;
    document.getElementById("K").disabled = false;
    document.getElementById("L").disabled = false;
    document.getElementById("M").disabled = false;
    document.getElementById("N").disabled = false;
    document.getElementById("Y").disabled = false;
    document.getElementById("P").disabled = false;
    document.getElementById("Q").disabled = false;
    document.getElementById("R").disabled = false;
    document.getElementById("S").disabled = false;
    document.getElementById("T").disabled = false;
    document.getElementById("Z").disabled = false;
    document.getElementById("V").disabled = false;
    document.getElementById("W").disabled = false;
    document.getElementById('foot').style.display = 'none';
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function sports() {
  categ = "SPORTS";
  n = Math.floor(Math.random() * 5);
  switch(n)
  {
    case 0:
      word = "CRICKET";
      break;
    case 1:
      word = "HANDBALL";
      break;
    case 2:
      word = "RUGBY";
      break;
    case 3:
      word = "PARAGLIDING";
      break;
    case 4:
      word = "HOCKEY";
      break;
  } startGame();
}

function animals() {
  categ = "ANIMALS";
  n = Math.floor(Math.random() * 5);
  switch(n)
  {
    case 0:
      word = "HEDGEHOG";
      break;
    case 1:
      word = "SKUNK";
      break;
    case 2:
      word = "PANDA";
      break;
    case 3:
      word = "RATTLESNAKE";
      break;
    case 4:
      word = "GIRAFFE";
      break;
  } startGame();
}

function places() {
  categ = "PLACES";
  n = Math.floor(Math.random() * 5);
  switch(n)
  {
    case 0:
      word = "RWANDA";
      break;
    case 1:
      word = "ICELAND";
      break;
    case 2:
      word = "JAMAICA";
      break;
    case 3:
      word = "LADAKH";
      break;
    case 4:
      word = "NIGERIA";
      break;
  } startGame();
}

function food() {
  categ = "FOOD";
  n = Math.floor(Math.random() * 5);
  switch(n)
  {
    case 0:
      word = "POUTINE";
      break;
    case 1:
      word = "TACOS";
      break;
    case 2:
      word = "MARZIPAN";
      break;
    case 3:
      word = "ANKIMO";
      break;
    case 4:
      word = "PHO";
      break;
  } startGame();
}

function words() {
  categ = "WORDS";
  n = Math.floor(Math.random() * 5);
  switch(n)
  {
    case 0:
      word = "BOURGEOISIE";
      break;
    case 1:
      word = "RENDEZVOUS";
      break;
    case 2:
      word = "MAGNANIMOUS";
      break;
    case 3:
      word = "AUSPICIOUS";
      break;
    case 4:
      word = "OSCILLATE";
      break;
  } startGame();
}

function component(size, fnt, color, x, y) {
  this.size = size;
  this.fnt = fnt;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.font = this.size + " " + this.fnt;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
  }
}

function startGame() {
  document.getElementById('dropDown').style.display = 'none';
  document.getElementById('Texts').style.display = 'none';
  document.getElementById('Button').style.display = 'block';
    for ( var i=0; i<word.length; i++)
    {
      var a= word.charAt(i);
      if ( a == 'A' ) {
        newWord = newWord + 'A';
      } else if ( a == 'E') {
        newWord = newWord + 'E';
      } else if ( a == 'I') {
        newWord = newWord + 'I';
      } else if ( a == 'O') {
        newWord = newWord + 'O';
      } else if ( a == 'U') {
        newWord = newWord + 'U';
      } else {
        newWord = newWord + '_';
      }
    }
    LivesLeft = new component("30px", "Consolas", "white", 450, 40 );
    TheWord = new component("60px", "Lucida Console", "white", 120, 300 );
    Categ = new component("30px", "Consolas", "white", 5, 40 );
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function onClick(guess) {
document.getElementById(guess).disabled = true;
  temp = "";
  c = 0;
for ( var i=0; i<word.length; i++)
{
  if(guess == word.charAt(i)) {
    temp = temp + guess;
    c++;
  } else {
    temp = temp + newWord.charAt(i);
  }
}
newWord = temp;

if ( c == 0 ) {
  lives=lives-1;
}

if ( lives == 0)
{
  setTimeout(alert("Game Over"), 4000);
  endGame();
}

if (newWord == word)
{
  setTimeout(alert("You won!!!!\nYour score is " + lives), 4000);
  endGame();
}
}

function updateGameArea() {
  myGameArea.clear();
  LivesLeft.text="Lives: " + lives;
  LivesLeft.update();
  TheWord.text="" + newWord;
  TheWord.update();
  Categ.text="Category: "+ categ;
  Categ.update();
}

function endGame() {
  document.getElementById("B").disabled = true;
    document.getElementById("C").disabled = true;
    document.getElementById("D").disabled = true;
    document.getElementById("F").disabled = true;
    document.getElementById("G").disabled = true;
    document.getElementById("H").disabled = true;
    document.getElementById("X").disabled = true;
    document.getElementById("J").disabled = true;
    document.getElementById("K").disabled = true;
    document.getElementById("L").disabled = true;
    document.getElementById("M").disabled = true;
    document.getElementById("N").disabled = true;
    document.getElementById("Y").disabled = true;
    document.getElementById("P").disabled = true;
    document.getElementById("Q").disabled = true;
    document.getElementById("R").disabled = true;
    document.getElementById("S").disabled = true;
    document.getElementById("T").disabled = true;
    document.getElementById("Z").disabled = true;
    document.getElementById("V").disabled = true;
    document.getElementById("W").disabled = true;
  var r = confirm("Want to play again?");
if (r == true) {
    location.reload();
}
}
