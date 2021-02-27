import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallangesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

interface Challange {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challange;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallange: () => void;
  completeChallange: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children, ...rest }: ChallangesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challangesCompleted, setChallangesCompleted] = useState(rest.challangesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challangesCompleted', String(challangesCompleted));
  }, [level, currentExperience, challangesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor((Math.random() * challenges.length));
    const challange = challenges[randomChallengeIndex];

    setActiveChallenge(challange);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉️', {
        body: `Valendo ${challange.amount}xp!`
      })
    }
  }

  function resetChallange() {
    setActiveChallenge(null);
  }

  function completeChallange() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallangesCompleted(challangesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challangesCompleted,
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallange,
      experienceToNextLevel,
      completeChallange,
      closeLevelUpModal
    }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}