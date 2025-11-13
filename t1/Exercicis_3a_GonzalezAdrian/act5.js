class Book {
    constructor(title = null, autor = null, category = null, publishDate = null, numPages = null) {
        this.title = title;
        this.autor = autor;
        this.category = category;
        this.publishDate = publishDate;
        this.numPages = numPages;
    }
}

const book1 = new Book("El Principito", "Antoine de Saint-Exupéry", "Ficción",)
const book2 = new Book("1984", "George Orwell", null, "1949", 444);
const book3 = new Book("Cien años de soledad", null, "Realismo mágico", null, 417);
const book4 = new Book("Orgullo y prejuicio", "Jane Austen", "Romance");
const book5 = new Book("La sombra del viento", "Carlos Ruiz Zafón", "Misterio", "2001-04-01");

const bookArray  = [ book1, book2, book3, book4, book5]

bookArray.forEach(book => {
    console.log(book);
});