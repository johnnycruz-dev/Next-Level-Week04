import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallangesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/johnnycruz-dev.png" alt="Johnny Cruz" />
      <div>
        <strong>Johnny Cruz</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}