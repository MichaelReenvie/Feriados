import React from "react";

function Footer({ currentPage, totalPages, onPageChange }) {
  const handleClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="btn-paginacao">
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={number === currentPage ? "active" : ""}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <h2>
        Foi feito por mim 👉
        <a
          href="https://www.linkedin.com/in/michael-eduardo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michael Eduardo
        </a>
      </h2>
    </div>
  );
}

export default Footer;
