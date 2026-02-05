import { books } from "../data/books"
import type { Book } from "../types/book"

export const fetchBooksFromData = (): Book[] => {
  try {
    return books
  } catch (error) {
    console.error("Failed to fetch books:", error)
    return []
  }
}

export const searchBooks = (query: string): Book[] => {
  try {
    const lowerQuery = query.toLowerCase()

    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
    )

    console.log("Search Results:", results)
    return results
  } catch (error) {
    console.error("Search failed:", error)
    return []
  }
}

export const getAvailableBooks = (): Book[] => {
  try {
    return books.filter((book) => book.available)
  } catch (error) {
    console.error("Available books filter failed:", error)
    return []
  }
}

export const getBooksByYearRange = (
  startYear: number,
  endYear: number
): Book[] => {
  try {
    return books.filter(
      (book) => book.year >= startYear && book.year <= endYear
    )
  } catch (error) {
    console.error("Year range filter failed:", error)
    return []
  }
}
