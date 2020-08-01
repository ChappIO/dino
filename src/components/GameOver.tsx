import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

export interface Props {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<Props> = ({ score, onRestart }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    html2canvas(document.querySelector('.wrapper') as HTMLElement).then(setCanvas);
  }, []);

  useEffect(() => {
    canvas?.toBlob((b) => setBlob(b as Blob), 'image/jpeg');
  }, [canvas]);

  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p className="score">SCORE: {score}</p>
      <div className="buttons">
        <button className="restart button" onClick={onRestart}>
          Try Again
        </button>
        <button
          disabled={!canvas}
          className="share button"
          onClick={(e): void => {
            if (!canvas || !blob) {
              return;
            }

            const file = new File([blob], 'dino-score.jpg', { type: 'image/jpeg' });
            const toShare = {
              title: `I got ${score}!`,
              url: window.location.toString(),
              files: [file],
              image: file,
            };

            // eslint-disable-next-line
                        // @ts-ignore
            if ('canShare' in navigator && navigator.canShare(toShare)) {
              // eslint-disable-next-line
                            // @ts-ignore
              navigator.share(toShare);
            } else {
              const link = document.createElement('a');
              document.body.append(link);
              link.style.display = 'none';
              link.download = 'dino-score.jpg';
              link.href = canvas.toDataURL('image/jpeg');
              link.click();
              document.body.removeChild(link);
            }
          }}
        >
          Share Score
        </button>
      </div>
    </div>
  );
};
