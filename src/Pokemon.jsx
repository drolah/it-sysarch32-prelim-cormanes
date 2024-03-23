import React from 'react';

function Pokemon({ id, name,image }) {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <div className="pokemon-details">
        <h3>[{id}] {name}</h3>
      </div>
    </div>
  );
}

export default Pokemon;