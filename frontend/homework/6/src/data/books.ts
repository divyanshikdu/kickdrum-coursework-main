import type { Book } from "../types/book"

export const books: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "fantasy",
    year: 1937,
    pages: 310,
    rating: 4.8,
    available: true,
    description: "A fantasy adventure novel"
  },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "history",
    year: 2011,
    pages: 443,
    rating: 4.7,
    available: false
  },
    {
    id: 3,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    genre: "biography",
    year: 1999,
    pages: 180,
    rating: 4.7,
    available: true,
    description: "Autobiography of India's Missile Man and former President."
  },
  {
    id: 4,
    title: "The Guide",
    author: "R.K. Narayan",
    genre: "fiction",
    year: 1958,
    pages: 224,
    rating: 4.3,
    available: true,
    description: "A classic Indian novel set in the fictional town of Malgudi."
  },
  {
    id: 5,
    title: "Train to Pakistan",
    author: "Khushwant Singh",
    genre: "history",
    year: 1956,
    pages: 181,
    rating: 4.4,
    available: false,
    description: "A powerful story based on the partition of India."
  },
  {
    id: 6,
    title: "The White Tiger",
    author: "Aravind Adiga",
    genre: "fiction",
    year: 2008,
    pages: 276,
    rating: 4.1,
    available: true,
    description: "A Booker Prize-winning novel about class struggle in India."
  },
  {
    id: 7,
    title: "Ignited Minds",
    author: "A.P.J. Abdul Kalam",
    genre: "non-fiction",
    year: 2002,
    pages: 205,
    rating: 4.6,
    available: true,
    description: "A motivational book for the youth of India."
  }

]
