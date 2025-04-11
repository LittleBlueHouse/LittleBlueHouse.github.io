import { Book } from '../data/Book.js';
import { BookRenderer } from './BookRenderer.js';

export class LibraryUI {
  constructor(library, listElementId, formElementId) {
    this.library = library;
    this.listEl = document.getElementById(listElementId);
    this.formEl = document.getElementById(formElementId);

    this.formEl.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.render();
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value.trim();
    const author = form.author.value.trim();
    const isbn = form.isbn.value.trim();
    const coverUrl = form.coverUrl.value.trim();
    const status = form.status.value;

    let book = null;

    if (isbn) {
      book = await Book.fromISBN(isbn, status);
    }

    if (!book) {
      if (!title || !author) {
        alert('Please provide title and author if not using ISBN.');
        return;
      }
      book = new Book(title, author, isbn, coverUrl, status);
    }

    this.library.addBook(book);
    this.render();
    form.reset();
  }

  render() {
    this.listEl.innerHTML = '';
    const books = this.library.getBooks();
    if (books.length === 0) {
      this.listEl.innerHTML = '<p>No books yet.</p>';
      return;
    }

    books.forEach(book => {
      const bookEl = BookRenderer.render(book, (id) => {
        this.library.removeBook(id);
        this.render();
      });
      this.listEl.appendChild(bookEl);
    });
  }
}
