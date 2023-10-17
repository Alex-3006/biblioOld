"use client";

import Link from "next/link";

import React, { useState } from "react";

import book from "./api/book.json";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(book);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (searchTerm) => {
    const filteredData = book.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <main className="mainComp">
      <input
        type="text"
        placeholder="Caută carte"
        value={searchTerm}
        onChange={handleInputChange}
        className="input"
      />
      <ul className="ul">
        {filteredData.map((item) => (
          <li key={item.id} className="li">
            {item.title}
          </li>
        ))}
      </ul>

      <Link href="/">
        <button className="buttonComp">Pagina principală</button>
      </Link>
    </main>
  );
}
