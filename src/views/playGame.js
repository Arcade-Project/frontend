import React from 'react';
import GamePhaser from '../Game/src/GamePhaser';
import {useDispatch } from 'react-redux';

export default function PlayGame() {
  const dispatch = useDispatch();
  dispatch({ type: 'PLAYING', payload: true });
  return <GamePhaser />;
}
