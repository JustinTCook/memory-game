"use strict";

const moves = $("#moves");
const reset = $(".reset");

var counter = 0;
var timer = null;

reset[0].addEventListener('click', function(e){
  resetGame();
})
var rating = $(".rating");

// Game deck
const deck = {
 cards : [
   'microchip', 'microchip',
   'bluetooth', 'bluetooth',
   'code-fork', 'code-fork',
   'code', 'code',
   'database', 'database',
   'desktop', 'desktop',
   'server', 'server',
   'terminal', 'terminal'
 ],
 opened : [],
 matched : [],
 moves : 0,
  // Shuffle function from http://stackoverflow.com/a/2450976
 shuffle: function(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
 }
}

function buildGame(){
  deck.cards = deck.shuffle(deck.cards);

  // Add classes and eventListeners
  var cards = $(".card");
  for(var i = 0; i < cards.length; i++){
    cards[i].className = "card hidden"
    cards[i].innerHTML = "<i class=\"fa fa-" + deck.cards[i] + "\"></i>"

    cards[i].addEventListener('click', function(e){
      revealCard(e.target);
    });
  }
}

function resetGame(){
  deck.cards = deck.shuffle(deck.cards);

  rating[0].innerHTML = "<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>"

  var cards = $(".card");
  for(var i = 0; i < cards.length; i++){
    cards[i].className = "card hidden";
    cards[i].innerHTML = "<i class=\"fa fa-" + deck.cards[i] + "\"></i>"
  }

  deck.opened.length = 0;
  deck.matched.length = 0;
  deck.moves = 0;
  moves[0].textContent = deck.moves;

  resetTimer();
}

function revealCard(element){
  element.className = "card revealed";
  var revealedCard = $(element).children();

  deck.opened.push(element);

  if(deck.opened.length > 1){
    checkMatch();
  }

  // first move
  if(deck.moves === 0)
    startInterval();
}

function checkMatch(){
  deck.opened[0].id = "c1";
  var card1 = deck.opened[0].childNodes[0];
  deck.opened[1].id = "c2";
  var card2 = deck.opened[1].childNodes[0];

  if(card1.className === card2.className)
    matchCards();
  else
    hidePair();

  handleRating();
}

function handleRating(){
  deck.moves++;
  moves[0].textContent = deck.moves;

  if(deck.moves === 10 || deck.moves == 15)
    $(".rating").children().last().remove();
}

function matchCards(){
  $("#c1").effect("highlight");
  $("#c2").effect("highlight");

  deck.opened.forEach(function (element){
    deck.matched.push(element);
    element.className = "card match";
    element.id = "";
  });

  deck.opened.length = 0;
  checkWinCondition();
}

function hidePair(){
  $("#c1").effect("shake");
  $("#c2").effect("shake");

  setTimeout(function (){
    deck.opened.forEach(function (element){
      element.className = "card hidden";
      element.id = "";
    });

    deck.opened.length = 0;
  }, 1000)
}

function checkWinCondition(){
  if(deck.matched.length == 16){
    console.log("You win!");
    stopInterval();
  }
}

// Timer functionality from https://stackoverflow.com/questions/19400995
function tictac(){
    counter++;
    $("#clock").html(counter);
}

function resetTimer(){
  clearInterval(timer);
  counter = 0;
}

function startInterval(){
  timer = setInterval("tictac()", 1000);
}

function stopInterval(){
    clearInterval(timer);
}

buildGame();
