
class Book {
    constructor(title, author, numberOfPages, status) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.status = status;
        this.id = crypto.randomUUID()
    }
    changeBookStatus() {
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
            default:
                this.status = "Reading";
                break;
        }
    }


}

class UI {
    constructor() {
        this.uiLibrary = document.querySelector('.library');
        this.newBookButton = document.querySelector('#new-book');
        this.dialog = document.querySelector('#new-book-dialog');
        this.closeDialog = document.querySelector('#close-dialog');
        this.formButton = document.querySelector('#form-button');
        this.newBookTitle = document.querySelector('#book-title');
        this.newBookAuthor = document.querySelector('#book-author');
        this.newBookNumberOfPages = document.querySelector('#book-number-of-pages');
        this.newBookStatus = document.querySelector('#book-status');
        this.newBookButton.addEventListener('click', () => {
            this.dialog.showModal();
        })
        this.closeDialog.addEventListener('click', () => {
            this.dialog.close();
        })
        this.formButton.addEventListener('click', () => {
            this.dialog.close();
        })
        this.formButton.addEventListener('click', (event) => {
            event.preventDefault();
            const title = this.newBookTitle.value;
            const author = this.newBookAuthor.value;
            const numberOfPages = this.newBookNumberOfPages.value;
            const status = this.newBookStatus.value;
            this.newBookTitle.value = '';
            this.newBookAuthor.value = '';
            this.newBookNumberOfPages.value = ''; 1
            this.newBookStatus.value = '';
            myLibrary.addBook(title, author, numberOfPages, status);
            this.displayLibrary();
        })
        this.uiLibrary.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return
            if (e.target.className == 'status') {
                myLibrary.changeBookStatus(e.target.id);
                this.displayLibrary();
            } else {
                myLibrary.removeBook(myLibrary.findBook(e.target.id));
                this.displayLibrary();

            }
        })


    }
    displayBook(book) {
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

        this.uiLibrary.appendChild(card);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(numberOfPages);
        card.appendChild(status);
        card.appendChild(removeBook);
        card.appendChild(changeStatus);
    }
    clearLibrary() {
        while (this.uiLibrary.lastChild) {
            this.uiLibrary.removeChild(this.uiLibrary.lastChild)
        }
    }
    displayLibrary() {
        this.clearLibrary();
        for (const book of myLibrary.books) {
            this.displayBook(book);
        }
    }
}

class Library {
    constructor() {
        this.books = []
    }
    addBook(title, author, numberOfPages, status) {
        let book = new Book(title, author, numberOfPages, status);
        this.books.push(book);
    }
    findBook(bookId) {
        return this.books.find(element => element.id === bookId)
    }
    removeBook(book) {
        const bookIndex = this.books.indexOf(book);
        this.books.splice(bookIndex, 1);
    }
    changeBookStatus(bookId) {
        const book = this.findBook(bookId);
        book.changeBookStatus();
    }
}
const myLibrary = new Library();
const myUI = new UI();
myLibrary.addBook('Red Rising', 'Pierce Brown', 382, 'Finished');
myLibrary.addBook('Harry Potter', 'J. K. Rowling', 309, 'Finished');

console.log(myLibrary);
myUI.displayLibrary();
