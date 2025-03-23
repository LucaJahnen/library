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
        root.innerHTML += `
            <section class="card">
                <h2>${title}</h2>
                <p>${author}</p>
                <p>${pages} pages</p>
                <div>
                    <button class="change" onclick='changeStatus("${id}")'>${read ? "read" : "not read yet"}</button>
                    <button class="remove" onclick='removeBook("${id}")'>Remove</button>
                </div>
            </section>
        `;
    })
}

for(i=0;i<10;i++) {
    const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, false);
    myLibrary.push(theHobbit);
}

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
        inputsNotEmpty && modal.close();
    })
})