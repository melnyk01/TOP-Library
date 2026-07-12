let books = [];
const library = document.querySelector('.library');

function Book(title, author, numberOfPages, status) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.id = self.crypto.randomUUID()
}

function addBookToLibrary(title, author, numberOfPages, status) {
    let book = new Book(title, author, numberOfPages, status);
    books.push(book)

}

function displayBook(book) {
    const card = document.createElement('div');
    const title = document.createElement('h1');
    const author = document.createElement('h3');
    const numberOfPages = document.createElement('p');
    const status = document.createElement('p');
    const removeBook = document.createElement('button');
    title.textContent = book.title;
    author.textContent = book.author;
    numberOfPages.textContent = book.numberOfPages;
    status.textContent = book.status;
    removeBook.textContent = 'Remove from shelf';

    library.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numberOfPages);
    card.appendChild(status);
    card.appendChild(removeBook);
}

function displayLibrary() {
    for (const book of books) {
        displayBook(book);
    }
}


addBookToLibrary('Red Rising', 'Pierce Brown', 382, 'finished');
addBookToLibrary('Harry Potter', 'J. K. Rowling', 309, 'want to read');
console.table(books)

displayLibrary();

