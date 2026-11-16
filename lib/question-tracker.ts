import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@medquiz_seen_';

function key(subject: string, difficulty: string) {
  return `${PREFIX}${subject}_${difficulty}`;
}

export async function getSeenIds(subject: string, difficulty: string): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(key(subject, difficulty));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function markSeen(subject: string, difficulty: string, ids: string[]): Promise<void> {
  try {
    const existing = await getSeenIds(subject, difficulty);
    const merged = Array.from(new Set([...existing, ...ids]));
    await AsyncStorage.setItem(key(subject, difficulty), JSON.stringify(merged));
  } catch {}
}

export async function resetSeen(subject: string, difficulty: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key(subject, difficulty));
  } catch {}
}

export async function pickQuestions<T extends { id: string }>(
  pool: T[],
  count: number,
  subject: string,
  difficulty: string
): Promise<T[]> {
  let seenIds = await getSeenIds(subject, difficulty);

  let unseen = pool.filter(q => !seenIds.includes(q.id));

  if (unseen.length < count) {
    await resetSeen(subject, difficulty);
    seenIds = [];
    unseen = [...pool];
  }

  const shuffled = [...unseen].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  await markSeen(subject, difficulty, selected.map(q => q.id));
  return selected;
}
