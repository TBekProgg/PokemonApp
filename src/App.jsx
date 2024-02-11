/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Loader from "./Loader";
import { useState } from "react";
import Pokemons from "./Pokemons";
import { useEffect } from "react";
import { getResource } from "./helpers/fetch";
import { YELLOW_POKEMONS } from "./helpers/endpoints";
import "bootstrap/dist/css/bootstrap.css";
import { addToStorage, deleteFromStorage, idGenerator } from "./helpers/util";
import { POKEMONS_STORAGE_KEY } from "./helpers/constants";

const App = () => {
	const [pokemons, setPokemons] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const storagePokemons =
		JSON.parse(localStorage.getItem(POKEMONS_STORAGE_KEY)) ?? [];

	useEffect(() => {
		getResource(YELLOW_POKEMONS)
			.then((data) => {
				data.pokemon_species.forEach((element) => {
					element.id = idGenerator();
				});
				const allPokemons = [
					...storagePokemons,
					...data.pokemon_species,
				];
				setPokemons(allPokemons);
			})
			.catch((ex) => alert("Something went wrong!"))
			.finally(() => setIsLoaded(true));
	}, []);

	const deletePokemon = (pokemon) => {
		try {
			deleteFromStorage(POKEMONS_STORAGE_KEY, pokemon);
			setPokemons(pokemons.filter((value) => value.id !== pokemon.id));
		} catch (error) {
			alert("Error");
		}
	};

	const addPokemon = (pokemon) => {
		try {
			setPokemons([pokemon, ...pokemons]);
			addToStorage(POKEMONS_STORAGE_KEY, pokemon);
		} catch (error) {
			alert("Error!");
		}
	};

	return (
		<div>
			{!isLoaded && <Loader />}
			{isLoaded && (
				<Pokemons
					pokemons={pokemons}
					deletePokemon={deletePokemon}
					addPokemon={addPokemon}
				/>
			)}
		</div>
	);
};

export default App;
