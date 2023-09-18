import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import getRandomNumber from './utils/getRandomNumber';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';
import Loader from './components/Loader';

function App() {

  const [inputValue, setInputValue] = useState(getRandomNumber(126));

  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'hola'}`;

  const [location, getSingleLocation, hasError, isLoading] = useFetch(url);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


  useEffect(() => {
    getSingleLocation();
  }, [inputValue]);

  const inputSearch = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim());
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      Math.min(prevIndex + 1, location.residents.length - 1)
    );

  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);

  };

  const renderImages = () => {
    const imagesToRender = [];
    for (let i = selectedImageIndex; i < selectedImageIndex + 2; i++) {
      if (location.residents[i]) {
        imagesToRender.push(
          <div key={i} className={`resident__image`}>
            <ResidentCard url={location.residents[i]} />
          </div>
        );
      }
    }
    return imagesToRender;
  };

  return (
    <div className='main__conteiner'>
      <div className='image__conteiner'>
        <img src="/mainImagen.png" alt="" />
        <h1 className='text__principal'>Rick and Morty App</h1>
      </div>

      <form className='main__form' action="" onSubmit={handleSearch}>
        <input
          className='main__input'
          type="text"
          ref={inputSearch}
          placeholder='location between 1 and 126'
        />
        <button className='main__btn'>Search</button>
      </form>

      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <h2 className='hasError'>❌Hey! you must provide an id from 1 to 126 😭</h2>
      ) : (
        <>
          <LocationInfo location={location} />

        {!isLoading && !hasError && location?.residents.length > 0 && (
          <div className='centered__container'>
            <div className='resident__navigation'>
              <button onClick={prevImage} disabled={selectedImageIndex === 0}>
                &lt;
              </button>
              {location.residents
                .slice(selectedImageIndex, selectedImageIndex + 3)
                .map((_, index) => (
                  <button
                    key={index}
                    className={`${index === 1 ? 'selected' : ''}`}
                    onClick={() => selectImage(selectedImageIndex + index)}
                  >
                    {selectedImageIndex + index + 1}
                  </button>
                ))}
              <button
                onClick={nextImage}
                disabled={selectedImageIndex === location.residents.length - 1}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
            <div className='resident__conteiner'>
              {renderImages()}
            </div>
        </>
      )}
    </div>
  );
}

export default App;