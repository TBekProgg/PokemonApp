import React, { useState } from "react";
import NewPokemon from "./NewPokemon";

const Pokemons = ({ pokemons, deletePokemon, addPokemon }) => {
	const [isNewPokemonShown, setIsNewPokemonShown] = useState(false);

	const handleDeletePokemon = (e, pokemon) => {
		e.preventDefault();
		deletePokemon(pokemon);
	};

	return (
		<div className="container my-5">
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => setIsNewPokemonShown(true)}
			>
				Add new pokemon
			</button>
			{isNewPokemonShown && <NewPokemon addPokemon={addPokemon} />}
			<hr />
			<ul className="list-group">
				{pokemons.map((pokemon) => (
					<li
						key={pokemon.name}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						{pokemon.name.toUpperCase()}
						<button
							className="btn btn-sm btn-danger"
							onClick={(e) => {
								handleDeletePokemon(e, pokemon);
							}}
						>
							X
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pokemons;
