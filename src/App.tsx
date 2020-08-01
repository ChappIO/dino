import React, { useEffect, useRef, useState } from 'react';
import { Game } from './Game';
import { GameOver } from './components/GameOver';

const viewWidth = 640;
const viewHeight = 200;

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const [finalScore, setFinalScore] = useState<number>();
  const [currentScore, setScore] = useState(0);
  const [game, setGame] = useState<Game>();

  // start the game
  useEffect(() => {
    if (!canvas) {
      return;
    }
    const game = new Game(canvas);
    setGame(game);
    game.start();
    game.onGameOver = (score): void => {
      setFinalScore(score);
    };
    const updateScore = window.setInterval(() => {
      setScore(game.gameTime);
    }, 89);
    return (): void => {
      game.destroy();
      clearInterval(updateScore);
    };
  }, [canvas]);

  // make sure the canvas is the correct size
  const [zoom, setZoom] = useState(0);
  useEffect(() => {
    function resize(): void {
      const { innerWidth, innerHeight } = window;
      const fillWidth = innerWidth / viewWidth;
      const fillHeight = innerHeight / viewHeight;
      setZoom(Math.min(fillWidth, fillHeight));
    }

    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    resize();
    return (): void => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
  }, []);

  return (
    <>
      <div className="wrapper" style={{ transform: `scale(${zoom})` }}>
        <canvas ref={canvasRef} id="game" width={viewWidth} height={viewHeight} />
        {finalScore === undefined && <span className="score-view">{currentScore}</span>}
        {finalScore !== undefined && canvas && (
          <GameOver
            score={finalScore}
            onRestart={(): void => {
              game?.destroy();
              game?.start();
              setScore(0);
            }}
          />
        )}
      </div>
    </>
  );
};
