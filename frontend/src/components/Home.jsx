import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://library-6cmg.onrender.com/books");
        setBooks(res.data);
        setFilteredBooks(res.data); // Initially set filteredBooks to all books
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtering
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.sub.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.descp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.price.toString().includes(searchTerm.toLowerCase()) ||
        book.cover.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleSearchButton = () => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.sub.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.descp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.price.toString().includes(searchTerm.toLowerCase()) ||
        book.cover.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

 

  return (
    <div>
      <h1>Kamalesh Book Shop</h1>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSearchButton}>Search</button>
      </div>
      <div className="books">
        {currentBooks.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <h3>{book.sub}</h3>
            <h3>{book.author}</h3>
            <p>{book.descp}</p>
            <span>${book.price}</span>
            
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
          <li key={index} onClick={() => paginate(index + 1)} className="page-item">
            <a href="#!" className="page-link">
              {index + 1}
            </a>
          </li>
        ))}
      </ul>

     
    </div>
  );
};

export default Home;
