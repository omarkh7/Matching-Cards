import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "../Loader/Loader";
import { BiReset } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import {
  resetGameWithTimeout,
  checkMatchingCardsWithTimeout,
} from "../../Features/boardSlice";
import "../Matching/Matching.css";

const Board = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.board.cards);
  const [isLoading, setIsLoading] = useState(true);
  const [resetLoaderVisible, setResetLoaderVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(resetGameWithTimeout());
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  useEffect(() => {
    const flippedCards = cards.filter((c) => c.flipped);
    if (flippedCards.length === 2) {
      dispatch(checkMatchingCardsWithTimeout());
    } else {
      const matchedCards = cards.filter((c) => c.matched);
      if (cards.length && matchedCards.length === cards.length) {
        showCompletionAlert();
      }
    }
  }, [cards]);

  useEffect(() => {
    const storedName = sessionStorage.getItem("username");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleResetGame = () => {
    setResetLoaderVisible(true);
    dispatch(resetGameWithTimeout());
    setTimeout(() => {
      setResetLoaderVisible(false);
    }, 2000);
  };

  const handleCancelGame = () => {};

  const showCompletionAlert = () => {
    confirmAlert({
      title: "Congratulations!",
      message: "All cards are matched. Do you want to reset or cancel?",
      buttons: [
        {
          label: "Reset",
          onClick: () => {
            setResetLoaderVisible(true);
            dispatch(resetGameWithTimeout());
            setTimeout(() => {
              setResetLoaderVisible(false);
            }, 2000);
          },
        },
        {
          label: "Cancel",
          onClick: () => handleCancelGame(),
        },
      ],
    });
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container-board">
      {isLoading || resetLoaderVisible ? (
        <Loader />
      ) : (
        <>
          <h1 className="board-title">Matching Cards</h1>
          <div className="board-container">
            <div className="board-container-flex">
              <span className="flex-start">
                <strong>Player: </strong>
                {name}
              </span>
              <div className="flex-end-group">
                <span title="Reset" className="tooltip">
                  <BiReset onClick={handleResetGame} />
                </span>
                <span title="Logout" className="tooltip">
                  <FiLogOut onClick={logout} />
                </span>
              </div>
            </div>
            <div className="board">
              {cards.map((card, ind) => (
                <Card ind={ind} key={ind} />
              ))}
            </div>
          </div>
          <br></br>
        </>
      )}
    </div>
  );
};

export default Board;
