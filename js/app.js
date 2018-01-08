/*
 * Create a list that holds all of your cards
 */
 const deck = {
   cards : [
     anchor, anchor,
     bicycle, bicycle,
     bolt, bolt,
     bomb, bomb
     cube, cube,
     diamond, diamond,
     leaf, leaf,
     paper-plane-o, paper-plane-o,
   ],
   opened : [],
   matched : [],
   // Fisher-Yates shuffle found at https://www.frankmitchell.org/2015/01/fisher-yates/
   shuffle : (array) => {
     let i = 0, j = 0, temp = null;

     for (i = array.length - 1; i > 0; i -= 1){
       j = Math.floor(Math.random() * (i + 1));
       temp = array[i];
       array[i] = array[j];
       array[j] = temp;
     }
   },
 }
