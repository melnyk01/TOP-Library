let books = [];

function Book(title, author, numberOfPages, status) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.id = self.crypto.randomUUID()
}

function addBookToLibrary(title, author, numberOfPages, status) {
    Book.call(this, title, author, numberOfPages, status);
    // books.push(book)
}

const book1 = new addBookToLibrary('hobbit', 'hh', 22, 'read');
books.push(book1);
console.table(books)

for (book of books) {

}

