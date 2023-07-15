import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { flipCard } from "../../Features/boardSlice";

const Card = ({ ind }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.board.cards[ind]);

  const handleFlipCard = () => {
    if (!card.flipped && !card.matched) {
      dispatch(flipCard({ index: ind }));
    }
  };

  return (
    <div
      className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
      onClick={handleFlipCard}
    >
      <div className="inner">
        <div className="front">
          {(card.flipped || card.matched) && <img src={card.img} alt="card" />}
        </div>
      </div>
    </div>
  );
};

export default Card;
