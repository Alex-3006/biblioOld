"use client";

import Link from "next/link";

import { useState } from "react";

import client from "./api/client.json";
import book from "./api/book.json";
import lendFile from "./api/lend.json";

async function sendDataToServer(message) {
  const data = message; // Your data to write to the JSON file

  try {
    const response = await fetch("/api/postData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data successfully written to the JSON file.");
    } else {
      console.error("Failed to write data to the JSON file.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export default function Page() {
  const bringBack = async () => {
    let canDelete = false;
    let deleteElement;
    
    lendFile.forEach((element) => {
      if (element.book == bookID && element.client == clientID) {
        canDelete = true;
        deleteElement = element;
      }
    });

    if (canDelete == true) {
      let file = lendFile.filter((item) => item.book != bookID)

      console.log(file);
      sendDataToServer(file);
    } else {
      alert("Valorile nu corespund")
    }
  };

  const [clientID, setClientID] = useState("");
  const [filteredDataClient, setFilteredDataClient] = useState(client);

  let veryfiedValueClient = false;

  const handleInputChangeClient = (event) => {
    const { value } = event.target;
    setClientID(value);
    filterDataClient(value);

    veryfiedValueClient = false;

    filteredDataClient.forEach((element) => {
      if (element.id == clientID) {
        veryfiedValueClient = true;
      }
    });

    return veryfiedValueClient;
  };

  const filterDataClient = (searchTerm) => {
    const filteredData = client.filter((item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDataClient(filteredData);
  };

  const [bookID, setBookID] = useState("");
  const [filteredDataBook, setFilteredDataBook] = useState(book);

  let veryfiedValueBook = false;

  const handleInputChangeBook = (event) => {
    const { value } = event.target;
    setBookID(value);
    filterDataBook(value);

    veryfiedValueBook = false;

    filteredDataBook.forEach((element) => {
      if (element.id == bookID) {
        veryfiedValueBook = true;
      }
    });

    return veryfiedValueBook;
  };

  const filterDataBook = (searchTerm) => {
    const filteredData = book.filter((item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDataBook(filteredData);
  };

  return (
    <main className="mainComp">
      <form action="/" method="POST" className="form">
        <input
          className="clientID"
          minLength="4"
          maxLength="4"
          name="ClientID"
          id="ClientID"
          type="text"
          placeholder="ID al dumneavoastră"
          value={clientID}
          onChange={handleInputChangeClient}
          required
        ></input>
        <br />
        <input
          className="bookID"
          minLength="4"
          maxLength="4"
          name="BookID"
          id="BookID"
          type="text"
          placeholder="ID al cărții"
          value={bookID}
          onChange={handleInputChangeBook}
          required
        ></input>
        <br />
        <input
          className="submitButton"
          type="submit"
          value="Împrumută"
          onClick={bringBack}
        />
      </form>
      <Link href="/">
        <button className="buttonComp">Pagina principală</button>
      </Link>
    </main>
  );
}
