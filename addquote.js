



let previousScrollPosition = 0;


function scrollToRecentlyAdded() {
    const recentlyAddedContainer = document.getElementById("recentlyAddedContainer");

    if (recentlyAddedContainer) {
        previousScrollPosition = window.scrollY;
        recentlyAddedContainer.scrollIntoView({ behavior: "smooth" });
    }
}

function scrollToPreviousPosition() {
    const recentlyAddedContainer = document.getElementById("maincontainer");

    if (recentlyAddedContainer) {
        previousScrollPosition = window.scrollY;
        recentlyAddedContainer.scrollIntoView({ behavior: "smooth" });
    }
}

// Add event listeners to your buttons
const recentlyAddedButton = document.getElementById("smalltext");
const backButton = document.getElementById("backButton");

recentlyAddedButton.addEventListener("click", scrollToRecentlyAdded);
backButton.addEventListener("click", scrollToPreviousPosition);




        function deleteQuote(index) {
            // Get the savedData from local storage
            let savedData = JSON.parse(localStorage.getItem("quotes")) || [];
          
            // Check if there is an object at the specified index
            if (index >= 0 && index < savedData.length) {
              // Get the deletedData from local storage
              let deletedData = JSON.parse(localStorage.getItem("deleted")) || [];
          
              // Add the quote and its author at the specified index to the deletedData array
              deletedData.push(savedData[index]);
          
              // Remove the quote at the specified index from the savedData array
              savedData.splice(index, 1);
          
              // Update the local storage with the new savedData and deletedData arrays
              localStorage.setItem("quotes", JSON.stringify(savedData));
              localStorage.setItem("deleted", JSON.stringify(deletedData));
          
              // Alert the user that the quote was added to the trash
              alert("Quote added to trash.");
              location.reload();
            } else {
              // Handle the case where the index is out of bounds or savedData array is empty
              alert("Invalid index or quote not found.");
            }
          }


function addQuoteToLocalStorage(quote, author) {
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    quotes.push({ quote, author });
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to remove a quote from local storage
function removeQuoteFromLocalStorage(index) {
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    quotes.splice(index, 1);
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display quotes
function displayQuotes() {
    const quotesContainer = document.getElementById("quotes");
    quotesContainer.innerHTML = "";

    const quotes = JSON.parse(localStorage.getItem("quotes")) || [];

    quotes.forEach((quoteObj, index) => {
        const quoteDiv = document.createElement("div");
        quoteDiv.classList.add("quote-item");

        const quoteText = document.createElement("p");
        quoteText.textContent = `"${quoteObj.quote}" - ${quoteObj.author}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "del";
        deleteButton.addEventListener("click", () => {
            deleteQuote(index);
            displayQuotes();
        });

        quoteDiv.appendChild(quoteText);
        quoteDiv.appendChild(deleteButton);
        quotesContainer.appendChild(quoteDiv);
    });
}

// Save quote button click event
const saveQuoteButton = document.getElementById("savequote");
saveQuoteButton.addEventListener("click", () => {
    const quoteInput = document.getElementById("quoteadding");
    const authorInput = document.querySelector(".inputbox input"); // Update selector

    const quote = quoteInput.value.trim();
    const author = authorInput.value.trim();

    if (quote && author) {
        addQuoteToLocalStorage(quote, author);
        displayQuotes();

        // Clear input fields
        quoteInput.value = "";
        authorInput.value = "";
    }
});

// Initial display of quotes
displayQuotes();

