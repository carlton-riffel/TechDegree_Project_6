/*

The checkLetter function will be used inside of the event listener you’ll write in the next step.
This function should have one parameter: the button the player has clicked when guessing a letter.
The checkLetter function should get all of the
elements with a class of “letter” (remember that we added the letter class to all of the letters and none of the spaces when we made the game display). The function should loop over the letters and check if they match the letter in the button the player has chosen.
If there’s a match, the function should add the “show” class to the list item containing that letter, store the matching letter inside of a variable, and return that letter.
If a match wasn’t found, the function should return null.
Add an event listener to the keyboard.
Use event delegation to listen only to button events from the keyboard. When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice. Note that button elements have an attribute you can set called “disabled” that when set to true will not respond to user clicks. See the MDN documentation for more details.
Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound. At this point, you can open the index.html file, click any of the letters on the keyboard, and start to see the letters appear in the phrase.
Count the missed guesses in the game.
If the checkLetter function returns a null value, the player has guessed the wrong letter. In the keyboard event listener, after checkLetter is called, write a statement to check the value of the letterFound variable. If the value is null, remove one of the tries from the scoreboard. If you haven't created it yet,
make sure you have a missed variable to store the state of the scoreboard (initialized to 0). When you remove a try from the scoreboard, make sure to increase the missed count by 1.
Create a checkWin function.
Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.

*/
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start = document.getElementsByClassName("btn__reset")[0];
let missed = 0;
const ul = document.querySelector('#phrase ul');
const phraseLetters = document.getElementsByClassName('letter');
const headline = document.getElementsByClassName("title")[0];
const overlay = document.getElementById("overlay");
let phrases = ["stay hungry and foolish",
"dream big",
"take the risk",
"broken crayons color",
"just do it"];

//gets a random phrase to display
const phraseArray = getRandomPhraseAsArray(phrases);

//picks a random phrase
function getRandomPhraseAsArray(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
  const characters = phraseArray.split('');
  return characters
};

//initiates the game by adding characters
function addPhraseToDisplay(arr) {
  for(let i=0;i<arr.length; i++){
    const li = document.createElement("li");
    let character = arr[i];
    li.textContent=character;
    if (character===' '){
      li.className = 'space';
    }else {li.className = 'letter'}
    ul.appendChild(li);
  }
}

//puts the phrase in the display
addPhraseToDisplay(phraseArray);

//hide the overlay and start the game or restart the game, clear, and try a new phrase
start.addEventListener("click", (event) =>
{ if(event.target.textContent = 'Try Again'){
    missed = 0;
    const keyRow = document.querySelectorAll('.keyrow button');
    for (var i=0;i<5;i++){document.querySelectorAll('.tries img')[i].src = 'images/liveHeart.png';}
    for (var i=0;i<keyRow.length;i+=1){
      keyRow[i].disabled = false;
      keyRow[i].className = "";}
    overlay.classList.toggle('hide')
    ul.innerHTML = '';
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
} else{
  overlay.classList.toggle('hide')}
});

//checks if letter is correct
function checkLetter(letterGuess){
  const letterGuessed = letterGuess.target;
  var letterMatch = null;
  for(var i=0; i<phraseLetters.length;i++){
    if(letterGuessed.textContent === phraseLetters[i].textContent){
      phraseLetters[i].classList.add('show');
      letterMatch = true;
    }
  }
  return letterMatch;
};

function checkWin(){
  const showLetters = document.getElementsByClassName('show');
  if (showLetters.length === phraseLetters.length){
    headline.textContent = 'Congratulations, You Win!';
    start.textContent = 'Try Again';
    overlay.className = 'win';
  }
  if (missed === 5){
    headline.textContent = 'Sorry, Game Over!';
    start.textContent = 'Try Again';
    overlay.className = 'lose';
  }
}

//run checkLetter and mark the letter as clicked
keyboard.addEventListener('click', (event) =>
{
if (event.target.tagName === 'BUTTON'){
    event.target.className = 'chosen';
    event.target.disabled = true;
    const letterfound = checkLetter(event);
    if (letterfound === null){
      document.querySelectorAll('.tries img')[missed].setAttribute('src','images/lostHeart.png');
      missed += 1;
      console.log(missed);
    }
}
checkWin();
}
    );





//end
