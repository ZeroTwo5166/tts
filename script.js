//All variables from html
const playButton = document.getElementById('readBtn')
const pauseButton = document.getElementById('pauseBtn')
const stopButton = document.getElementById('stopBtn')
const textInput = document.getElementById('userText')
const speedInput = document.getElementById('speed')
const highlightText = document.getElementById('highlightText');
let currentCharacter; 
var speechLanguage = "en-US"; //Default langugage set to en-US
//var highlightArray;
var text = ""; //text variable, same as highlightText.innertext which is used to use substring function and highlight words


textInput.addEventListener('input', e => {
 highlightText.innerHTML = e.target.value;
});


playButton.addEventListener('click', () => {
  playText(textInput.value)
})
pauseButton.addEventListener('click', pauseText);

/*stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', () => {
  stopText();
  playText(utterance.text.substring())
}) */

const utterance = new SpeechSynthesisUtterance()
utterance.addEventListener('end', () => {
  textInput.disabled = false;
  highlightText.innerHTML = text;
})



utterance.addEventListener('boundary', handleBoundary);


function handleBoundary(event) {
    if (event.name === 'sentence') {
      // we only care about word boundaries
      return;
    }
    //text = 'So let me help you remember. I\'ve made charts and graphs that should finally make it clear. I\'ve prepared a lecture on why I have to leave. My name is Zero';

    text = highlightText.innerText;

    const wordStart = event.charIndex;
  
    let wordLength = event.charLength;
    if (wordLength === undefined) {
      // Safari doesn't provide charLength, so fall back to a regex to find the current word and its length (probably misses some edge cases, but good enough for this demo)
      const match = text.substring(wordStart).match(/^[a-z\d']*/i);
      wordLength = match[0].length;
    }
    
    // wrap word in <mark> tag
    const wordEnd = wordStart + wordLength;
    const word = text.substring(wordStart, wordEnd);
    const markedText = text.substring(0, wordStart) + '<mark>' + word + '</mark>' + text.substring(wordEnd);
    highlightText.innerHTML = markedText;
  }



function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if (speechSynthesis.speaking) return
  utterance.text = text;
  utterance.lang = speechLanguage;
  utterance.rate = speedInput.value || 1;
  highlightArray = utterance.text.split(' ');
  speechSynthesis.speak(utterance)
  textInput.disabled = true;
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
}

function getSelectedValue() {
    speechLanguage = document.getElementById("language").value;
}