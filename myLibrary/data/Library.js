export class Library {
    constructor() {
      this.books = this.loadBooks();
    }
  
    addBook(book) {
      this.books.push(book);
      this.saveBooks();
    }
  
    removeBook(id) {
      this.books = this.books.filter(b => b.id !== id);
      this.saveBooks();
    }
  
    saveBooks() {
      localStorage.setItem('myLibrary', JSON.stringify(this.books));
    }
  
    loadBooks() {
      const stored = localStorage.getItem('myLibrary');
      return stored ? JSON.parse(stored) : [];
    }
  
    getBooks() {
      return this.books;
    }
  }
  