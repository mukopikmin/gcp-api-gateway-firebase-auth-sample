import { Book } from "../utils/book";

const BookList = (props: { books: Book[] }) => (
  <ul>
    {props.books.map((book) => (
      <li key={book.id}>{book.title}</li>
    ))}
  </ul>
);

export default BookList;
