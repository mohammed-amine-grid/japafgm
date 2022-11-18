import React, { FC, useState } from "react";
import "./SearchForm.scss";
import brand from "../assets/brand.png";

interface SearchFormProps {
  pokemonName: string;
  initialPokemonName?: string;
  onSubmit: (newPokemonName: string) => void;
}

const SearchForm: FC<SearchFormProps> = ({ pokemonName, onSubmit }) => {

  let pokemonInput = pokemonName.slice();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    pokemonInput = e.target.value;

    console.log(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log();
    e.preventDefault();
    onSubmit(pokemonInput);
  }

  return (
    <form onSubmit={handleSubmit} className="SearchForm">
      <label className="SearchForm__brand" htmlFor="search-input">
        <img src={brand} alt="pokemon-name"  />
      </label>

      <div className="SearchForm__input-submit">
        <input
          onChange={handleChange}
          data-testid="input"
          id="search-input"
          className="SearchForm__input-submit__input"
          placeholder="pokemon name..."
        />

        <button className="SearchForm__input-submit__submit">Search</button>
      </div>
    </form>
  );
};

export default SearchForm;
