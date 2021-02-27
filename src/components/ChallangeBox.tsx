import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallangesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallangeBox.module.css';

export function ChallangeBox() {
  const { activeChallenge, resetChallange, completeChallange } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallange();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallange();
    resetCountdown();
  }

  return (
    <div className={styles.challangeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challangeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challangeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challangeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challangeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
              Avance de level completando desafios.
            </p>
          </div>
        )}
    </div>
  )
}