const deletedQuotesList = document.getElementById("deletedQuotesList");
const deletedAuthorsList = document.getElementById("deletedAuthorsList");
const deleted = document.getElementById("quotes")
function populateDeletedQuotes() {
  // Get deleted data from local storage
  const deletedData = JSON.parse(localStorage.getItem("deleted")) || [];

  quotes.innerHTML = ""; // Clear previous content

  if (deletedData.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "The Trash is empty.";
    emptyMessage.classList.add("empty-message");
    deletedQuotesList.appendChild(emptyMessage);
  } else {
    deletedData.forEach((data, index) => {
      let div = document.createElement("div");
      div.className = "quoteContainer";

      const quoteText = document.createElement("p");
      quoteText.textContent = `"${data.quote}" - ${data.author}`;
    quoteText.classList.add("quote");
      div.appendChild(quoteText);

      // Check if there is an author for this quote
      // if (data.author) {
      //   const authorElement = document.createElement("p");
      //   authorElement.textContent = "Author: " + data.author; // Display the author
      //   authorElement.classList.add("author");
      //   div.appendChild(authorElement);
      // }

      let restore = document.createElement("i");
      restore.className = "fa-solid fa-rotate-left";

      restore.addEventListener("click", () => {
        // Restore quote to library
        restoreQuote(index);
      });

      let deleteI = document.createElement("i");
      deleteI.className = "fa-solid fa-trash";

      deleteI.addEventListener("click", () => {
        deleteQuote(index);
      });

      div.appendChild(restore);
      div.appendChild(deleteI);
      deleted.appendChild(div);
    });
  }
}

const clearAllButton = document.getElementById("clearAll");
clearAllButton.addEventListener("click", () => {
  // Clear all deleted data from local storage
  localStorage.removeItem("deleted");
  populateDeletedQuotes();
});

function deleteQuote(index) {
  // Get deleted data from local storage
  let deletedData = JSON.parse(localStorage.getItem("deleted")) || [];

  // Check if there is an object at the specified index
  if (index >= 0 && index < deletedData.length) {
    // Remove the data at the specified index from the deletedData array
    deletedData.splice(index, 1);

    // Update the local storage with the new deletedData array
    localStorage.setItem("deleted", JSON.stringify(deletedData));

    // Alert the user that the quote was permanently deleted
    alert("Quote permanently deleted.");

    // Update the view of deleted quotes
    populateDeletedQuotes();
  } else {
    // Handle the case where the index is out of bounds or deletedData array is empty
    alert("Invalid index or quote not found.");
  }
}


function restoreQuote(index) {
  // Get deleted data from local storage
  let deletedData = JSON.parse(localStorage.getItem("deleted")) || [];
  let savedData = JSON.parse(localStorage.getItem("saved")) || [];

  // Check if there is an object at the specified index
  if (index >= 0 && index < deletedData.length) {
    // Get the data at the specified index from the deletedData array
    const restoredData = deletedData[index];

    // Add the restored data to the savedData array
    savedData.push(restoredData);

    // Update the local storage with the new savedData array
    localStorage.setItem("saved", JSON.stringify(savedData));

    // Remove the restored data from the deletedData array
    deletedData.splice(index, 1);

    // Update the local storage with the new deletedData array
    localStorage.setItem("deleted", JSON.stringify(deletedData));

    // Alert the user that the quote was restored
    alert("Quote restored to library.");

    // Update the view of deleted quotes and saved quotes
    populateDeletedQuotes();
    populateSavedQuotes();
  } else {
    // Handle the case where the index is out of bounds or deletedData array is empty
    alert("Invalid index or quote not found.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateDeletedQuotes();
});
