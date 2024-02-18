import React, { useState } from "react";

const UpdatePokemon = ({ updatePokemon, selectedPokemon, onClose }) => {
	const [updatedName, setUpdatedName] = useState(selectedPokemon.name);

	const handleUpdate = (e) => {
		e.preventDefault();
		const updatedPokemon = {
			...selectedPokemon,
			name: updatedName,
		};

		updatePokemon(updatedPokemon);
		onClose();
	};

	return (
		<div>
			<h3>Update Pokemon</h3>
			<form onSubmit={handleUpdate}>
				<div className="form-group">
					<label htmlFor="updatedName">Name:</label>
					<input
						type="text"
						className="form-control"
						id="updatedName"
						value={updatedName}
						onChange={(e) => setUpdatedName(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Update
				</button>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={onClose}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default UpdatePokemon;
