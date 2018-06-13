var request = new XMLHttpRequest();
var quoteDiv = document.querySelector('.quote');
var button = document.querySelector("button");

// Set to false to stop the timeout delay on page startup.
var buttonPressed = false
apiRequest();
request.send();

// button event listener --- removes old quote and puts the new quote in its place
button.addEventListener("click", function(){
  buttonPressed = true
  var quoteh1 = document.querySelector("h1");
  var charh3 = document.querySelector("h3");


  quoteh1.style.opacity = '0';
  charh3.style.opacity = '0';

  setTimeout(function(){
    quoteh1.parentNode.removeChild(quoteh1);
    charh3.parentNode.removeChild(charh3);
  }, 1000);


  apiRequest();

  request.send();

});

console.log(request.status);

// function to access API data
function apiRequest() {
  request.open('GET', 'https://thesimpsonsquoteapi.glitch.me/quotes', '.json');

  request.onload = function () {
    var data = JSON.parse(this.response);
// Create Cards with quote and character name
    if (request.status >= 200 && request.status < 400) {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const quoteh1 = document.createElement('h1');
      quoteh1.textContent = data[0].quote;

      const charh3 = document.createElement('h3');
      charh3.textContent = data[0].character;

      if(buttonPressed === false){
        quoteDiv.appendChild(quoteh1);
        quoteDiv.appendChild(charh3);
      }
      // set timeout to create fade effect
      else{
        setTimeout(function(){
          quoteDiv.appendChild(quoteh1);
          quoteDiv.appendChild(charh3);
        },1000)
      }


    }
    else {
      console.log("ERROR");
    }
  };
}
