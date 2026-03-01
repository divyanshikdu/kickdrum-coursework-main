// import type { Book } from "../types/book"

// interface Props {
//   book: Book
// }

// function BookCard({ book }: Props) {
//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: 12,
//         marginBottom: 10,
//         borderRadius: 8,
//       }}
//     >
//       <h3>{book.title}</h3>

//       <p>
//         <strong>Author:</strong> {book.author}
//       </p>

//       <p>
//         <strong>Genre:</strong> {book.genre}
//       </p>

//       <p>
//         <strong>Rating:</strong>  {book.rating}
//       </p>

//       <p
//         style={{
//           color: book.available ? "green" : "red",
//         }}
//       >
//         {book.available ? "Available" : "Unavailable"}
//       </p>
//     </div>
//   )
// }

// export default BookCard
import type { Book } from "../types/book"

interface Props {
  book: Book
}

function BookCard({ book }: Props) {
  return (
    <div
      style={{
        border: `2px solid ${book.available ? "#22c55e" : "#ef4444"}`,
        background: book.available ? "#f0fdf4" : "#fef2f2",
        padding: 16,
        marginBottom: 14,
        borderRadius: 14,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        transition: "transform 0.15s ease",
      }}
    >
      <h3 style={{ marginBottom: 6 }}>{book.title}</h3>

      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Rating:</strong> ⭐ {book.rating}</p>

      <p
        style={{
          marginTop: 6,
          fontWeight: 600,
          color: book.available ? "#16a34a" : "#dc2626",
        }}
      >
        {book.available ? "Available" : "Unavailable"}
      </p>
    </div>
  )
}

export default BookCard
