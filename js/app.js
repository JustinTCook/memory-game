"use strict";

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

buildGame();

// Build Game
function buildGame(){
  // Shuffle game deck
  deck.cards = deck.shuffle(deck.cards);

  // array containing all card elements
  var cards = $(".card");
  for(var i = 0; i < cards.length; i++){
    cards[i].className = "card hidden"
    cards[i].innerHTML = "<i class=\"fa fa-" + deck.cards[i] + "\"></i>"
  }
}
