var season = 0;
var max_lines = 5;
var max_local_calls = 10;
var data = null;
var local_calls = 0;

var LENGTH_OF_SCRIPT = 3
var SEASONS_EPISODES = {
  1: 6,
  2: 22,
  3: 23,
  // 4: 14,
  // 5: 26,
  // 6: 24,
  // 7: 24,
  // 8: 24,
  // 9: 23
}

var CHARACTERS = {
  "STANLEY": "/src/imgs/stanley.png",
  "JIM": "/src/imgs/jim.png",
  "RYAN": "/src/imgs/ryan.png",
  "PAM": "/src/imgs/pam.png",
  "JAN": "/src/imgs/jan.png",
  "OSCAR": "/src/imgs/oscar.png",
  "KEVIN": "/src/imgs/kevin.png",
  "MICHAEL": "/src/imgs/michael.png",
  "DWIGHT": "/src/imgs/dwight.png",
  "PHYLLIS": "/src/imgs/phyllis.png",
  "ANGELA": "/src/imgs/angela.png",
  "KELLY": "/src/imgs/kelly.png",
  "RANDOM_COUNT": 5 // Number of random images available in '/src/imgs/'
}

function getQuotes(callback) {
  let xobj = new XMLHttpRequest();

  xobj.overrideMimeType('application/json');
  xobj.open('GET', '/src/data/quotes.json', true);

  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == '200') {
      data = xobj.responseText;
      console.log(data)
      callback(xobj.responseText);
    }
  }

  xobj.send(null);
}

function parseQuote(response) {
  var obj = JSON.parse(response);
  console.log(obj)
  var season = Math.round(Math.random() * (Object.keys(SEASONS_EPISODES).length - 1)) + 1
  var episode = Math.round(Math.random() * (SEASONS_EPISODES[season] - 1)) + 1

  var start_index = Math.round(Math.random() * (obj[season][episode].length - (LENGTH_OF_SCRIPT+1)))
  var quotes = obj[season][episode].slice(start_index, start_index+LENGTH_OF_SCRIPT);

  displayQuote(quotes, episode, season);
  showCharacters(quotes[0].character, quotes[1].character)
}

function showCharacters(char1, char2) {
  var ch1 = document.getElementsByClassName("char1")[0]
  var ch2 = document.getElementsByClassName("char2")[0]

  ch1_img = document.createElement("img")
  ch2_img = document.createElement("img")

  ch1_rotate = Math.random() * 30
  ch2_rotate = Math.random() * 30

  ch1_img.style = "transform: rotate(" + ch1_rotate + "deg);"
  ch2_img.style = "transform: rotate(-" + ch2_rotate + "deg);"

  ch1_img.src = char1.toUpperCase() in CHARACTERS ? CHARACTERS[char1.toUpperCase()] : "/src/imgs/random" + ((Math.round(Math.random() * CHARACTERS["RANDOM_COUNT"]) % 5) + 1) + ".png"
  ch2_img.src = char2.toUpperCase() in CHARACTERS ? CHARACTERS[char2.toUpperCase()] : "/src/imgs/random" + ((Math.round(Math.random() * CHARACTERS["RANDOM_COUNT"])  % 5) + 1) +  ".png"

  ch1.appendChild(ch1_img)
  ch2.appendChild(ch2_img)
}

function displayQuote(quotes, episode, season) {
  var episode_details_div = document.getElementById('episode_details');
  var quotes_div = document.getElementById('quotes');

  var number = document.createElement('h3');
  number.innerHTML = 'Season ' + season + ' ' + 'Episode ' + episode;

  episode_details_div.appendChild(number);

  console.log(quotes);

  for (var i = 0; i < quotes.length; i++) {
    var quote = quotes[i];
    var quote_p = document.createElement('p');

    quote_p.innerHTML = '<span class="font-weight-bold">' + quote.character + ':</span>' + ' ' + quote.dialog;
    quotes_div.appendChild(quote_p);
  }
}

window.addEventListener('load', () => {
  getQuotes(parseQuote)
});