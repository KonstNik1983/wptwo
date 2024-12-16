'use strict';

// Выборка елементов
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Начальные условия

let totalScore, currentScore, activPlayer, isPlaying;

const initGame = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activPlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  diceElement.classList.add('hidden');
};

initGame();

const switchActivPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activPlayer}`).textContent = currentScore;
  activPlayer = activPlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Бросаем кубик
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const diceNamber = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNamber}.png`;

    if (diceNamber !== 1) {
      currentScore += diceNamber;
      document.getElementById(`current--${activPlayer}`).textContent =
        currentScore;
    } else {
      // Переключить игрока
      switchActivPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScore[activPlayer] += currentScore;
    document.getElementById(`score--${activPlayer}`).textContent =
      totalScore[activPlayer];

    if (totalScore[activPlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
