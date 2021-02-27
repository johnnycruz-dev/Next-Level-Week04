import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallangesContext';

import styles from '../styles/components/CompletedChallanges.module.css';

export function CompletedChallanges() {
  const { challangesCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallangesContainer}>
      <span>Desafios completos</span>
      <span>{challangesCompleted}</span>
    </div>
  )
}