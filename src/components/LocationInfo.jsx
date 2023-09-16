import PropTypes from 'prop-types';

const LocationInfo = ({ location }) => {
  return (
    <>
    <article className="card__location">
        <div className="card__conteiner">
        <h2 className='card__name'>{location?.name}</h2>
        <ul className="list__location">
            <li><span className="title">type: </span><span className="data">{location?.type}</span></li>
            <li><span className="title">Dimension: </span><span className="data">{location?.dimension || "unknown"}</span></li>
            <li><span className="title">Population: </span><span className="data">{location?.residents.length}</span></li>
        </ul>
        </div>
    </article>
    </>
  )
}

LocationInfo.propTypes = {location: PropTypes.object}

export default LocationInfo