class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class BookList {
  displayBook() {
    const books = Storage.getItem('books');
    books.forEach((book) => {
      this.addBook(book);
    });
  }

  addBook(book) {
    const list = document.querySelector('#book-list');
    const item = document.createElement('tr');
    item.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" id="delete">X<a></td>
    `;
    list.appendChild(item);
  }

  removeBook(book) {
    const bookId = book.parentElement.previousElementSibling.textContent;
    if (book.id === 'delete') { 
      book.parentElement.parentElement.remove(); 
    }
    Storage.removeItem('isbn', bookId, 'books');
  }

  clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

class Storage {
  static getItem(itemList) {
    if (localStorage.getItem(itemList) === null) {
      itemList = [];
    } else {
      itemList = JSON.parse(localStorage.getItem(itemList));
    }
    return itemList;
  }

  static addItem(item, itemList) {
    const items = Storage.getItem(itemList);
    items.push(item);
    localStorage.setItem(itemList, JSON.stringify(items));
  }

  static removeItem(itemKeyName, itemId, itemList) {
    const items = Storage.getItem(itemList);
    items.forEach((item, index) => {
      console.log();
      if (item[itemKeyName] === itemId) {
        items.splice(index, 1);
        localStorage.setItem(itemList, JSON.stringify(items));
      }
    });
  }
}



const bookForm = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');

document.addEventListener('DOMContentLoaded', () => {
  const bookList = new BookList();
  bookList.displayBook();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  const newBook = new Book(title, author, isbn);
  const bookList = new BookList();

  bookList.addBook(newBook);
  bookList.clearForm();
  Storage.addItem(newBook, 'books');
});

bookList.addEventListener('click', (e) => {
  const bookList = new BookList();
  bookList.removeBook(e.target);
});