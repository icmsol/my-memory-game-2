/*const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
        "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
        "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
        */

        
       let card = document.getElementsByClassName("card");
       let cards = [...card];
       let deck = document.querySelector(".deck3");
       let openedCards = [];
       let changeMovesNumber = document.querySelector(".moves");
       let matchCount =0;
       let matchClass = deck.querySelectorAll(".card .match")
       let modal = document.querySelector(".modal");
       let starN=0;
       let timeoutID="";
       let time = "00:00"
       let seconds = 0;
       let minutes = 0;
       let t;
       let timer = document.querySelector(".timer");
       let modalHeading = document.querySelector("#modal-heading");
       let modalMessage=""; 
       let timeTiger= 0;
       let playAgain=document.querySelector("#playAgain");
       
       
       /* restart the game */
       let restart = document.querySelector(".restart"); 
       restart.onclick = function() {
        newGame();
        resetTimer();
        clearInterval(t);
    };
       
       /* shuffle the list of cards with "shuffle" method */
       let shuffledCards = shuffle(cards);
       newGame();
       
       /*
       *Setting up the cards for the game: 
       *Shuffle function from http://stackoverflow.com/a/2450976
       */
       
       function shuffle(array) {
         var currentIndex = array.length,
           temporaryValue, randomIndex;
       
         while (currentIndex !== 0) {
           randomIndex = Math.floor(Math.random() * currentIndex);
           currentIndex -= 1;
           temporaryValue = array[currentIndex];
           array[currentIndex] = array[randomIndex];
           array[randomIndex] = temporaryValue;
         }
       
         return array;
       }
       
       /*
       *display the cards on the page
       *loop through each card and create its HTML
       *add each card's HTML to the page
       */
       
        function newGame(card) {
         for (let i = 0; i < shuffledCards.length; i++) {
           deck.appendChild(shuffledCards[i]);  
           shuffledCards[i].classList.remove("show", "open", "match", "trick");
           resetMovesCount();
           resetStarRating();
           matchCount = 0;
           timeTiger= 0;
           openedCards = [];
           modalMessage.innerHTML = "";
           deck.appendChild(shuffledCards[i]);  
         }
       } 
       
       /* this function starts different function to show and match cards */
       for (let shuffledCard of shuffledCards) {
       shuffledCard.addEventListener("click", clickedCards);
       }
       
       function resetTimer() {
        second = 0;
        minute = 0; 
        hour = 0;
        var timer = document.querySelector(".timer");
        timer.innerHTML = "00:00";
        stopClock();
       }
              
       /* once the card is clicked the time and comparison initialise */
       function clickedCards (){
         showCard();
         addToOpenCards();
         timeTiger++
         if(timeTiger === 1){
           startTimer();
         }
         if (openedCards.length === 2){
           addMoves(); 
           if (openedCards[0].innerHTML === openedCards[1].innerHTML){
             matchCount++;
             stopClock();
             match(); 
           } else {
               notMatch();
             }
         }
         
       
       /* display tcards */
       function showCard (){  
         const cardTagName = event.target 
         if (cardTagName.tagName === "LI"){
            if (openedCards.length < 2){  
         event.target.classList.add("open", "show");
            }
         }
       }
       
       /* add the card to "open cards" */
       function addToOpenCards () { 
         openedCards.push(event.target);
       }
       
       /* check whether the two cards match or not */
       function match(){
         openedCards[0].classList.add("match", "trick");
         event.target.classList.add("match", "trick");
         openedCards[0].classList.remove("show", "open"); 
         event.target.classList.remove("show", "open"); 
         openedCards = [];  
        }
                    
       function notMatch (){
           setTimeout(function(){ 
           openedCards[0].classList.remove("open", "show");
           openedCards[1].classList.remove("open", "show");
           openedCards = [];
              }, 500);
       }};

       /* increment the move counter and display it on the page */
       function addMoves(){
         moves++;
         changeMovesNumber.textContent =  moves;
         starRating();
       }
       
       function resetMovesCount(){
         moves = 0; 
         changeMovesNumber.textContent =  moves; 
       }
       
       /* deduct stars */
       function starRating (){
         if (moves > 8 && moves < 12){
           starN = 3;
         }
         if (moves > 12 && moves < 18 ) {
           document.querySelector(".one").innerHTML ='<i class="fa fa-star-o"></i>';
           starN = 2;
         } if (moves > 22) {
           document.querySelector(".one").innerHTML ='<i class="fa fa-star-o"></i>';
           document.querySelector(".two").innerHTML ='<i class="fa fa-star-o"></i>';
           starN = 1;
         }
       }
       
       /* reset stars */
       function resetStarRating (){ 
         document.querySelector(".one").innerHTML ='<i class="fa fa-star"></i>';
         document.querySelector(".two").innerHTML ='<i class="fa fa-star"></i>';
       }
       
       function startTimer() {
              clearInterval(t);
             t = setInterval(buildTimer,1000);
         }
       
       timer.textContent = time;
       function buildTimer () {
           seconds++;
               if (seconds === 60) {
                   seconds = 0;
                   minutes++;
                   if (minutes === 60) {
                       minutes = 0;
                       seconds = 0;
                   }
               }
       timer.textContent = (minutes < 10 ? "0" + minutes.toString(): minutes) + ":" + (seconds < 10 ? "0" + seconds.toString(): seconds);
       }
       
       function stopClock () {
          if (matchCount === 8){
            clearInterval(t);
          gameEnd();
          }
       }
      
            
       /* MODAL - display a message with the final score */
       
       /* When the user clicks on the last card the modal oopens */
       function gameEnd () {
         modalMessage = document.createElement("p");
         modalMessage.innerHTML = "<p>Your time  <strong>"+ timer.textContent + "</strong>, <br> You did it in  <strong>" + moves + "</strong> moves <br> you stars: <strong>" + starN + "</strong> ! </p>";
         modalMessage.classList.add("modal-text");
         modalHeading.appendChild(modalMessage); 
         modal.style.display = "block";
       }
       
       //When the user clicks on the button, close it
       playAgain.onclick = function() {
           modal.style.display = "none";
           newGame();
           resetTimer();
       };
       
       // When the user clicks anywhere outside of the modal, close it
       window.onclick = function(event) {
         if (event.target == modal) {
           modal.style.display = "none";
           newGame();
           resetTimer();
         }
       };
       
