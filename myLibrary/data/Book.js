export class Book {
    constructor(title, author, isbn = '', coverUrl = '', status = 'owned', location = '') {
      this.id = Date.now();
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.coverUrl = coverUrl;
      this.status = status;
      this.location = location;
    }
  
    static async fromISBN(isbn, status = 'owned', location = '') {
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
  
        if (data.totalItems === 0) throw new Error('No book found');
  
        const info = data.items[0].volumeInfo;
        return new Book(
          info.title || 'Unknown Title',
          (info.authors && info.authors.join(', ')) || 'Unknown Author',
          isbn,
          (info.imageLinks && info.imageLinks.thumbnail) || '',
          status,
          location
        );
      } catch (err) {
        console.error('ISBN fetch error:', err);
        return null;
      }
    }
  }
  