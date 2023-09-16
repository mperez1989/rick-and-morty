import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import PropTypes from 'prop-types';

const ResidentCard = ({ url}) => {

    const [resident, getResident] = useFetch(url)

    useEffect(() => {
        getResident()
    }, [])

  return (
        <>
        <article className="resident">
            <header className="resident__header">
                <img className="resident__image" src={resident?.image} alt="" />
                <div className="resident__status">
                    <span className={`resident__status__circle ${resident?.status}`}></span>
                    <span className="resident__status__value">{resident?.status}</span>
                </div>
            </header>
            <section className="resident__body">
                <h3 className="resident__name">{resident?.name}</h3>
                <ul className="resident__list">
                    <li className="resident__item"><span className="resident__label">Specie </span><br /><span className="resident__value">{resident?.species}</span></li>
                    <li className="resident__item"><span className="resident__label">Origin </span><br /><span className="resident__value">{resident?.origin.name}</span></li>
                    <li className="resident__item"><span className="resident__label">Eppisodes where appear </span><br /><span className="resident__value">{resident?.episode.length}</span></li>
                </ul>
            </section>
     </article>
     </>
  )
}

ResidentCard.propTypes = {url: PropTypes.string}

export default ResidentCard