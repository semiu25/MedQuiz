import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Colors from '@/constants/colors';
import { useGame, LeaderboardEntry } from '@/lib/game-context';
import { useLanguage } from '@/lib/language-context';
import { getSubjectInfo, getDifficultyInfo, Subject } from '@/lib/questions';
import { getSubjectName, getDifficultyName } from '@/lib/translations';

function LeaderboardItem({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  const { language, tr } = useLanguage();
  const subjectInfo = getSubjectInfo(entry.subject);
  const diffInfo = getDifficultyInfo(entry.difficulty);
  const subjectColors = Colors.subject as Record<string, string>;
  const subjectColor = subjectColors[entry.subject] || Colors.primary;

  const getMedalColor = (r: number) => {
    if (r === 1) return '#FFD700';
    if (r === 2) return '#C0C0C0';
    if (r === 3) return '#CD7F32';
    return Colors.textMuted;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return tr.justNow;
    if (diffMins < 60) return `${diffMins}${tr.minutesAgo}`;
    if (diffHours < 24) return `${diffHours}${tr.hoursAgo}`;
    if (diffDays < 7) return `${diffDays}${tr.daysAgo}`;
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.entryCard}>
      <View style={[styles.rankBadge, rank <= 3 && { backgroundColor: getMedalColor(rank) + '20' }]}>
        {rank <= 3 ? (
          <Ionicons name="trophy" size={16} color={getMedalColor(rank)} />
        ) : (
          <Text style={styles.rankText}>#{rank}</Text>
        )}
      </View>
      <View style={styles.entryInfo}>
        <Text style={styles.entryName} numberOfLines={1}>{entry.playerName}</Text>
        <View style={styles.entryMeta}>
          <View style={[styles.subjectTag, { backgroundColor: subjectColor + '20' }]}>
            <Text style={[styles.subjectTagText, { color: subjectColor }]}>
              {getSubjectName(language, entry.subject)}
            </Text>
          </View>
          <View style={[styles.diffTag, { backgroundColor: diffInfo.color + '20' }]}>
            <Text style={[styles.diffTagText, { color: diffInfo.color }]}>
              {getDifficultyName(language, entry.difficulty)}
            </Text>
          </View>
        </View>
        <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
      </View>
      <View style={styles.entryScore}>
        <Text style={styles.scoreValue}>{entry.score}</Text>
        <Text style={styles.scoreLabel}>{tr.pts}</Text>
        <Text style={styles.percentText}>{entry.percentage}%</Text>
      </View>
    </View>
  );
}

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { leaderboard } = useGame();
  const { language, tr } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: tr.all },
    { id: 'anatomy', label: getSubjectName(language, 'anatomy') },
    { id: 'physiology', label: getSubjectName(language, 'physiology') },
    { id: 'pharmacology', label: tr.pharma },
    { id: 'biochemistry', label: tr.biochem },
    { id: 'pathology', label: getSubjectName(language, 'pathology') },
    { id: 'microbiology', label: tr.micro },
  ];

  const filteredBoard = filter === 'all'
    ? leaderboard
    : leaderboard.filter(e => e.subject === filter);

  const webTopInset = Platform.OS === 'web' ? 67 : 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background, '#0B1120', Colors.background]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.headerContainer, { paddingTop: insets.top + webTopInset + 16 }]}>
        <Animated.View entering={FadeInUp.springify()}>
          <Text style={styles.title}>{tr.leaderboard}</Text>
        </Animated.View>

        <FlatList
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.filterRow}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.filterChip,
                filter === item.id && styles.filterChipActive,
              ]}
              onPress={() => setFilter(item.id)}
            >
              <Text style={[
                styles.filterChipText,
                filter === item.id && styles.filterChipTextActive,
              ]}>
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {filteredBoard.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="trophy-outline" size={64} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>{tr.noScoresYet}</Text>
          <Text style={styles.emptySubtitle}>{tr.playQuizToSee}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBoard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 100 },
          ]}
          scrollEnabled={filteredBoard.length > 0}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
              <LeaderboardItem entry={item} rank={index + 1} />
            </Animated.View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit_700Bold',
    color: Colors.text,
    marginBottom: 16,
  },
  filterRow: {
    gap: 8,
    paddingRight: 20,
    paddingBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary + '25',
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontFamily: 'Outfit_500Medium',
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.primary,
    fontFamily: 'Outfit_600SemiBold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 13,
    fontFamily: 'Outfit_700Bold',
    color: Colors.textMuted,
  },
  entryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  entryName: {
    fontSize: 15,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  entryMeta: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 2,
  },
  subjectTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  subjectTagText: {
    fontSize: 11,
    fontFamily: 'Outfit_500Medium',
  },
  diffTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  diffTagText: {
    fontSize: 11,
    fontFamily: 'Outfit_500Medium',
  },
  entryDate: {
    fontSize: 11,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textMuted,
    marginTop: 2,
  },
  entryScore: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  scoreValue: {
    fontSize: 22,
    fontFamily: 'Outfit_700Bold',
    color: Colors.primary,
  },
  scoreLabel: {
    fontSize: 11,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textMuted,
    marginTop: -2,
  },
  percentText: {
    fontSize: 12,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
});
