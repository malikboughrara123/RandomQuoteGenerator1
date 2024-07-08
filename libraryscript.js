const savedQuotesList = document.getElementById("savedQuotesList");
const clearAllQuotesButton = document.getElementById("clearAllQuotesButton");
const goBackButton = document.getElementById("goBackButton");
const libraryContainer = document.getElementById("libraryContainer");
const savedAuthorsList = document.getElementById("savedAuthorsList");
const saved = document.getElementById("saved")
let savedQuotes = [];
let savedAuthors = [];
let deletedQuotes = [];
let deletedAuthors = [];

function openTrash() {
  window.open("trash.html", "_blank");
}

goBackButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
function deleteQuote(index) {
  // Get the savedData from local storage
  let savedData = JSON.parse(localStorage.getItem("saved")) || [];

  // Check if there is an object at the specified index
  if (index >= 0 && index < savedData.length) {
    // Get the deletedData from local storage
    let deletedData = JSON.parse(localStorage.getItem("deleted")) || [];

    // Add the quote and its author at the specified index to the deletedData array
    deletedData.push(savedData[index]);

    // Remove the quote at the specified index from the savedData array
    savedData.splice(index, 1);

    // Update the local storage with the new savedData and deletedData arrays
    localStorage.setItem("saved", JSON.stringify(savedData));
    localStorage.setItem("deleted", JSON.stringify(deletedData));

    // Alert the user that the quote was added to the trash
    alert("Quote added to trash.");
    location.reload();
  } else {
    // Handle the case where the index is out of bounds or savedData array is empty
    alert("Invalid index or quote not found.");
  }
}


function populateSavedQuotes() {
  const savedData = JSON.parse(localStorage.getItem("saved")) || [];

  saved.innerHTML = ""; // Clear previous content

  if (savedData.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "The library is empty.";
    emptyMessage.classList.add("empty-message"); // Add the class here
    libraryContainer.appendChild(emptyMessage);

    clearAllQuotesButton.style.display = "none";
    goBackButton.style.display = "block";
  } else {
    savedData.forEach((data, index) => {
      let div = document.createElement("div");
      div.className = "container";

      const quoteText = document.createElement("p");
      quoteText.textContent = `"${data.quote}" - ${data.author}`;
      quoteText.classList.add("quote");
        div.appendChild(quoteText);// Apply the 'quote' class here
        
      let deleteI = document.createElement("i");
      deleteI.className = "fa-solid fa-trash";

      deleteI.addEventListener("click", () => {
        deleteQuote(index);
      });

      div.appendChild(deleteI);
      saved.appendChild(div); // Corrected variable name here
    });

    clearAllQuotesButton.style.display = "block";
    goBackButton.style.display = "block";
  }
}



document.addEventListener("DOMContentLoaded", () => {
  savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
  savedAuthors = JSON.parse(localStorage.getItem("savedAuthors")) || [];
  populateSavedQuotes();
});
