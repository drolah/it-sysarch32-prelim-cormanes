import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    setIsLoading(true);
    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setPokemons(data.data);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div>
        <button className="button" onClick={() => handleLanguageChange("english")}>English</button>
        <button className="button" onClick={() => handleLanguageChange("japanese")}>Japanese</button>
        <button className="button" onClick={() => handleLanguageChange("chinese")}>Chinese</button>
        <button className="button" onClick={() => handleLanguageChange("french")}>French</button>
      </div>

      <div>
        <p className="pageNumber"> Page {currentPage} of {totalPages} </p>
      </div>

      <div>
        <button
          className="buttonBackNext"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          Back
        </button>
        {[...Array(totalPages).keys()].map(pageNumber => (
          <button
            key={pageNumber + 1}
            className="buttonPages"
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={currentPage === pageNumber + 1 || isLoading}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          className="buttonBackNext"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
        >
          Next
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="pokemons">
          {pokemons.map(pokemon => (
            <Pokemon
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name[selectedLanguage]}
              image={pokemon.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
