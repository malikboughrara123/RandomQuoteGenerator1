const divWithQuote = document.getElementById("insertQuoteHere");
const changeicon = document.getElementById("saveicon");
const favicon = document.getElementById("fav");
const savedData = localStorage.getItem("saved") || [];

const divWithAuthor = document.getElementById("insertAuthorHere");
let currentQuote = '';
let currentAuthor = '';

function cycleImages() {
  const imgContainer = document.querySelector('.imgcontainer');
  const images = imgContainer.querySelectorAll('img');
  let currentIndex = 0;

  function showNextImage() {
      images[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.display = 'block';
  }

  // Initially, show the first image and hide others
  for (let i = 1; i < images.length; i++) {
      images[i].style.display = 'none';
  }

  return showNextImage;
}

const showNextImage = cycleImages();




// Modify your getQuote function to show the next image when called


function copyToClipboard() {
  // Select the text you want to copy
  const textToCopy = divWithQuote.textContent;

  // Create a temporary textarea element to copy the text
  const tempInput = document.createElement("textarea");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();

  try {
    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Change the button text and icon
    copyButton.querySelector(".tooltip").textContent = "Copied!";
    copyButton.classList.add("copied");
  } catch (err) {
    console.error("Unable to copy to clipboard: ", err);
  } finally {
    // Remove the temporary textarea element
    document.body.removeChild(tempInput);
  }

  // Reset the button text and icon after a delay (e.g., 2 seconds)
  setTimeout(function () {
    copyButton.querySelector(".tooltip").textContent = "Copy to clipboard";
    copyButton.classList.remove("copied");
  }, 2000);
}

document.addEventListener('click', function (event) {
  // Check if the clicked element has the "copy" class
  if (event.target && event.target.classList.contains('copy')) {
    copyToClipboard();
  }
});

// // The rest of your code...
// let currentImageIndex = 0; // Initialize the index to 0

// let imageUrls = [
//   "sun.png",
//   "marcus.png",
//   "herman.png",
//   "kafka.png",
//   "dostoevsky.png"
// ];

// let quoteImage = document.querySelector(".quoteimage img");

// let getQuote = () => {
//   // Change the image to the next one in the array
//   currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
//   quoteImage.src = imageUrls[currentImageIndex];

//   changeicon.className = "fa-solid fa-bookmark";
//   changeicon.classList.remove("clicked");
//   fetch(url)
//     .then((data) => data.json())
//     .then((item) => {
//       divWithQuote.innerHTML = item.content;
//       divWithAuthor.innerHTML = item.author;

//       currentQuote = item.content;
//       currentAuthor = item.author;
//     });
// };

// const quoteImages = document.querySelectorAll(".quote-image");

// function hideAllImages() {
//     quoteImages.forEach(image => {
//         image.style.display = "none";
//     });
// }

// function showRandomImage() {
//     hideAllImages();
//     const randomIndex = Math.floor(Math.random() * quoteImages.length);
//     quoteImages[randomIndex].style.display = "block";
// }


// hideAllImages();


const url = "https://api.quotable.io/random";
let getQuote = () => {

  changeicon.style.backgroundColor = "transparent";

  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      divWithQuote.innerHTML = item.content;
      divWithAuthor.innerHTML = item.author;

     currentQuote = item.content;
     currentAuthor = item.author;
    });
    showNextImage();

};
function gotoaddquote(){
  window.open("addquote.html", "_blank");
}
function favourite(){
 alert("Quote Added to Favourite");
  
}
// function saveQuote() {
  
//   const quote = divWithQuote.innerHTML;
//   const author = divWithAuthor.innerHTML;

//   // Get the savedQuotes from local storage
//   let savedData = JSON.parse(localStorage.getItem("saved")) || [];

//   // Check if the quote and author combination already exists
//   if (!savedData.some((obj) => obj.quote === quote && obj.author === author)) {
    
//     // Push the new quote and author data
//     savedData.push({ quote, author });
//     localStorage.setItem("saved", JSON.stringify(savedData));
//     // alert("Quote saved to library.");

//     // changeicon.classList.add("clicked");
//     changeicon.className = ("fa-solid fa-check clicked");
//   } else {
//     alert("Quote is already in the library.");
//   }
// }
const savedpop = document.getElementById("BtnCloud4");

function saveQuote() {
  const quote = divWithQuote.innerHTML;
  const author = divWithAuthor.innerHTML;

  let savedData = JSON.parse(localStorage.getItem("saved")) || [];

  // Ensure savedData is an array
  if (!Array.isArray(savedData)) {
    savedData = [];
  }

  // Check if the quote and author combination already exists
  const existingIndex = savedData.findIndex((obj) => obj.quote === quote && obj.author === author);

  if (existingIndex === -1) {
    // Quote does not exist, save it
    savedData.push({ quote, author });
    localStorage.setItem("saved", JSON.stringify(savedData));
    changeicon.style.backgroundColor = "orange"; 
    //  savedpop.style.content = "SAVED!";
    // savedpop.style.visibility = "visible";
    // savedpop.className = "savedpop";
  } else {
    // Quote already exists, remove it
    savedData.splice(existingIndex, 1);
    localStorage.setItem("saved", JSON.stringify(savedData));
    changeicon.style.backgroundColor = "transparent"; // Change the background color to indicate it's not saved
  }
}





// Add a click event listener to the icon for toggling save/delete
changeicon.addEventListener("click", saveQuote);


// Add event listener to the icon for hovering effect
changeicon.addEventListener("mouseenter", () => {
  if (changeicon.classList.contains("clicked")) {
    // If it's saved, change the icon and background color
    changeicon.classList.remove("fa-solid", "fa-x");
    changeicon.classList.add("fa-regular", "fa-trash-alt");
    changeicon.style.backgroundColor = "red";
  }
});

// Remove hover styles when mouse leaves the icon
changeicon.addEventListener("mouseleave", () => {
  if (changeicon.classList.contains("clicked")) {
    // If it's saved, revert back to saved icon and background color
    changeicon.classList.remove("fa-regular", "fa-trash-alt");
    changeicon.classList.add("fa-solid", "fa-x");
    changeicon.style.backgroundColor = "";
  }
});

function openLibrary() {
  window.open("library.html", "_blank");
}
function openTrash() {
  window.open("trash.html", "_blank");
}
function shareOnTwitter() {
  var twitterBaseUrl = 'https://twitter.com/intent/tweet';
  var twitterText = encodeURIComponent(`"${currentQuote}" - ${currentAuthor}`); // Include both the quote and the author
  var twitterUrl = `${twitterBaseUrl}?text=${twitterText}`;

  window.open(twitterUrl, '_blank');
}
// function speakQuote() {
//   const quote = divWithQuote.innerHTML;

//   // Check if speech synthesis is supported in the browser
//   if ('speechSynthesis' in window) {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(quote);

//     // Adjust speech rate if needed (optional)
//     utterance.rate = 0.8;

//     // Handle the 'end' event to stop the audio playback
//     utterance.onend = function () {
//       quoteAudio.pause();
//     };

//     // Handle errors
//     utterance.onerror = function (error) {
//       console.error("Speech synthesis error:", error);
//       alert("An error occurred during speech synthesis. Please check the console for details.");
//     };

//     // Speak the quote
//     synth.speak(utterance);

//     // Play a silent audio to trigger speech synthesis (some browsers require this)
//     quoteAudio.src = 'data:audio/wav;base64,UklGRiIAAABXRUJQVlA4IF8AAAAvDAAIAAA7';
//     quoteAudio.play();
//   } else {
//     alert("Speech synthesis is not supported in this browser.");
//   }
// }
const quoteAudio = document.getElementById("quoteAudio");
function speakQuote() {
  const quote = divWithQuote.innerHTML;

  // Check if speech synthesis is supported in the browser
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(quote);

    // Adjust speech rate if needed (optional)
    utterance.rate = 0.8;

    // Handle the 'end' event to stop the audio playback
    utterance.onend = function () {
      quoteAudio.pause();
    };

    // Handle errors
    utterance.onerror = function (error) {
      console.error("Speech synthesis error:", error);
      alert("An error occurred during speech synthesis. Please check the console for details.");
    };

    // Speak the quote
    synth.speak(utterance);

    // Play a silent audio to trigger speech synthesis (some browsers require this)
    quoteAudio.src = 'data:audio/wav;base64,UklGRiIAAABXRUJQVlA4IF8AAAAvDAAIAAA7';
    quoteAudio.play();
  } else {
    alert("Speech synthesis is not supported in this browser.");
  }
}


const speechBtn = document.querySelector(".speech");
speechBtn.addEventListener("click", () => {
  const quote = divWithQuote.textContent;
  const author = divWithAuthor.textContent;

  if (!quoteAudio.paused) {
    quoteAudio.pause();
  } else {
    const utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
    speechSynthesis.speak(utterance);

    // Add an event listener to pause the audio when it ends
    utterance.addEventListener("end", () => {
      quoteAudio.pause();
    });
  }});