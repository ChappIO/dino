import React, { useEffect, useRef, useState } from 'react';
import { Game } from './Game';

const viewWidth = 640;
const viewHeight = 200;

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  // start the game
  useEffect(() => {
    if (!canvas) {
      return;
    }
    const game = new Game(canvas);
    game.start();
    return (): void => game.destroy();
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
    <div className="wrapper" style={{ transform: `scale(${zoom})` }}>
      <canvas ref={canvasRef} id="game" width={viewWidth} height={viewHeight} />
    </div>
  );
};
