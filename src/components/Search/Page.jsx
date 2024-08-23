import React, { useState, useEffect } from "react";
import { HiOutlineSearchCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "../Api/Page";
import Table from "../Table/Page";

function Search() {
  const [inputYear, setInputYear] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setInputYear(currentYear);
    setSelectedYear(currentYear);

    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`feriados/v1/${currentYear}`);
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleYearChange = (event) => {
    const { value } = event.target;
    if (/^\d{0,4}$/.test(value)) {
      setInputYear(value);
    }
  };

  const handleSearch = async () => {
    if (/^\d{4}$/.test(inputYear)) {
      const toastId = toast.loading("Carregando...");

      try {
        const response = await axios.get(`feriados/v1/${inputYear}`);

        setTimeout(() => {
          if (response.data.length > 0) {
            setSelectedYear(inputYear);
            setData(response.data);
            toast.update(toastId, {
              render: `Ano ${inputYear} encontrado com sucesso`,
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
          } else {
            toast.update(toastId, {
              render: `Erro ao buscar dados para o ano ${inputYear}.`,
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
        }, 3000);
      } catch (error) {
        toast.update(toastId, {
          render: `Erro ao buscar dados para o ano ${inputYear}.`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } else {
      toast.info("Por favor, insira um ano com 4 dígitos.");
    }
  };

  return (
    <div>
      <div className="Pesquisa">
        <label htmlFor="input-year">Pesquisa:</label>
        <input
          id="input-year"
          type="text"
          maxLength={4}
          placeholder="Ano"
          value={inputYear}
          onChange={handleYearChange}
        />
        <button onClick={handleSearch}>
          <HiOutlineSearchCircle />
        </button>
      </div>

      {selectedYear && <Table selectedYear={selectedYear} data={data} />}
    </div>
  );
}

export default Search;
