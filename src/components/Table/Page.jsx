import React, { useState } from "react";
import { HiCalendar } from "react-icons/hi";
import Footer from "../Footer/Page";

function Table({ selectedYear, data = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>Ícone</h1>
            </th>
            <th>
              <h1>Nomes</h1>
            </th>
            <th>
              <h1>Tipo</h1>
            </th>
            <th>
              <h1>Data</h1>
            </th>
          </tr>
        </thead>
        <tbody className="box-vitrines">
          {paginatedData.length > 0 ? (
            paginatedData.map((holiday) => (
              <tr key={holiday.date}>
                <td>
                  <HiCalendar />
                </td>
                <td>{holiday.name}</td>
                <td>{holiday.type}</td>
                <td>{formatDate(holiday.date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum dado disponível</td>
            </tr>
          )}
        </tbody>
      </table>

      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Table;
