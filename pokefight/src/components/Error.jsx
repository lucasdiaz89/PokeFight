import React from 'react';
import '../styles/Error.css'; 
import errorImage from '../assets/images/pokeError.png';

function Error() {
  return (
    <div className="error-container">
      <img src={errorImage} alt="" className='pokemon-image-large'/>
      <div className="error-text">Something went wrong, please try again later</div>
    </div>
  );
}

export default Error;