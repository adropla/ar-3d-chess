import { useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

const PlayRandomMoveEngine = () => {
  const [game, setGame] = useState(new Chess())

  const safeGameMutate = (modify) => {
    setGame((g) => {
      const update = { ...g }
      modify(update)
      return update
    })
  }

  const makeRandomMove = () => {
    const possibleMoves = game.moves()
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    safeGameMutate((gameInst) => {
      gameInst.move(possibleMoves[randomIndex])
    })
  }

  const onDrop = (sourceSquare, targetSquare) => {
    let move = null
    safeGameMutate((gameInst) => {
      move = gameInst.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to a queen for example simplicity
      })
    })
    if (move === null) return false // illegal move
    setTimeout(makeRandomMove, 200)
    return true
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />
}

export default PlayRandomMoveEngine
