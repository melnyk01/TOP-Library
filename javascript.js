let books = [];
const library = document.querySelector('.library');
const newBookButton = document.querySelector('#new-book');
const dialog = document.querySelector('#new-book-dialog');
const closeDialog = document.querySelector('#close-dialog');
const formButton = document.querySelector('#form-button');
const newBookTitle = document.querySelector('#book-title');
const newBookAuthor = document.querySelector('#book-author');
const newBookNumberOfPages = document.querySelector('#book-number-of-pages');
const newBookStatus = document.querySelector('#book-status');

function Book(title, author, numberOfPages, status) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.id = self.crypto.randomUUID()
}
Book.prototype.changeStatus = function() {
    switch (this.status) {
        case 'Finished':
            this.status = 'Want to read'
            break;
    
        case 'Want to read':
            this.status = 'Reading'
            break;

        case 'Reading':
            this.status = 'Finished'
            break;
    }
    displayLibrary();
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
    const changeStatus = document.createElement('button');
    removeBook.id = book.id
    changeStatus.id = book.id
    title.textContent = book.title;
    author.textContent = book.author;
    numberOfPages.textContent = book.numberOfPages;
    status.textContent = book.status;
    removeBook.textContent = 'Remove from shelf';
    changeStatus.textContent = 'Change book status';
    changeStatus.className = 'status';

    library.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numberOfPages);
    card.appendChild(status);
    card.appendChild(removeBook);
    card.appendChild(changeStatus);


}
function displayLibrary() {
    while (library.lastChild) {
        library.removeChild(library.lastChild)
    }
    for (const book of books) {
        displayBook(book);
    }
}
function removeBook(bookId) {
    for (let book of books) {
        if (book.id == bookId) {
            const bookIndex = books.indexOf(book);
            books.splice(bookIndex, 1);
            displayLibrary()
        }
    }

}
function changeBookStatus(bookId) {
    for (let book of books) {
        if (book.id == bookId) {
            const bookIndex = books.indexOf(book);
            books[bookIndex].changeStatus();
        }
    }
}
newBookButton.addEventListener('click', () => {
    dialog.showModal();
})
closeDialog.addEventListener('click', () => {
    dialog.close();
})
formButton.addEventListener('click', () => {
    dialog.close();
})
formButton.addEventListener('click', (event) => {
    event.preventDefault();
    const title = newBookTitle.value;    
    const author = newBookAuthor.value;    
    const numberOfPages = newBookNumberOfPages.value;    
    const status = newBookStatus.value;
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookNumberOfPages.value = '';
    newBookStatus.value = '';
    addBookToLibrary(title, author, numberOfPages, status);
    displayLibrary()
})
library.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return
    if (e.target.className == 'status') {
        changeBookStatus(e.target.id);
    } else removeBook(e.target.id);

} )

addBookToLibrary('Red Rising', 'Pierce Brown', 382, 'Finished');
addBookToLibrary('Harry Potter', 'J. K. Rowling', 309, 'Finished');

displayLibrary();
