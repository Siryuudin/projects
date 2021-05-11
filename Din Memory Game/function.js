/* Object oriented design pattern javascript*/

/* class and constructor for audio*/
class GameAudio {
  constructor() {
    //this variable belong to whatever the object been declared
      this.bgMusic = new Audio('Assets/Audio/italian.mp3');
      this.flipSound = new Audio('Assets/Audio/eat.wav');
      this.matchSound = new Audio('Assets/Audio/servicebell.wav');
      this.victorySound = new Audio('Assets/Audio/victory.wav');
      this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
      this.bgMusic.volume = 0.1;//for the music volume
      this.bgMusic.loop = true;//loop and repeat the music
  }
  startMusic() {//function for music background function
      this.bgMusic.play();//call the bgMusic in the class constructor and play
  }
  stopMusic() {
      this.bgMusic.pause();//music pause everytime and set 
      this.bgMusic.currentTime = 0;// the current time value to 0 so it will restart everytime the page load
  }
  flip() {
      this.flipSound.play();//call flipsound everytime the user click on the card
  }
  match() {
      this.matchSound.play();//the match sound when the card are the same matched picture
  }
  victory() {
      this.stopMusic();//stop the background music and
      this.victorySound.play();//play the victory sound
      
      
      
  }
  gameOver() {
      this.stopMusic();//stop the background music and
      this.gameOverSound.play();//play the gameover sound
  }
}

/*class and contructor for the game*/
class MemoryGame {
  constructor(totalTime, cards) {
      this.cardsArray = cards;//property of the object are set in the constructor
      this.totalTime = totalTime;//property of the object are set in the constructor
      this.timeRemaining = totalTime;//any given total time the number of given through out the game
      this.timer = document.getElementById('time-remaining');//get the time-remaining class in html page
      this.flippedCard = document.getElementById('flips');//get the flips class in html page
      this.audioFile = new GameAudio();//all audio belong to the game
  }

  //Start game function
  startGame() {
    
      this.totalClicks = 0;//the flips count turn to 0 everytime the game restart or user want to play again
      this.timeRemaining = this.totalTime;//reset time when the new game start
      this.cardToCheck = null;//if the game ends or over it will check if no more cards if its no card left it will call the start game function. The variable cardToCheck is checking the flip card click by the user and the user cant click the flipped card again
      this.matchedCards = [];//start an empty and put total match cards in it when playing. It will be use in cardMatch function below to store the same matched card.
      this.busy = true;
      setTimeout(() => {//takes a function as the first parameter
          this.audioFile.startMusic();//call the bg music and play
          this.shuffleCards(this.cardsArray);//call the shuffle card function
          this.countdown = this.startCountdown();//variable countdown for the timer// it also will be call below in gameover function
          this.busy = false;
      }, 500)//wait 500 milliseconds before calling all the above function //half a second timeout is actually smoother when the game start again after playing it with a bit of delay
    /*calling the hidecards function when the game start again*/
      this.hideCards();
      this.timer.innerText = this.timeRemaining;//resetting the time
      this.flippedCard.innerText = this.totalClicks;//resetting the total flipped cards

  }
  //start the time countdown when the game start
  startCountdown() {
      return setInterval(() => {//setInterval works similar to setTimeout function except it call the function inside of it to the given time like every 1000 milliseconds
          this.timeRemaining--;//subtract/take the time remaining every 1 second
          this.timer.innerText = this.timeRemaining;//update it to the Time on the website
          if(this.timeRemaining === 0)// if the time runs out it will call the gameover function below
              this.gameOver();
      }, 1000);//call every 1000milliseconds equivalent to 1 second and since it will countdown the time
  }
  //game over function
  gameOver() {
      clearInterval(this.countdown);//clear the time and reset the time remaining
      this.audioFile.gameOver();//call the gameover sound
      document.getElementById('game-over-text').classList.add('visible');//take the overlay game over text and background picture and display it when the time runs out
  }
  //victory function work the same as game over function except the name
  victory() {
      clearInterval(this.countdown);
      this.audioFile.victory();
      document.getElementById('victory-text').classList.add('visible');
      
  }
  //hide card function when the game first start and start all over again
  hideCards() {
      this.cardsArray.forEach(card => {
          card.classList.remove('visible');
          card.classList.remove('matched');
          
      });
  }
  //flip card function
  flipCard(card) {
      if(this.userCanFlipCard(card)) {//if user can flip the card the function below will be call
          this.audioFile.flip();//call flip card sound function
          this.totalClicks++;//iterate the number of flip cards
          this.flippedCard.innerText = this.totalClicks;//updating the flip current value
          card.classList.add('visible');//make the card flip using the given class and style in html and css ("card.visible card-back" and "car.visible card-front") so that the card will be rotate 180degree and flip
        
          //if the user trying to flip the card the first time or trying to match the card
          if(this.cardToCheck) {// if its not null
              this.checkForCardMatch(card);//then check for match
          } else {
              this.cardToCheck = card;//if its null then check the card
          }
      }
  }
  //check the card if its match or not
  checkForCardMatch(card) {
      if(this.getCardType(card) === this.getCardType(this.cardToCheck))//if both card is the same then
          this.cardMatch(card, this.cardToCheck);//it will have a match
      else 
          this.cardNotMatch(card, this.cardToCheck);//else if its not match
          this.cardToCheck = null;//turn the card to null and flip it over again
  }
  cardMatch(card1, card2) {
      //the two matched card get push and will be store in an empty array above in "this.matchedCards = [];"
      this.matchedCards.push(card1, card2);
      
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.audioFile.match();// play the matched audio sound file
      if(this.matchedCards.length === this.cardsArray.length)//if all the cards matched then play the victory sound and overlay text
          this.victory();
  }
  cardNotMatch(card1, card2) {
      this.busy = true;//call the bolean function which check whether card is matched or not
      setTimeout(() => {
          //if both card are not the same image then
          card1.classList.remove('visible');
          card2.classList.remove('visible');
          this.busy = false;//then call the boolean function and so that the card will be flip back again
      }, 1000);//set the timeout to 1 second
      
  }
  //card shuffle function
  shuffleCards(cardsArray) { 
          //looping backward //Fisher and Yates shuffle algorithm https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
      for (let i = cardsArray.length - 1; i > 0; i--) {
        //create a random float between 0-0.9985643 and round it up
          let randomItems = Math.floor(Math.random() * (i + 1));
          //shuffle the card not the array
          cardsArray[randomItems].style.order = i;//taking random items in the card list and taking the card that are on the card list and swapping the css grid order
          cardsArray[i].style.order = randomItems;//
      }
  }
  //check if the image card is match or not
  getCardType(card) {
      return card.getElementsByClassName('card-value')[0].src;//check and get the same card image by class in html page
  }
  userCanFlipCard(card) {
      return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;//all 3 statement have to be false and if this return true it will flip the card
  }
}

if (document.readyState == 'loading') {//loading process
  document.addEventListener('DOMContentLoaded', ready);//once everything inside html file loaded it will call all the function in this file which is "ready()"
} else {
  ready();//if the html page has not finish loading then use addEventListener on the dom, it says when its loaded call ready, it will call "ready" function below, if not then its already loaded
}
 
/*ready() method is used to make a function available after the document is loaded. Whatever code you write inside the $(document). ready() method will run once the page DOM is ready to execute JavaScript code*/

function ready() {//function ready declaration
  //overlay-text class in html page
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));//Array.from method will create an array from the target html collection
  //variable declaration for class "card" in html page and convert it to Array
  let cards = Array.from(document.getElementsByClassName('card'));
  let game = new MemoryGame(100, cards);//set the time variable in the website

  //function overlays using forEach loop
  overlays.forEach(overlay => {// for each overlays addEventListener call click when the user click on the page
      overlay.addEventListener('click', () => {
          overlay.classList.remove('visible');//remove the visible class of overlay-text in html page
          game.startGame();//initialize and call the start game function above
      });

  });

  //function cards using forEach loop
  cards.forEach(card => {// for each card classes in html page addEventListener when user click the card or tile in the website
      card.addEventListener('click', () => {
          game.flipCard(card);
      }); 
  });
  
}