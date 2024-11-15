import React from 'react';
import '../Css/Loading.css'; 
import loadingImage from '../Images/pokeLoading3.png';

function Loading() {
  return (
    <div className="loader-container">
      <img src={loadingImage} alt="" className='pokemon-image-large'/>
      <div className="loading-text">LOADING<span className="dots">...</span></div>
    </div>
  );
}

export default Loading;