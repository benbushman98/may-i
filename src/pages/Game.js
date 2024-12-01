import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import Start from "./Start";
import Introduction from "./Introduction";
import Score from "./Score";

const Game = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [game, setGame] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const game = localStorage.getItem("game");
    if (game === "true") {
      setGame(true);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const game = localStorage.getItem("game");
    if (game === "true") {
      setGame(true);
    }
  }, [isModalOpen]);

  return (
    <>
      {!game && (
        <div className="flex flex-col h-screen justify-center items-center overflow-hidden">
          <button
            className="p-3 w-1/2 text-white rounded-lg hover:bg-blue-800 bg-blue-900 uppercase font-bold"
            onClick={() => openModal(<Start closeModal={closeModal} />)}
          >
            Start
          </button>
          <button
            className="mt-2 p-3 w-1/2 text-white rounded-lg hover:bg-blue-800 bg-blue-900 uppercase font-bold"
            onClick={() => openModal(<Introduction />)}
          >
            Instructions
          </button>
        </div>
      )}
      {game && (
        <div className="mt-5 flex flex-wrap gap-3 p-2 justify-center">
          {(() => {
            try {
              const players = JSON.parse(localStorage.getItem("players")) || [];
              return players.map((player, index) => {
                const score = JSON.parse(localStorage.getItem(player)) || [];
                const totalScore = score.reduce((total, scoreItem) => {
                  if (typeof scoreItem === "object") {
                    return total + Object.values(scoreItem).reduce((sum, value) => sum + Number(value), 0);
                  }
                  return total + Number(scoreItem);
                }, 0);
                
                return (
                  <div
                    key={index}
                    onClick={() =>
                      openModal(
                        <Score
                          playerName={player}
                          scores={score}
                          closeModal={closeModal}
                        />
                      )
                    }
                  >
                    <div className="min-w-[calc(50%-12px)] items-center justify-center p-3 rounded-lg font-bold border-2 border-blue-900 text-center">
                      <div className="underline uppercase">{player}</div>
                      <ol>
                        {score.map((scoreItem, scoreIndex) =>
                          typeof scoreItem === "object" ? (
                            Object.entries(scoreItem).map(([key, value]) => (
                              <li key={`${scoreIndex}-${key}`}>
                                {key}: {value}
                              </li>
                            ))
                          ) : (
                            <li key={scoreIndex}>{scoreItem}</li>
                          )
                        )}
                      </ol>
                      <div className="border-t-2 text-blue-900">Total = {totalScore}</div>
                    </div>
                  </div>
                );
              });
            } catch {
              return <div>Error loading players or scores</div>;
            }
          })()}
        </div>
      )}

      <div className="p-2">
        {
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {modalContent}
          </Modal>
        }
      </div>
    </>
  );
};

export default Game;
