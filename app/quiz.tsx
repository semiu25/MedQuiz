import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import Colors from '@/constants/colors';
import { useLanguage } from '@/lib/language-context';
import {
  getQuestions,
  getDifficultyInfo,
  getSubjectInfo,
  Subject,
  Difficulty,
  Question,
} from '@/lib/questions';
import { getSubjectName, getDifficultyName } from '@/lib/translations';

const { width } = Dimensions.get('window');

function OptionButton({ option, index, isSelected, isCorrect, isRevealed, onPress, disabled }: {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onPress: () => void;
  disabled: boolean;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getBackgroundColor = () => {
    if (!isRevealed) {
      return isSelected ? Colors.primary + '30' : Colors.card;
    }
    if (isCorrect) return Colors.success + '20';
    if (isSelected && !isCorrect) return Colors.error + '20';
    return Colors.card;
  };

  const getBorderColor = () => {
    if (!isRevealed) {
      return isSelected ? Colors.primary : Colors.border;
    }
    if (isCorrect) return Colors.success;
    if (isSelected && !isCorrect) return Colors.error;
    return Colors.border;
  };

  const getTextColor = () => {
    if (!isRevealed) return Colors.text;
    if (isCorrect) return Colors.success;
    if (isSelected && !isCorrect) return Colors.error;
    return Colors.textMuted;
  };

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <Animated.View entering={FadeInDown.delay(index * 100 + 200).springify()}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={() => { if (!disabled) scale.value = withSpring(0.97); }}
        onPressOut={() => { scale.value = withSpring(1); }}
      >
        <Animated.View
          style={[
            styles.optionButton,
            animatedStyle,
            {
              backgroundColor: getBackgroundColor(),
              borderColor: getBorderColor(),
            },
          ]}
        >
          <View style={[styles.optionLabel, {
            backgroundColor: isRevealed && isCorrect ? Colors.success + '30' :
              isRevealed && isSelected && !isCorrect ? Colors.error + '30' :
                Colors.cardLight,
          }]}>
            <Text style={[styles.optionLabelText, { color: getTextColor() }]}>
              {labels[index]}
            </Text>
          </View>
          <Text style={[styles.optionText, { color: getTextColor() }]} numberOfLines={3}>
            {option}
          </Text>
          {isRevealed && isCorrect && (
            <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
          )}
          {isRevealed && isSelected && !isCorrect && (
            <Ionicons name="close-circle" size={22} color={Colors.error} />
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const { language, tr } = useLanguage();
  const params = useLocalSearchParams<{ subject: string; difficulty: string; playerName: string }>();
  const subject = params.subject as Subject;
  const difficulty = params.difficulty as Difficulty;
  const playerName = params.playerName || '';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionKey, setQuestionKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressWidth = useSharedValue(1);

  const diffInfo = getDifficultyInfo(difficulty);
  const subjectInfo = getSubjectInfo(subject);

  const timerProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%` as any,
  }));

  useEffect(() => {
    getQuestions(subject, difficulty, 10, language).then(q => {
      setQuestions(q);
      setTimeLeft(diffInfo.timePerQuestion);
      progressWidth.value = 1;
    });
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;

    if (timerRef.current) clearInterval(timerRef.current);

    if (isRevealed) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isRevealed, questions.length]);

  useEffect(() => {
    if (questions.length > 0 && !isRevealed) {
      progressWidth.value = withTiming(0, { duration: timeLeft * 1000 });
    }
  }, [currentIndex, questions.length]);

  const handleTimeUp = useCallback(() => {
    setIsRevealed(true);
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, []);

  const handleOptionPress = (index: number) => {
    if (isRevealed || selectedOption !== null) return;

    setSelectedOption(index);
    setIsRevealed(true);

    if (timerRef.current) clearInterval(timerRef.current);
    progressWidth.value = withTiming(progressWidth.value, { duration: 0 });

    const currentQuestion = questions[currentIndex];
    if (index === currentQuestion.correctIndex) {
      const timeBonus = Math.ceil(timeLeft * diffInfo.multiplier);
      const basePoints = 10 * diffInfo.multiplier;
      setScore(prev => prev + basePoints + timeBonus);
      setCorrectCount(prev => prev + 1);
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      router.replace({
        pathname: '/results',
        params: {
          score: score.toString(),
          correctCount: correctCount.toString(),
          totalQuestions: questions.length.toString(),
          subject,
          difficulty,
          playerName,
        },
      });
      return;
    }

    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsRevealed(false);
    setTimeLeft(diffInfo.timePerQuestion);
    setQuestionKey(prev => prev + 1);
    progressWidth.value = 1;
  };

  const handleQuit = () => {
    router.back();
  };

  if (questions.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <LinearGradient colors={[Colors.background, '#0B1120']} style={StyleSheet.absoluteFill} />
        <Text style={styles.loadingText}>{tr.loadingQuestions}</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex + 1) / questions.length;

  const timerColor = timeLeft <= 5 ? Colors.error : timeLeft <= 10 ? Colors.warning : Colors.primary;
  const webTopInset = Platform.OS === 'web' ? 67 : 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background, '#0B1120', Colors.background]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + webTopInset + 8 }]}>
        <Pressable style={styles.quitButton} onPress={handleQuit}>
          <Ionicons name="close" size={24} color={Colors.textSecondary} />
        </Pressable>

        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>

        <View style={[styles.timerBadge, { borderColor: timerColor + '50' }]}>
          <Ionicons name="time-outline" size={16} color={timerColor} />
          <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.timerBar}>
        <Animated.View style={[styles.timerFill, timerProgressStyle, { backgroundColor: timerColor }]} />
      </View>

      <View style={styles.content}>
        <Animated.View key={questionKey} entering={FadeIn.duration(300)} style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <View style={[styles.subjectBadge, { backgroundColor: (Colors.subject as any)[subject] + '20' }]}>
              <Text style={[styles.subjectBadgeText, { color: (Colors.subject as any)[subject] }]}>
                {getSubjectName(language, subject)}
              </Text>
            </View>
            <View style={[styles.diffBadge, { backgroundColor: diffInfo.color + '20' }]}>
              <Text style={[styles.diffBadgeText, { color: diffInfo.color }]}>
                {getDifficultyName(language, difficulty)}
              </Text>
            </View>
          </View>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={`${questionKey}-${index}`}
              option={option}
              index={index}
              isSelected={selectedOption === index}
              isCorrect={index === currentQuestion.correctIndex}
              isRevealed={isRevealed}
              onPress={() => handleOptionPress(index)}
              disabled={isRevealed}
            />
          ))}
        </View>

        {isRevealed && (
          <Animated.View entering={FadeInDown.springify()} style={styles.resultFeedback}>
            <View style={[
              styles.feedbackBanner,
              {
                backgroundColor: selectedOption === currentQuestion.correctIndex
                  ? Colors.success + '15'
                  : Colors.error + '15',
                borderColor: selectedOption === currentQuestion.correctIndex
                  ? Colors.success + '40'
                  : Colors.error + '40',
              },
            ]}>
              <Ionicons
                name={selectedOption === currentQuestion.correctIndex ? 'checkmark-circle' : selectedOption === null ? 'time-outline' : 'close-circle'}
                size={20}
                color={selectedOption === currentQuestion.correctIndex ? Colors.success : Colors.error}
              />
              <Text style={[styles.feedbackText, {
                color: selectedOption === currentQuestion.correctIndex ? Colors.success : Colors.error,
              }]}>
                {selectedOption === currentQuestion.correctIndex
                  ? tr.correct
                  : selectedOption === null
                    ? tr.timesUp
                    : `${tr.answerPrefix} ${currentQuestion.options[currentQuestion.correctIndex]}`}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.nextButton,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
              ]}
              onPress={handleNext}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                style={styles.nextButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.nextButtonText}>
                  {currentIndex >= questions.length - 1 ? tr.seeResults : tr.nextQuestion}
                </Text>
                <Ionicons
                  name={currentIndex >= questions.length - 1 ? 'trophy' : 'arrow-forward'}
                  size={20}
                  color={Colors.white}
                />
              </LinearGradient>
            </Pressable>
          </Animated.View>
        )}
      </View>

      <View style={styles.scoreBar}>
        <Ionicons name="star" size={16} color={Colors.accent} />
        <Text style={styles.scoreText}>{score} {tr.pts}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Outfit_500Medium',
    color: Colors.textSecondary,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  quitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 15,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.text,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
  },
  timerText: {
    fontSize: 15,
    fontFamily: 'Outfit_700Bold',
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  timerBar: {
    height: 2,
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 1,
  },
  timerFill: {
    height: '100%',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'web' ? 100 : 40,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionHeader: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  subjectBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectBadgeText: {
    fontSize: 12,
    fontFamily: 'Outfit_600SemiBold',
  },
  diffBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  diffBadgeText: {
    fontSize: 12,
    fontFamily: 'Outfit_600SemiBold',
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.text,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 12,
  },
  optionLabel: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabelText: {
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Outfit_500Medium',
    lineHeight: 21,
  },
  resultFeedback: {
    marginTop: 20,
    gap: 12,
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  feedbackText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
  },
  nextButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: Colors.white,
  },
  scoreBar: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  scoreText: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: Colors.accent,
  },
});
