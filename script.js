const myLibrary = [];

function Book(title, author, year, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, year, read) {
    const newBook = new Book(title, author, year, read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    const container = document.querySelector("#library-container");
    container.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <div class="card-buttons">
                <button class="remove-btn">Remove</button>
                <button class="toggle-btn">Toggle Read</button>
            </div>
        `;

        container.appendChild(card);
    });
}

document.querySelector("#library-container").addEventListener("click", (event) => {
    const card = event.target.closest(".book-card");
    if (!card) return;

    const bookId = card.dataset.id;

    if (event.target.classList.contains("remove-btn")) {
        const index = myLibrary.findIndex((b) => b.id === bookId);
        myLibrary.splice(index, 1);
        displayLibrary();
    }

    if (event.target.classList.contains("toggle-btn")) {
        const book = myLibrary.find((b) => b.id === bookId);
        book.toggleRead();
        displayLibrary();
    }
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, true);
addBookToLibrary("1984", "George Orwell", 1949, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960, true);
addBookToLibrary("Dune", "Frank Herbert", 1965, false);

displayLibrary();

const dialog = document.querySelector("#book-dialog");
const form = document.querySelector("#book-form");

document.querySelector("#new-book-btn").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector("#cancel-btn").addEventListener("click", () => {
    form.reset();
    dialog.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    addBookToLibrary(
        data.get("title"),
        data.get("author"),
        Number(data.get("year")),
        data.get("read") === "on"
    );

    form.reset();
    dialog.close();
    displayLibrary();
});