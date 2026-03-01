import { useState } from "react"
import { fetchBooksFromData, searchBooks } from "./services/bookService"
import type { Book } from "./types/book"
import BookList from "./components/BookList"

function App() {
  const [books, setBooks] = useState<Book[]>(fetchBooksFromData())
  const [query, setQuery] = useState("")
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState(0)

  const handleSearch = () => {
    const results = searchBooks(query)
    setBooks(results)
  }

  const applyFilters = () => {
    let filtered = searchBooks(query)

    if (genre) {
      filtered = filtered.filter((book) => book.genre === genre)
    }

    if (rating > 0) {
      filtered = filtered.filter((book) => book.rating >= rating)
    }

    setBooks(filtered)
  }

  // stats 
  const totalBooks = books.length
  const availableBooks = books.filter((b) => b.available).length
  const unavailableBooks = books.filter((b) => !b.available).length

  // Normal → all books
  // Search → only available books
  const visibleBooks =
    query.trim() === ""
      ? books
      : books.filter((book) => book.available)

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>
           Book Library
        </h1>

 
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* filters */}
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="biography">Biography</option>
          </select>

          <input
            type="number"
            placeholder="Min rating"
            min={0}
            max={5}
            step={0.1}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{ width: 120 }}
          />

          <button onClick={applyFilters}>Apply Filters</button>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: 12,
            borderRadius: 10,
            background: "#f0f4f8",
            display: "flex",
            justifyContent: "space-around",
            fontWeight: "bold",
          }}
        >
          <span>Total: {totalBooks}</span>
          <span style={{ color: "green" }}>Available: {availableBooks}</span>
          <span style={{ color: "gray" }}>Unavailable: {unavailableBooks}</span>
        </div>

        {/* book list */}
        <div style={{ marginTop: 20 }}>
          <BookList books={visibleBooks} />
        </div>
      </div>
    </div>
  )
}

export default App

