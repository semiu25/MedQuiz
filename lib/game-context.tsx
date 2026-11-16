import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subject, Difficulty } from './questions';

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  subject: Subject;
  difficulty: Difficulty;
  percentage: number;
  date: string;
}

interface GameContextValue {
  playerName: string;
  setPlayerName: (name: string) => void;
  leaderboard: LeaderboardEntry[];
  addLeaderboardEntry: (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => void;
  isLoading: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

const PLAYER_NAME_KEY = '@medquiz_player_name';
const LEADERBOARD_KEY = '@medquiz_leaderboard';

export function GameProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerNameState] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [name, board] = await Promise.all([
        AsyncStorage.getItem(PLAYER_NAME_KEY),
        AsyncStorage.getItem(LEADERBOARD_KEY),
      ]);
      if (name) setPlayerNameState(name);
      if (board) setLeaderboard(JSON.parse(board));
    } catch (e) {
      console.error('Failed to load data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const setPlayerName = async (name: string) => {
    setPlayerNameState(name);
    await AsyncStorage.setItem(PLAYER_NAME_KEY, name);
  };

  const addLeaderboardEntry = async (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => {
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    const updated = [newEntry, ...leaderboard].sort((a, b) => b.score - a.score).slice(0, 100);
    setLeaderboard(updated);
    await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  };

  const value = useMemo(() => ({
    playerName,
    setPlayerName,
    leaderboard,
    addLeaderboardEntry,
    isLoading,
  }), [playerName, leaderboard, isLoading]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
