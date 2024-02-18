import React, { useState } from "react";
import NewPokemon from "./NewPokemon";
import UpdatePokemon from "./UpdatePokemon";

const Pokemons = ({ pokemons, deletePokemon, addPokemon, updatePokemon }) => {
	const [isNewPokemonShown, setIsNewPokemonShown] = useState(false);
	const [isUpdateFormShown, setIsUpdateFormShown] = useState(false);
	const [selectedPokemonForUpdate, setSelectedPokemonForUpdate] =
		useState(null);

	const handleDeletePokemon = (e, pokemon) => {
		e.preventDefault();
		deletePokemon(pokemon);
	};

	const handleUpdatePokemon = (e, pokemon) => {
		e.preventDefault();
		setIsUpdateFormShown(true);
		setSelectedPokemonForUpdate(pokemon);
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

			{isUpdateFormShown && (
				<UpdatePokemon
					selectedPokemon={selectedPokemonForUpdate}
					updatePokemon={updatePokemon}
					onClose={() => {
						setIsUpdateFormShown(false);
						setSelectedPokemonForUpdate(null);
					}}
				/>
			)}

			<hr />

			<ul className="list-group">
				{pokemons.map((pokemon) => (
					<li
						key={pokemon.name}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						{pokemon.name.toUpperCase()}

						<div className="d-flex align-items-center">
							<button
								type="button"
								className="btn btn-primary mr-3 d-flex align-items-center"
								style={{ marginRight: "50px", height: "30px" }}
								onClick={(e) => {
									handleUpdatePokemon(e, pokemon);
								}}
							>
								Update Pokemon
							</button>

							<button
								className="btn btn-sm btn-danger"
								style={{ height: "30px" }}
								onClick={(e) => {
									handleDeletePokemon(e, pokemon);
								}}
							>
								X
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pokemons;
