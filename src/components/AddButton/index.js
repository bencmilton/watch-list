import React from 'react';

import './style.css';

function AddButton({ onClick }) {
	return (
		<button onClick={onClick} className="add-title-button">+</button>
	)
}

export default AddButton;
