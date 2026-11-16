import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Colors from '@/constants/colors';
import { useGame } from '@/lib/game-context';
import { useLanguage } from '@/lib/language-context';
import { subjects, difficulties, Subject, Difficulty, SubjectInfo } from '@/lib/questions';
import { getSubjectName, getSubjectDesc, getDifficultyName, languages, Language } from '@/lib/translations';

const { width } = Dimensions.get('window');

function SubjectCard({ subject, isSelected, onPress, index, lang }: {
  subject: SubjectInfo;
  isSelected: boolean;
  onPress: () => void;
  index: number;
  lang: Language;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const subjectColors = Colors.subject as Record<string, string>;
  const color = subjectColors[subject.id] || Colors.primary;

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const renderIcon = () => {
    if (subject.iconFamily === 'Ionicons') {
      return <Ionicons name={subject.icon as any} size={28} color={isSelected ? Colors.white : color} />;
    }
    return <MaterialCommunityIcons name={subject.icon as any} size={28} color={isSelected ? Colors.white : color} />;
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).springify()}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.subjectCard,
            animatedStyle,
            isSelected && { borderColor: color, borderWidth: 2 },
          ]}
        >
          {isSelected && (
            <LinearGradient
              colors={[color + '30', color + '10']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          )}
          <View style={[styles.subjectIconContainer, { backgroundColor: color + '20' }]}>
            {renderIcon()}
          </View>
          <View style={styles.subjectTextContainer}>
            <Text style={[styles.subjectName, isSelected && { color: color }]}>
              {getSubjectName(lang, subject.id)}
            </Text>
            <Text style={styles.subjectDescription}>
              {getSubjectDesc(lang, subject.id)}
            </Text>
          </View>
          {isSelected && (
            <View style={[styles.checkmark, { backgroundColor: color }]}>
              <Ionicons name="checkmark" size={14} color={Colors.white} />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

function DifficultyButton({ difficulty, isSelected, onPress, lang }: {
  difficulty: typeof difficulties[number];
  isSelected: boolean;
  onPress: () => void;
  lang: Language;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.92); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      <Animated.View
        style={[
          styles.difficultyButton,
          animatedStyle,
          isSelected && {
            backgroundColor: difficulty.color + '25',
            borderColor: difficulty.color,
            borderWidth: 1.5,
          },
        ]}
      >
        <Text style={[
          styles.difficultyText,
          isSelected && { color: difficulty.color, fontFamily: 'Outfit_600SemiBold' },
        ]}>
          {getDifficultyName(lang, difficulty.id)}
        </Text>
        <Text style={[styles.difficultyMultiplier, { color: difficulty.color }]}>
          x{difficulty.multiplier}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { playerName, setPlayerName } = useGame();
  const { language, setLanguage, tr } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [nameInput, setNameInput] = useState(playerName);
  const [showNameInput, setShowNameInput] = useState(!playerName);
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    if (playerName) {
      setNameInput(playerName);
      setShowNameInput(false);
    }
  }, [playerName]);

  const handleSubjectPress = (subject: Subject) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSubject(subject);
  };

  const handleDifficultyPress = (difficulty: Difficulty) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDifficulty(difficulty);
  };

  const handleStartQuiz = () => {
    if (!selectedSubject || !selectedDifficulty) return;
    const name = nameInput.trim();
    if (!name) return;
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPlayerName(name);
    router.push({
      pathname: '/quiz',
      params: { subject: selectedSubject, difficulty: selectedDifficulty, playerName: name },
    });
  };

  const handleSaveName = () => {
    const name = nameInput.trim();
    if (name) {
      setPlayerName(name);
      setShowNameInput(false);
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLangModal(false);
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const canStart = selectedSubject && selectedDifficulty && nameInput.trim();

  const webTopInset = Platform.OS === 'web' ? 67 : 0;

  const currentLang = languages.find(l => l.id === language);

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={[Colors.background, '#0B1120', Colors.background]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + webTopInset + 16,
            paddingBottom: insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>
                {playerName ? tr.welcomeBack : tr.welcomeTo}
              </Text>
              <Text style={styles.title}>
                {playerName || 'MedQuiz'}
              </Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable
                style={styles.langButton}
                onPress={() => setShowLangModal(true)}
              >
                <Ionicons name="language" size={18} color={Colors.primary} />
                <Text style={styles.langButtonText}>{currentLang?.flag}</Text>
              </Pressable>
              {playerName ? (
                <Pressable
                  style={styles.editNameButton}
                  onPress={() => setShowNameInput(true)}
                >
                  <Ionicons name="pencil" size={18} color={Colors.textSecondary} />
                </Pressable>
              ) : null}
            </View>
          </View>
        </Animated.View>

        {showNameInput && (
          <Animated.View entering={FadeInDown.springify()} style={styles.nameSection}>
            <Text style={styles.sectionLabel}>{tr.yourName}</Text>
            <View style={styles.nameInputRow}>
              <TextInput
                style={styles.nameInput}
                placeholder={tr.enterYourName}
                placeholderTextColor={Colors.textMuted}
                value={nameInput}
                onChangeText={setNameInput}
                maxLength={20}
                autoCapitalize="words"
                returnKeyType="done"
                onSubmitEditing={handleSaveName}
              />
              {playerName ? (
                <Pressable style={styles.nameSaveButton} onPress={handleSaveName}>
                  <Ionicons name="checkmark" size={22} color={Colors.white} />
                </Pressable>
              ) : null}
            </View>
          </Animated.View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{tr.chooseSubject}</Text>
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              isSelected={selectedSubject === subject.id}
              onPress={() => handleSubjectPress(subject.id)}
              index={index}
              lang={language}
            />
          ))}
        </View>

        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.section}>
          <Text style={styles.sectionLabel}>{tr.difficulty}</Text>
          <View style={styles.difficultyRow}>
            {difficulties.map((diff) => (
              <DifficultyButton
                key={diff.id}
                difficulty={diff}
                isSelected={selectedDifficulty === diff.id}
                onPress={() => handleDifficultyPress(diff.id)}
                lang={language}
              />
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).springify()}>
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              !canStart && styles.startButtonDisabled,
              pressed && canStart && { opacity: 0.9, transform: [{ scale: 0.98 }] },
            ]}
            onPress={handleStartQuiz}
            disabled={!canStart}
          >
            <LinearGradient
              colors={canStart ? [Colors.primary, Colors.primaryDark] : [Colors.cardLight, Colors.card]}
              style={styles.startButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="play" size={22} color={canStart ? Colors.white : Colors.textMuted} />
              <Text style={[styles.startButtonText, !canStart && { color: Colors.textMuted }]}>
                {tr.startQuiz}
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </ScrollView>

      <Modal
        visible={showLangModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLangModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowLangModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{tr.chooseLanguage}</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.langScrollView}
              contentContainerStyle={styles.langScrollContent}
            >
              {languages.map((lang) => (
                <Pressable
                  key={lang.id}
                  style={[
                    styles.langOption,
                    language === lang.id && styles.langOptionActive,
                  ]}
                  onPress={() => handleLanguageSelect(lang.id)}
                >
                  <Text style={styles.langFlag}>{lang.flag}</Text>
                  <View style={styles.langTextGroup}>
                    <Text style={[
                      styles.langName,
                      language === lang.id && styles.langNameActive,
                    ]}>
                      {lang.nativeName}
                    </Text>
                    {lang.nativeName !== lang.name && (
                      <Text style={styles.langNameSub}>{lang.name}</Text>
                    )}
                  </View>
                  {language === lang.id && (
                    <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greeting: {
    fontSize: 15,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit_700Bold',
    color: Colors.text,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  langButtonText: {
    fontSize: 13,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.primary,
  },
  editNameButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameSection: {
    marginBottom: 24,
  },
  nameInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Outfit_500Medium',
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  nameSaveButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  subjectIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  subjectName: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.text,
    marginBottom: 2,
  },
  subjectDescription: {
    fontSize: 13,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textSecondary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  difficultyButton: {
    flex: 1,
    minWidth: (width - 70) / 4,
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  difficultyText: {
    fontSize: 13,
    fontFamily: 'Outfit_500Medium',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  difficultyMultiplier: {
    fontSize: 11,
    fontFamily: 'Outfit_700Bold',
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 4,
  },
  startButtonDisabled: {
    opacity: 0.6,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
    color: Colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    paddingBottom: 16,
    width: '100%',
    maxWidth: 340,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Outfit_700Bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  langScrollView: {
    flexGrow: 0,
  },
  langScrollContent: {
    paddingBottom: 4,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: Colors.cardLight,
    gap: 10,
  },
  langOptionActive: {
    backgroundColor: Colors.primary + '15',
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  langFlag: {
    fontSize: 13,
    fontFamily: 'Outfit_700Bold',
    color: Colors.textSecondary,
    width: 26,
  },
  langTextGroup: {
    flex: 1,
  },
  langNameSub: {
    fontSize: 11,
    fontFamily: 'Outfit_400Regular',
    color: Colors.textMuted,
    marginTop: 1,
  },
  langName: {
    fontSize: 15,
    fontFamily: 'Outfit_500Medium',
    color: Colors.text,
  },
  langNameActive: {
    fontFamily: 'Outfit_600SemiBold',
    color: Colors.primary,
  },
});
