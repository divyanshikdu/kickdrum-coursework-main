import type { Book } from "../types/book"
import BookCard from "./BookCard"

interface Props {
  books: Book[]
}

function BookList({ books }: Props) {
  if (books.length === 0) {
    return <p>No books found.</p>
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookList
