let myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target) {
        throw Error("You have to use the 'new' operator to call the constructor.")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.changeStatus = function() {
    this.read = !this.read;
    renderBooks();
}

const form = document.querySelector("form");
form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();
    const book = new Book(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].checked);
    myLibrary.push(book);
    renderBooks();
    e.target.reset();
}

function changeStatus(id) {
    const currentBook = myLibrary.find(book => book.id === id);
    currentBook.changeStatus();
}

function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    renderBooks();
}

const root = document.querySelector("#root");
function renderBooks() {
    root.innerHTML = "";
    myLibrary.map(({title, author, pages, read, id}) => {
        const card = document.createElement("section");
        card.classList.add("card");

        const titleElem = document.createElement("h2");
        titleElem.textContent = title;

        const authorElem = document.createElement("p");
        authorElem.textContent = author;

        const pagesElem = document.createElement("p");
        pagesElem.textContent = `${pages} pages`;

        const buttonContainer = document.createElement("div");

        const changeButton = document.createElement("button");
        changeButton.classList.add("change");
        changeButton.textContent = read ? "read" : "not read yet";
        changeButton.onclick = () => changeStatus(id);

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeBook(id);

        buttonContainer.appendChild(changeButton);
        buttonContainer.appendChild(removeButton);
        card.appendChild(titleElem);
        card.appendChild(authorElem);
        card.appendChild(pagesElem);
        card.appendChild(buttonContainer);

        root.appendChild(card);
    })
}

const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, false);
myLibrary.push(theHobbit);

renderBooks();

const modal = document.querySelector("dialog");
const openButton = document.querySelector(".open");
const closeButtons = document.querySelectorAll(".close");

openButton.addEventListener("click", () => {
    modal.showModal();
})

const inputElements = document.querySelectorAll("#title, #author, #pages");
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const inputsNotEmpty = [...inputElements].every(input => input.value !== "");
        if(button.textContent == "Close") {
            modal.close();
        }

        if(inputsNotEmpty) {
            modal.close();
        }
    })
})