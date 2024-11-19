import React from 'react';
import defaultImage from '../assets/images/Not_Found.png';
import '../styles/PokemonImage.css';


const PokemonImage = ({ url, className, size = 'medium' }) => {
  const imageStyles = {
    width: size === 'large' ? '250px' : '100px',
    height: size === 'large' ? '250px' : '100px',
    objectFit: 'cover',
  };

  return (
    <img
      src={url || defaultImage}
      alt=""
      className={className}
      style={imageStyles}
    />
  );
};

export default PokemonImage;