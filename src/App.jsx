import React, { useState } from "react";
import Search from "./components/Search/Page";
import "./components/Style/Page.css";

function App() {
  const [, setSelectedYear] = useState("");
  return (
    <>
      <h1>Feriados Nacionais</h1>
      <Search setSelectedYear={setSelectedYear} />
    </>
  );
}

export default App;
