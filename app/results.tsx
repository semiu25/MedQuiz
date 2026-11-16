import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Colors from '@/constants/colors';
import { useGame } from '@/lib/game-context';
import { useLanguage } from '@/lib/language-context';
import { getDifficultyInfo, getSubjectInfo, Subject, Difficulty } from '@/lib/questions';
import { getSubjectName, getDifficultyName } from '@/lib/translations';

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const { language, tr } = useLanguage();
  const params = useLocalSearchParams<{
    score: string;
    correctCount: string;
    totalQuestions: string;
    subject: string;
    difficulty: string;
    playerName: string;
  }>();

  const { addLeaderboardEntry } = useGame();
  const hasAdded = useRef(false);

  const score = parseInt(params.score || '0');
  const correctCount = parseInt(params.correctCount || '0');
  const totalQuestions = parseInt(params.totalQuestions || '0');
  const subject = params.subject as Subject;
  const difficulty = params.difficulty as Difficulty;
  const playerName = params.playerName || 'Player';

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const diffInfo = getDifficultyInfo(difficulty);
  const subjectInfo = getSubjectInfo(subject);

  const circleProgress = useSharedValue(0);
  const scoreAnim = useSharedValue(0);

  useEffect(() => {
    if (!hasAdded.current) {
      hasAdded.current = true;
      addLeaderboardEntry({
        playerName,
        score,
        totalQuestions,
        subject,
        difficulty,
        percentage,
      });
    }

    circleProgress.value = withDelay(400, withSpring(percentage / 100, { damping: 15 }));
    scoreAnim.value = withDelay(600, withTiming(1, { duration: 800 }));

    if (Platform.OS !== 'web') {
      if (percentage >= 80) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (percentage >= 50) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  }, []);

  const getGrade = () => {
    if (percentage >= 90) return { label: tr.outstanding, icon: 'star' as const, color: Colors.accent };
    if (percentage >= 70) return { label: tr.greatJob, icon: 'trophy' as const, color: Colors.success };
    if (percentage >= 50) return { label: tr.goodEffort, icon: 'thumbs-up' as const, color: Colors.primary };
    if (percentage >= 30) return { label: tr.keepTrying, icon: 'fitness' as const, color: Colors.warning };
    return { label: tr.studyMore, icon: 'book' as const, color: Colors.error };
  };

  const grade = getGrade();

  const handlePlayAgain = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace({
      pathname: '/quiz',
      params: { subject, difficulty, playerName },
    });
  };

  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  const handleViewLeaderboard = () => {
    router.replace('/(tabs)/leaderboard');
  };

  const webTopInset = Platform.OS === 'web' ? 67 : 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background, '#0B1120', Colors.background]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.content, { paddingTop: insets.top + webTopInset + 40 }]}>
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.gradeContainer}>
          <View style={[styles.gradeIcon, { backgroundColor: grade.color + '20' }]}>
            <Ionicons name={grade.icon} size={48} color={grade.color} />
          </View>
          <Text style={[styles.gradeLabel, { color: grade.color }]}>{grade.label}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.scoreCard}>
          <LinearGradient
            colors={[Colors.card, Colors.cardLight]}
            style={styles.scoreCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.scoreRow}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreNumber}>{score}</Text>
                <Text style={styles.scoreItemLabel}>{tr.totalScore}</Text>
              </View>
              <View style={styles.scoreDivider} />
              <View style={styles.scoreItem}>
                <Text style={styles.scoreNumber}>{correctCount}/{totalQuestions}</Text>
                <Text style={styles.scoreItemLabel}>{tr.correct}</Text>
              </View>
              <View style={styles.scoreDivider} />
              <View style={styles.scoreItem}>
                <Text style={[styles.scoreNumber, { color: grade.color }]}>{percentage}%</Text>
                <Text style={styles.scoreItemLabel}>{tr.accuracy}</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{tr.subject}</Text>
            <View style={[styles.detailTag, { backgroundColor: ((Colors.subject as any)[subject]) + '20' }]}>
              <Text style={[styles.detailTagText, { color: (Colors.subject as any)[subject] }]}>
                {getSubjectName(language, subject)}
              </Text>
            </View>
          </View>
          <View style={styles.detailSep} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{tr.difficulty}</Text>
            <View style={[styles.detailTag, { backgroundColor: diffInfo.color + '20' }]}>
              <Text style={[styles.detailTagText, { color: diffInfo.color }]}>
                {getDifficultyName(language, difficulty)} (x{diffInfo.multiplier})
              </Text>
            </View>
          </View>
          <View style={styles.detailSep} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{tr.player}</Text>
            <Text style={styles.detailValue}>{playerName}</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).springify()} style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
            ]}
            onPress={handlePlayAgain}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="refresh" size={20} color={Colors.white} />
              <Text style={styles.primaryButtonText}>{tr.playAgain}</Text>
            </LinearGradient>
          </Pressable>

          <View style={styles.secondaryRow}>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleViewLeaderboard}
            >
              <Ionicons name="trophy-outline" size={20} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>{tr.leaderboard}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleGoHome}
            >
              <Ionicons name="home-outline" size={20} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>{tr.home}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gradeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  gradeIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gradeLabel: {
    fontSize: 28,
    fontFamily: 'Outfit_700Bold',
  },
  scoreCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scoreCardGradient: {
    padding: 24,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreNumber: {
    fontSize: 28,
    fontFamily: 'Outfit_700Bold',
    color: Colors.text,
    marginBottom: 4,
  },
  scoreItemLabel: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textSecondary,
  },
  scoreDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailSep: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textSecondary,
  },
  detailTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  detailTagText: {
    fontSize: 13,
    fontFamily: 'Outfit_600SemiBold',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.text,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  primaryButtonText: {
    fontSize: 17,
    fontFamily: 'Outfit_700Bold',
    color: Colors.white,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.primary,
  },
});
