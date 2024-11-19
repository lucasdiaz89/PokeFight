import React from 'react';
import '../styles/Loading.css'; 
import loadingImage from '../assets/images/pokeLoading3.png';

function Loading() {
  return (
    <div className="loader-container">
      <img src={loadingImage} alt="" className='pokemon-image-large'/>
      <div className="loading-text">LOADING<span className="dots">...</span></div>
    </div>
  );
}

export default Loading;