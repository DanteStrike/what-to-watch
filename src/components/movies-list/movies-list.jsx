import React from "react";
import PropTypes from "prop-types";

import configs from "../../configs.js";

import MovieCard from "../movie-card/movie-card.jsx";

import withTimer from "../../hocs/with-timer/with-timer.jsx";


const WrappedMovieCard = withTimer(configs.movieListConfig.showTrailerTimeout)(MovieCard);

const MoviesList = (props) => {
  const {filmsCards} = props;

  return (
    <div className="catalog__movies-list">
      {filmsCards.map((filmCard) => (
        <WrappedMovieCard
          key={`${filmCard.id}_${filmCard.name}`}
          id={filmCard.id}
          name={filmCard.name}
          poster={filmCard.preview.image}
          previewSrc={filmCard.preview.videoSrc}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  filmsCards: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.exact({
      image: PropTypes.string.isRequired,
      videoSrc: PropTypes.string.isRequired
    }).isRequired
  }))
};

export default MoviesList;
