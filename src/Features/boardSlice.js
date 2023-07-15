import { createSlice } from "@reduxjs/toolkit";

const cardOptions = [
  { value: "A", img: "/imgs/cpanel.png", flipped: true, matched: false },
  { value: "A", img: "/imgs/cpanel.png", flipped: true, matched: false },
  { value: "B", img: "/imgs/docker.png", flipped: true, matched: false },
  { value: "B", img: "/imgs/docker.png", flipped: true, matched: false },
  { value: "C", img: "/imgs/firebase.png", flipped: true, matched: false },
  { value: "C", img: "/imgs/firebase.png", flipped: true, matched: false },
  { value: "D", img: "/imgs/github.png", flipped: true, matched: false },
  { value: "D", img: "/imgs/github.png", flipped: true, matched: false },
  { value: "E", img: "/imgs/nodejs.png", flipped: true, matched: false },
  { value: "E", img: "/imgs/nodejs.png", flipped: true, matched: false },
  { value: "F", img: "/imgs/reactjs.png", flipped: true, matched: false },
  { value: "F", img: "/imgs/reactjs.png", flipped: true, matched: false },
  { value: "G", img: "/imgs/shopify.png", flipped: true, matched: false },
  { value: "G", img: "/imgs/shopify.png", flipped: true, matched: false },
  { value: "H", img: "/imgs/woo.png", flipped: true, matched: false },
  { value: "H", img: "/imgs/woo.png", flipped: true, matched: false },
];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const boardSlice = createSlice({
  name: "board",
  initialState: {
    cards: [],
    isLoading: false,
    resetGame: false,
  },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setResetGame: (state, action) => {
      state.resetGame = action.payload;
    },
    resetGame: (state) => {
      state.isLoading = true;
      state.resetGame = true;
      state.cards = shuffle(cardOptions).map((card, index) => ({
        ...card,
        id: index,
        flipped: true,
        matched: false,
      }));
    },
    flipCard: (state, action) => {
      const { index } = action.payload;
      const flippedCards = state.cards.filter((c) => c.flipped);
      if (flippedCards.length < 2) {
        state.cards[index].flipped = !state.cards[index].flipped;
      }
    },
    checkMatchingCards: (state) => {
      const flippedCards = state.cards.filter((c) => c.flipped);
      const matchedCards = flippedCards[0].value === flippedCards[1].value;
      if (matchedCards) {
        flippedCards.forEach((flippedCard) => {
          state.cards[flippedCard.id].matched = true;
          state.cards[flippedCard.id].flipped = false;
        });
      }
    },
  },
});

export const {
  setCards,
  setIsLoading,
  setResetGame,
  resetGame,
  flipCard,
  checkMatchingCards,
} = boardSlice.actions;

export const resetGameWithTimeout = () => (dispatch) => {
  dispatch(resetGame());
  setTimeout(() => {
    const updatedCards = cardOptions.map((card, index) => ({
      ...card,
      id: index,
      flipped: false,
      matched: false,
    }));
    dispatch(setCards(updatedCards));
    dispatch(setResetGame(false));
  }, 6000);
};

export const checkMatchingCardsWithTimeout = () => (dispatch, getState) => {
  const state = getState().board;
  const flippedCards = state.cards.filter((c) => c.flipped);
  const matchedCards =
    flippedCards.length === 2 &&
    flippedCards[0].value === flippedCards[1].value;
  if (matchedCards) {
    const updatedCards = state.cards.map((card) => {
      if (flippedCards.some((flippedCard) => flippedCard.id === card.id)) {
        return {
          ...card,
          matched: true,
          flipped: false,
        };
      }
      return card;
    });
    dispatch(setCards(updatedCards));
  } else {
    setTimeout(() => {
      const updatedCards = state.cards.map((card) => {
        if (flippedCards.some((flippedCard) => flippedCard.id === card.id)) {
          return {
            ...card,
            flipped: false,
          };
        }
        return card;
      });
      dispatch(setCards(updatedCards));
    }, 2000);
  }
};

export default boardSlice.reducer;
