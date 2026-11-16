export type Language = 'en' | 'pt' | 'es' | 'fr' | 'de' | 'it' | 'ru' | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'tr' | 'pl';

export interface LanguageInfo {
  id: Language;
  name: string;
  flag: string;
  nativeName: string;
}

export const languages: LanguageInfo[] = [
  { id: 'en', name: 'English',    flag: 'EN', nativeName: 'English' },
  { id: 'pt', name: 'Portuguese', flag: 'PT', nativeName: 'Português' },
  { id: 'es', name: 'Spanish',    flag: 'ES', nativeName: 'Español' },
  { id: 'fr', name: 'French',     flag: 'FR', nativeName: 'Français' },
  { id: 'de', name: 'German',     flag: 'DE', nativeName: 'Deutsch' },
  { id: 'it', name: 'Italian',    flag: 'IT', nativeName: 'Italiano' },
  { id: 'ru', name: 'Russian',    flag: 'RU', nativeName: 'Русский' },
  { id: 'zh', name: 'Chinese',    flag: 'ZH', nativeName: '中文' },
  { id: 'ja', name: 'Japanese',   flag: 'JA', nativeName: '日本語' },
  { id: 'ko', name: 'Korean',     flag: 'KO', nativeName: '한국어' },
  { id: 'ar', name: 'Arabic',     flag: 'AR', nativeName: 'العربية' },
  { id: 'hi', name: 'Hindi',      flag: 'HI', nativeName: 'हिन्दी' },
  { id: 'tr', name: 'Turkish',    flag: 'TR', nativeName: 'Türkçe' },
  { id: 'pl', name: 'Polish',     flag: 'PL', nativeName: 'Polski' },
];

type TranslationKeys = {
  welcomeTo: string;
  welcomeBack: string;
  yourName: string;
  enterYourName: string;
  chooseSubject: string;
  difficulty: string;
  startQuiz: string;
  leaderboard: string;
  play: string;
  noScoresYet: string;
  playQuizToSee: string;
  all: string;
  pts: string;
  correct: string;
  wrong: string;
  timesUp: string;
  nextQuestion: string;
  seeResults: string;
  loadingQuestions: string;
  outstanding: string;
  greatJob: string;
  goodEffort: string;
  keepTrying: string;
  studyMore: string;
  totalScore: string;
  accuracy: string;
  subject: string;
  player: string;
  playAgain: string;
  home: string;
  language: string;
  chooseLanguage: string;
  easy: string;
  normal: string;
  hard: string;
  impossible: string;
  anatomy: string;
  physiology: string;
  pharmacology: string;
  biochemistry: string;
  pathology: string;
  microbiology: string;
  general: string;
  anatomyDesc: string;
  physiologyDesc: string;
  pharmacologyDesc: string;
  biochemistryDesc: string;
  pathologyDesc: string;
  microbiologyDesc: string;
  generalDesc: string;
  pharma: string;
  biochem: string;
  micro: string;
  gen: string;
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
  answerPrefix: string;
};

const translations: Record<Language, TranslationKeys> = {
  // ── ENGLISH ──────────────────────────────────────────────────────────────
  en: {
    welcomeTo: 'Welcome to', welcomeBack: 'Welcome back,',
    yourName: 'Your Name', enterYourName: 'Enter your name',
    chooseSubject: 'Choose Subject', difficulty: 'Difficulty',
    startQuiz: 'Start Quiz', leaderboard: 'Leaderboard', play: 'Play',
    noScoresYet: 'No scores yet', playQuizToSee: 'Play a quiz to see your scores here',
    all: 'All', pts: 'pts', correct: 'Correct!', wrong: 'Wrong! Answer:',
    timesUp: "Time's up!", nextQuestion: 'Next Question', seeResults: 'See Results',
    loadingQuestions: 'Loading questions...', outstanding: 'Outstanding',
    greatJob: 'Great Job', goodEffort: 'Good Effort', keepTrying: 'Keep Trying',
    studyMore: 'Study More', totalScore: 'Total Score', accuracy: 'Accuracy',
    subject: 'Subject', player: 'Player', playAgain: 'Play Again', home: 'Home',
    language: 'Language', chooseLanguage: 'Choose Language',
    easy: 'Easy', normal: 'Normal', hard: 'Hard', impossible: 'Impossible',
    anatomy: 'Anatomy', physiology: 'Physiology', pharmacology: 'Pharmacology',
    biochemistry: 'Biochemistry', pathology: 'Pathology', microbiology: 'Microbiology',
    general: 'General Knowledge',
    anatomyDesc: 'Structure of the human body',
    physiologyDesc: 'Functions of body systems',
    pharmacologyDesc: 'Drug actions & interactions',
    biochemistryDesc: 'Chemical processes in life',
    pathologyDesc: 'Disease mechanisms',
    microbiologyDesc: 'Microorganisms & infections',
    generalDesc: 'Medical history, ethics & culture',
    pharma: 'Pharma', biochem: 'Biochem', micro: 'Micro', gen: 'General',
    justNow: 'Just now', minutesAgo: 'm ago', hoursAgo: 'h ago', daysAgo: 'd ago',
    answerPrefix: 'Wrong! Answer:',
  },

  // ── PORTUGUESE ───────────────────────────────────────────────────────────
  pt: {
    welcomeTo: 'Bem-vindo ao', welcomeBack: 'Bem-vindo de volta,',
    yourName: 'Seu Nome', enterYourName: 'Digite seu nome',
    chooseSubject: 'Escolha a Matéria', difficulty: 'Dificuldade',
    startQuiz: 'Iniciar Quiz', leaderboard: 'Ranking', play: 'Jogar',
    noScoresYet: 'Sem pontuações ainda', playQuizToSee: 'Jogue um quiz para ver suas pontuações aqui',
    all: 'Todos', pts: 'pts', correct: 'Correto!', wrong: 'Errado! Resposta:',
    timesUp: 'Tempo esgotado!', nextQuestion: 'Próxima Pergunta', seeResults: 'Ver Resultados',
    loadingQuestions: 'Carregando perguntas...', outstanding: 'Excelente',
    greatJob: 'Ótimo Trabalho', goodEffort: 'Bom Esforço', keepTrying: 'Continue Tentando',
    studyMore: 'Estude Mais', totalScore: 'Pontuação Total', accuracy: 'Precisão',
    subject: 'Matéria', player: 'Jogador', playAgain: 'Jogar Novamente', home: 'Início',
    language: 'Idioma', chooseLanguage: 'Escolha o Idioma',
    easy: 'Fácil', normal: 'Normal', hard: 'Difícil', impossible: 'Impossível',
    anatomy: 'Anatomia', physiology: 'Fisiologia', pharmacology: 'Farmacologia',
    biochemistry: 'Bioquímica', pathology: 'Patologia', microbiology: 'Microbiologia',
    general: 'Conhecimento Geral',
    anatomyDesc: 'Estrutura do corpo humano',
    physiologyDesc: 'Funções dos sistemas do corpo',
    pharmacologyDesc: 'Ações e interações de drogas',
    biochemistryDesc: 'Processos químicos na vida',
    pathologyDesc: 'Mecanismos de doenças',
    microbiologyDesc: 'Microrganismos e infecções',
    generalDesc: 'História, ética e cultura médica',
    pharma: 'Farma', biochem: 'Bioq', micro: 'Micro', gen: 'Geral',
    justNow: 'Agora', minutesAgo: 'min atrás', hoursAgo: 'h atrás', daysAgo: 'd atrás',
    answerPrefix: 'Errado! Resposta:',
  },

  // ── SPANISH ──────────────────────────────────────────────────────────────
  es: {
    welcomeTo: 'Bienvenido a', welcomeBack: 'Bienvenido de vuelta,',
    yourName: 'Tu Nombre', enterYourName: 'Ingresa tu nombre',
    chooseSubject: 'Elige Materia', difficulty: 'Dificultad',
    startQuiz: 'Iniciar Quiz', leaderboard: 'Clasificación', play: 'Jugar',
    noScoresYet: 'Sin puntuaciones aún', playQuizToSee: 'Juega un quiz para ver tus puntuaciones aquí',
    all: 'Todos', pts: 'pts', correct: '¡Correcto!', wrong: '¡Incorrecto! Respuesta:',
    timesUp: '¡Se acabó el tiempo!', nextQuestion: 'Siguiente Pregunta', seeResults: 'Ver Resultados',
    loadingQuestions: 'Cargando preguntas...', outstanding: 'Sobresaliente',
    greatJob: 'Gran Trabajo', goodEffort: 'Buen Esfuerzo', keepTrying: 'Sigue Intentando',
    studyMore: 'Estudia Más', totalScore: 'Puntuación Total', accuracy: 'Precisión',
    subject: 'Materia', player: 'Jugador', playAgain: 'Jugar de Nuevo', home: 'Inicio',
    language: 'Idioma', chooseLanguage: 'Elige Idioma',
    easy: 'Fácil', normal: 'Normal', hard: 'Difícil', impossible: 'Imposible',
    anatomy: 'Anatomía', physiology: 'Fisiología', pharmacology: 'Farmacología',
    biochemistry: 'Bioquímica', pathology: 'Patología', microbiology: 'Microbiología',
    general: 'Conocimiento General',
    anatomyDesc: 'Estructura del cuerpo humano',
    physiologyDesc: 'Funciones de los sistemas del cuerpo',
    pharmacologyDesc: 'Acciones e interacciones de fármacos',
    biochemistryDesc: 'Procesos químicos en la vida',
    pathologyDesc: 'Mecanismos de enfermedades',
    microbiologyDesc: 'Microorganismos e infecciones',
    generalDesc: 'Historia, ética y cultura médica',
    pharma: 'Farma', biochem: 'Bioq', micro: 'Micro', gen: 'General',
    justNow: 'Ahora', minutesAgo: 'min', hoursAgo: 'h', daysAgo: 'd',
    answerPrefix: '¡Incorrecto! Respuesta:',
  },

  // ── FRENCH ───────────────────────────────────────────────────────────────
  fr: {
    welcomeTo: 'Bienvenue sur', welcomeBack: 'Bon retour,',
    yourName: 'Votre Nom', enterYourName: 'Entrez votre nom',
    chooseSubject: 'Choisir la Matière', difficulty: 'Difficulté',
    startQuiz: 'Démarrer le Quiz', leaderboard: 'Classement', play: 'Jouer',
    noScoresYet: 'Pas encore de scores', playQuizToSee: 'Jouez un quiz pour voir vos scores ici',
    all: 'Tous', pts: 'pts', correct: 'Correct !', wrong: 'Faux ! Réponse :',
    timesUp: 'Temps écoulé !', nextQuestion: 'Question Suivante', seeResults: 'Voir les Résultats',
    loadingQuestions: 'Chargement des questions...', outstanding: 'Exceptionnel',
    greatJob: 'Excellent Travail', goodEffort: 'Bon Effort', keepTrying: 'Continuez',
    studyMore: 'Étudiez Plus', totalScore: 'Score Total', accuracy: 'Précision',
    subject: 'Matière', player: 'Joueur', playAgain: 'Rejouer', home: 'Accueil',
    language: 'Langue', chooseLanguage: 'Choisir la Langue',
    easy: 'Facile', normal: 'Normal', hard: 'Difficile', impossible: 'Impossible',
    anatomy: 'Anatomie', physiology: 'Physiologie', pharmacology: 'Pharmacologie',
    biochemistry: 'Biochimie', pathology: 'Pathologie', microbiology: 'Microbiologie',
    general: 'Culture Générale',
    anatomyDesc: 'Structure du corps humain',
    physiologyDesc: 'Fonctions des systèmes du corps',
    pharmacologyDesc: 'Actions et interactions des médicaments',
    biochemistryDesc: 'Processus chimiques dans la vie',
    pathologyDesc: 'Mécanismes des maladies',
    microbiologyDesc: 'Micro-organismes et infections',
    generalDesc: 'Histoire, éthique et culture médicale',
    pharma: 'Pharma', biochem: 'Bioch', micro: 'Micro', gen: 'Général',
    justNow: 'Maintenant', minutesAgo: 'min', hoursAgo: 'h', daysAgo: 'j',
    answerPrefix: 'Faux ! Réponse :',
  },

  // ── GERMAN ───────────────────────────────────────────────────────────────
  de: {
    welcomeTo: 'Willkommen bei', welcomeBack: 'Willkommen zurück,',
    yourName: 'Dein Name', enterYourName: 'Gib deinen Namen ein',
    chooseSubject: 'Fach wählen', difficulty: 'Schwierigkeit',
    startQuiz: 'Quiz starten', leaderboard: 'Rangliste', play: 'Spielen',
    noScoresYet: 'Noch keine Punkte', playQuizToSee: 'Spiele ein Quiz, um deine Punkte zu sehen',
    all: 'Alle', pts: 'Pkt', correct: 'Richtig!', wrong: 'Falsch! Antwort:',
    timesUp: 'Zeit abgelaufen!', nextQuestion: 'Nächste Frage', seeResults: 'Ergebnisse sehen',
    loadingQuestions: 'Fragen werden geladen...', outstanding: 'Hervorragend',
    greatJob: 'Tolle Arbeit', goodEffort: 'Guter Einsatz', keepTrying: 'Weiter versuchen',
    studyMore: 'Mehr lernen', totalScore: 'Gesamtpunktzahl', accuracy: 'Genauigkeit',
    subject: 'Fach', player: 'Spieler', playAgain: 'Erneut spielen', home: 'Startseite',
    language: 'Sprache', chooseLanguage: 'Sprache wählen',
    easy: 'Leicht', normal: 'Normal', hard: 'Schwer', impossible: 'Unmöglich',
    anatomy: 'Anatomie', physiology: 'Physiologie', pharmacology: 'Pharmakologie',
    biochemistry: 'Biochemie', pathology: 'Pathologie', microbiology: 'Mikrobiologie',
    general: 'Allgemeinwissen',
    anatomyDesc: 'Struktur des menschlichen Körpers',
    physiologyDesc: 'Funktionen der Körpersysteme',
    pharmacologyDesc: 'Wirkungen und Wechselwirkungen von Medikamenten',
    biochemistryDesc: 'Chemische Prozesse im Leben',
    pathologyDesc: 'Krankheitsmechanismen',
    microbiologyDesc: 'Mikroorganismen & Infektionen',
    generalDesc: 'Medizingeschichte, Ethik & Kultur',
    pharma: 'Pharma', biochem: 'Biochem', micro: 'Mikro', gen: 'Allgemein',
    justNow: 'Gerade eben', minutesAgo: 'Min. vor', hoursAgo: 'Std. vor', daysAgo: 'T. vor',
    answerPrefix: 'Falsch! Antwort:',
  },

  // ── ITALIAN ──────────────────────────────────────────────────────────────
  it: {
    welcomeTo: 'Benvenuto su', welcomeBack: 'Bentornato,',
    yourName: 'Il Tuo Nome', enterYourName: 'Inserisci il tuo nome',
    chooseSubject: 'Scegli Materia', difficulty: 'Difficoltà',
    startQuiz: 'Inizia Quiz', leaderboard: 'Classifica', play: 'Gioca',
    noScoresYet: 'Nessun punteggio ancora', playQuizToSee: 'Gioca un quiz per vedere i tuoi punteggi',
    all: 'Tutti', pts: 'pts', correct: 'Corretto!', wrong: 'Sbagliato! Risposta:',
    timesUp: 'Tempo scaduto!', nextQuestion: 'Prossima Domanda', seeResults: 'Vedi Risultati',
    loadingQuestions: 'Caricamento domande...', outstanding: 'Eccezionale',
    greatJob: 'Ottimo Lavoro', goodEffort: 'Buon Tentativo', keepTrying: 'Continua a Provare',
    studyMore: 'Studia di Più', totalScore: 'Punteggio Totale', accuracy: 'Precisione',
    subject: 'Materia', player: 'Giocatore', playAgain: 'Gioca di Nuovo', home: 'Home',
    language: 'Lingua', chooseLanguage: 'Scegli Lingua',
    easy: 'Facile', normal: 'Normale', hard: 'Difficile', impossible: 'Impossibile',
    anatomy: 'Anatomia', physiology: 'Fisiologia', pharmacology: 'Farmacologia',
    biochemistry: 'Biochimica', pathology: 'Patologia', microbiology: 'Microbiologia',
    general: 'Cultura Generale',
    anatomyDesc: 'Struttura del corpo umano',
    physiologyDesc: 'Funzioni dei sistemi corporei',
    pharmacologyDesc: 'Azioni e interazioni dei farmaci',
    biochemistryDesc: 'Processi chimici nella vita',
    pathologyDesc: 'Meccanismi delle malattie',
    microbiologyDesc: 'Microrganismi e infezioni',
    generalDesc: 'Storia, etica e cultura medica',
    pharma: 'Farmaco', biochem: 'Bioch', micro: 'Micro', gen: 'Generale',
    justNow: 'Adesso', minutesAgo: 'min fa', hoursAgo: 'h fa', daysAgo: 'g fa',
    answerPrefix: 'Sbagliato! Risposta:',
  },

  // ── RUSSIAN ──────────────────────────────────────────────────────────────
  ru: {
    welcomeTo: 'Добро пожаловать в', welcomeBack: 'С возвращением,',
    yourName: 'Ваше имя', enterYourName: 'Введите ваше имя',
    chooseSubject: 'Выберите предмет', difficulty: 'Сложность',
    startQuiz: 'Начать викторину', leaderboard: 'Таблица лидеров', play: 'Играть',
    noScoresYet: 'Пока нет очков', playQuizToSee: 'Пройдите викторину, чтобы увидеть свои очки',
    all: 'Все', pts: 'очк.', correct: 'Правильно!', wrong: 'Неверно! Ответ:',
    timesUp: 'Время вышло!', nextQuestion: 'Следующий вопрос', seeResults: 'Посмотреть результаты',
    loadingQuestions: 'Загрузка вопросов...', outstanding: 'Выдающийся',
    greatJob: 'Отличная работа', goodEffort: 'Хорошие усилия', keepTrying: 'Продолжайте стараться',
    studyMore: 'Учитесь больше', totalScore: 'Общий счёт', accuracy: 'Точность',
    subject: 'Предмет', player: 'Игрок', playAgain: 'Сыграть снова', home: 'Главная',
    language: 'Язык', chooseLanguage: 'Выберите язык',
    easy: 'Легко', normal: 'Нормально', hard: 'Сложно', impossible: 'Невозможно',
    anatomy: 'Анатомия', physiology: 'Физиология', pharmacology: 'Фармакология',
    biochemistry: 'Биохимия', pathology: 'Патология', microbiology: 'Микробиология',
    general: 'Общие знания',
    anatomyDesc: 'Строение человеческого тела',
    physiologyDesc: 'Функции систем организма',
    pharmacologyDesc: 'Действие и взаимодействие лекарств',
    biochemistryDesc: 'Химические процессы в жизни',
    pathologyDesc: 'Механизмы заболеваний',
    microbiologyDesc: 'Микроорганизмы и инфекции',
    generalDesc: 'История медицины, этика и культура',
    pharma: 'Фарма', biochem: 'Биохим', micro: 'Микро', gen: 'Общее',
    justNow: 'Только что', minutesAgo: 'мин. назад', hoursAgo: 'ч. назад', daysAgo: 'дн. назад',
    answerPrefix: 'Неверно! Ответ:',
  },

  // ── CHINESE (Simplified) ─────────────────────────────────────────────────
  zh: {
    welcomeTo: '欢迎来到', welcomeBack: '欢迎回来,',
    yourName: '您的姓名', enterYourName: '请输入您的姓名',
    chooseSubject: '选择科目', difficulty: '难度',
    startQuiz: '开始测验', leaderboard: '排行榜', play: '开始',
    noScoresYet: '暂无分数', playQuizToSee: '参加测验以查看您的分数',
    all: '全部', pts: '分', correct: '正确！', wrong: '错误！答案：',
    timesUp: '时间到！', nextQuestion: '下一题', seeResults: '查看结果',
    loadingQuestions: '加载题目中...', outstanding: '出色',
    greatJob: '非常好', goodEffort: '不错的努力', keepTrying: '继续加油',
    studyMore: '多加学习', totalScore: '总分', accuracy: '准确率',
    subject: '科目', player: '玩家', playAgain: '再玩一次', home: '主页',
    language: '语言', chooseLanguage: '选择语言',
    easy: '简单', normal: '普通', hard: '困难', impossible: '极难',
    anatomy: '解剖学', physiology: '生理学', pharmacology: '药理学',
    biochemistry: '生物化学', pathology: '病理学', microbiology: '微生物学',
    general: '常识',
    anatomyDesc: '人体结构',
    physiologyDesc: '身体系统的功能',
    pharmacologyDesc: '药物作用与相互作用',
    biochemistryDesc: '生命中的化学过程',
    pathologyDesc: '疾病机制',
    microbiologyDesc: '微生物与感染',
    generalDesc: '医学历史、伦理与文化',
    pharma: '药理', biochem: '生化', micro: '微生物', gen: '常识',
    justNow: '刚刚', minutesAgo: '分钟前', hoursAgo: '小时前', daysAgo: '天前',
    answerPrefix: '错误！答案：',
  },

  // ── JAPANESE ─────────────────────────────────────────────────────────────
  ja: {
    welcomeTo: 'へようこそ', welcomeBack: 'おかえりなさい,',
    yourName: '名前', enterYourName: '名前を入力してください',
    chooseSubject: '科目を選んでください', difficulty: '難易度',
    startQuiz: 'クイズを始める', leaderboard: 'ランキング', play: 'プレイ',
    noScoresYet: 'まだスコアがありません', playQuizToSee: 'クイズをプレイしてスコアを確認してください',
    all: 'すべて', pts: 'pts', correct: '正解！', wrong: '不正解！正解：',
    timesUp: '時間切れ！', nextQuestion: '次の問題', seeResults: '結果を見る',
    loadingQuestions: '問題を読み込み中...', outstanding: '優秀',
    greatJob: 'よくできました', goodEffort: 'よく頑張りました', keepTrying: '挑戦し続けてください',
    studyMore: 'もっと勉強しましょう', totalScore: '合計スコア', accuracy: '正解率',
    subject: '科目', player: 'プレイヤー', playAgain: 'もう一度プレイ', home: 'ホーム',
    language: '言語', chooseLanguage: '言語を選んでください',
    easy: '簡単', normal: '普通', hard: '難しい', impossible: '不可能',
    anatomy: '解剖学', physiology: '生理学', pharmacology: '薬理学',
    biochemistry: '生化学', pathology: '病理学', microbiology: '微生物学',
    general: '一般知識',
    anatomyDesc: '人体の構造',
    physiologyDesc: '体のシステムの機能',
    pharmacologyDesc: '薬の作用と相互作用',
    biochemistryDesc: '生命の化学的プロセス',
    pathologyDesc: '疾患のメカニズム',
    microbiologyDesc: '微生物と感染症',
    generalDesc: '医学の歴史、倫理、文化',
    pharma: '薬理', biochem: '生化学', micro: '微生物', gen: '一般',
    justNow: 'たった今', minutesAgo: '分前', hoursAgo: '時間前', daysAgo: '日前',
    answerPrefix: '不正解！正解：',
  },

  // ── KOREAN ───────────────────────────────────────────────────────────────
  ko: {
    welcomeTo: '에 오신 것을 환영합니다', welcomeBack: '돌아오셨군요,',
    yourName: '이름', enterYourName: '이름을 입력하세요',
    chooseSubject: '과목 선택', difficulty: '난이도',
    startQuiz: '퀴즈 시작', leaderboard: '순위표', play: '플레이',
    noScoresYet: '아직 점수가 없습니다', playQuizToSee: '퀴즈를 플레이하여 점수를 확인하세요',
    all: '전체', pts: '점', correct: '정답!', wrong: '오답! 정답:',
    timesUp: '시간 초과!', nextQuestion: '다음 문제', seeResults: '결과 보기',
    loadingQuestions: '문제 불러오는 중...', outstanding: '탁월함',
    greatJob: '잘했어요', goodEffort: '좋은 노력', keepTrying: '계속 도전하세요',
    studyMore: '더 공부하세요', totalScore: '총 점수', accuracy: '정확도',
    subject: '과목', player: '플레이어', playAgain: '다시 플레이', home: '홈',
    language: '언어', chooseLanguage: '언어 선택',
    easy: '쉬움', normal: '보통', hard: '어려움', impossible: '불가능',
    anatomy: '해부학', physiology: '생리학', pharmacology: '약리학',
    biochemistry: '생화학', pathology: '병리학', microbiology: '미생물학',
    general: '일반 상식',
    anatomyDesc: '인체의 구조',
    physiologyDesc: '신체 시스템의 기능',
    pharmacologyDesc: '약물 작용 및 상호작용',
    biochemistryDesc: '생명의 화학적 과정',
    pathologyDesc: '질병 메커니즘',
    microbiologyDesc: '미생물 및 감염',
    generalDesc: '의학 역사, 윤리 및 문화',
    pharma: '약리', biochem: '생화학', micro: '미생물', gen: '일반',
    justNow: '방금', minutesAgo: '분 전', hoursAgo: '시간 전', daysAgo: '일 전',
    answerPrefix: '오답! 정답:',
  },

  // ── ARABIC ───────────────────────────────────────────────────────────────
  ar: {
    welcomeTo: 'مرحباً بك في', welcomeBack: 'مرحباً بعودتك,',
    yourName: 'اسمك', enterYourName: 'أدخل اسمك',
    chooseSubject: 'اختر المادة', difficulty: 'مستوى الصعوبة',
    startQuiz: 'ابدأ الاختبار', leaderboard: 'لوحة المتصدرين', play: 'العب',
    noScoresYet: 'لا توجد نقاط بعد', playQuizToSee: 'العب اختباراً لترى نقاطك هنا',
    all: 'الكل', pts: 'نقطة', correct: 'صحيح!', wrong: 'خطأ! الإجابة:',
    timesUp: 'انتهى الوقت!', nextQuestion: 'السؤال التالي', seeResults: 'رؤية النتائج',
    loadingQuestions: 'جارٍ تحميل الأسئلة...', outstanding: 'ممتاز',
    greatJob: 'عمل رائع', goodEffort: 'جهد جيد', keepTrying: 'استمر في المحاولة',
    studyMore: 'ادرس أكثر', totalScore: 'النقاط الكلية', accuracy: 'الدقة',
    subject: 'المادة', player: 'اللاعب', playAgain: 'العب مجدداً', home: 'الرئيسية',
    language: 'اللغة', chooseLanguage: 'اختر اللغة',
    easy: 'سهل', normal: 'عادي', hard: 'صعب', impossible: 'مستحيل',
    anatomy: 'علم التشريح', physiology: 'علم وظائف الأعضاء', pharmacology: 'علم الأدوية',
    biochemistry: 'الكيمياء الحيوية', pathology: 'علم الأمراض', microbiology: 'علم الأحياء الدقيقة',
    general: 'معرفة عامة',
    anatomyDesc: 'بنية جسم الإنسان',
    physiologyDesc: 'وظائف أجهزة الجسم',
    pharmacologyDesc: 'تأثيرات الأدوية وتفاعلاتها',
    biochemistryDesc: 'العمليات الكيميائية في الحياة',
    pathologyDesc: 'آليات الأمراض',
    microbiologyDesc: 'الكائنات الدقيقة والعدوى',
    generalDesc: 'تاريخ الطب وأخلاقياته وثقافته',
    pharma: 'صيدلة', biochem: 'كيمياء حيوية', micro: 'ميكروبيولوجي', gen: 'عام',
    justNow: 'الآن', minutesAgo: 'دقيقة', hoursAgo: 'ساعة', daysAgo: 'يوم',
    answerPrefix: 'خطأ! الإجابة:',
  },

  // ── HINDI ─────────────────────────────────────────────────────────────────
  hi: {
    welcomeTo: 'में आपका स्वागत है', welcomeBack: 'वापसी पर स्वागत है,',
    yourName: 'आपका नाम', enterYourName: 'अपना नाम दर्ज करें',
    chooseSubject: 'विषय चुनें', difficulty: 'कठिनाई',
    startQuiz: 'प्रश्नोत्तरी शुरू करें', leaderboard: 'लीडरबोर्ड', play: 'खेलें',
    noScoresYet: 'अभी तक कोई स्कोर नहीं', playQuizToSee: 'अपने स्कोर देखने के लिए प्रश्नोत्तरी खेलें',
    all: 'सभी', pts: 'अंक', correct: 'सही!', wrong: 'गलत! उत्तर:',
    timesUp: 'समय समाप्त!', nextQuestion: 'अगला प्रश्न', seeResults: 'परिणाम देखें',
    loadingQuestions: 'प्रश्न लोड हो रहे हैं...', outstanding: 'उत्कृष्ट',
    greatJob: 'शानदार काम', goodEffort: 'अच्छा प्रयास', keepTrying: 'प्रयास जारी रखें',
    studyMore: 'और पढ़ें', totalScore: 'कुल स्कोर', accuracy: 'सटीकता',
    subject: 'विषय', player: 'खिलाड़ी', playAgain: 'फिर से खेलें', home: 'होम',
    language: 'भाषा', chooseLanguage: 'भाषा चुनें',
    easy: 'आसान', normal: 'सामान्य', hard: 'कठिन', impossible: 'असंभव',
    anatomy: 'शरीर रचना विज्ञान', physiology: 'शरीर क्रिया विज्ञान', pharmacology: 'औषध विज्ञान',
    biochemistry: 'जैव रसायन', pathology: 'विकृति विज्ञान', microbiology: 'सूक्ष्म जीव विज्ञान',
    general: 'सामान्य ज्ञान',
    anatomyDesc: 'मानव शरीर की संरचना',
    physiologyDesc: 'शरीर प्रणालियों के कार्य',
    pharmacologyDesc: 'दवाओं की क्रिया और परस्पर क्रिया',
    biochemistryDesc: 'जीवन में रासायनिक प्रक्रियाएं',
    pathologyDesc: 'रोग तंत्र',
    microbiologyDesc: 'सूक्ष्मजीव और संक्रमण',
    generalDesc: 'चिकित्सा इतिहास, नैतिकता और संस्कृति',
    pharma: 'फार्मा', biochem: 'जैव रसा', micro: 'सूक्ष्म', gen: 'सामान्य',
    justNow: 'अभी', minutesAgo: 'मिनट पहले', hoursAgo: 'घंटे पहले', daysAgo: 'दिन पहले',
    answerPrefix: 'गलत! उत्तर:',
  },

  // ── TURKISH ──────────────────────────────────────────────────────────────
  tr: {
    welcomeTo: 'Hoş geldiniz', welcomeBack: 'Tekrar hoş geldiniz,',
    yourName: 'Adınız', enterYourName: 'Adınızı girin',
    chooseSubject: 'Konu Seç', difficulty: 'Zorluk',
    startQuiz: 'Quiz Başlat', leaderboard: 'Sıralama', play: 'Oyna',
    noScoresYet: 'Henüz puan yok', playQuizToSee: 'Puanlarınızı görmek için quiz oynayın',
    all: 'Hepsi', pts: 'puan', correct: 'Doğru!', wrong: 'Yanlış! Cevap:',
    timesUp: 'Süre doldu!', nextQuestion: 'Sonraki Soru', seeResults: 'Sonuçları Gör',
    loadingQuestions: 'Sorular yükleniyor...', outstanding: 'Olağanüstü',
    greatJob: 'Harika İş', goodEffort: 'İyi Çaba', keepTrying: 'Denemeye Devam Et',
    studyMore: 'Daha Çok Çalış', totalScore: 'Toplam Puan', accuracy: 'Doğruluk',
    subject: 'Konu', player: 'Oyuncu', playAgain: 'Tekrar Oyna', home: 'Ana Sayfa',
    language: 'Dil', chooseLanguage: 'Dil Seç',
    easy: 'Kolay', normal: 'Normal', hard: 'Zor', impossible: 'İmkansız',
    anatomy: 'Anatomi', physiology: 'Fizyoloji', pharmacology: 'Farmakoloji',
    biochemistry: 'Biyokimya', pathology: 'Patoloji', microbiology: 'Mikrobiyoloji',
    general: 'Genel Kültür',
    anatomyDesc: 'İnsan vücudunun yapısı',
    physiologyDesc: 'Vücut sistemlerinin işlevleri',
    pharmacologyDesc: 'İlaç etkileri ve etkileşimleri',
    biochemistryDesc: 'Hayattaki kimyasal süreçler',
    pathologyDesc: 'Hastalık mekanizmaları',
    microbiologyDesc: 'Mikroorganizmalar ve enfeksiyonlar',
    generalDesc: 'Tıp tarihi, etik ve kültür',
    pharma: 'Farma', biochem: 'Biyokim', micro: 'Mikro', gen: 'Genel',
    justNow: 'Az önce', minutesAgo: 'dk önce', hoursAgo: 'sa önce', daysAgo: 'g önce',
    answerPrefix: 'Yanlış! Cevap:',
  },

  // ── POLISH ───────────────────────────────────────────────────────────────
  pl: {
    welcomeTo: 'Witaj w', welcomeBack: 'Witaj z powrotem,',
    yourName: 'Twoje Imię', enterYourName: 'Wpisz swoje imię',
    chooseSubject: 'Wybierz Temat', difficulty: 'Trudność',
    startQuiz: 'Rozpocznij Quiz', leaderboard: 'Ranking', play: 'Graj',
    noScoresYet: 'Brak wyników', playQuizToSee: 'Zagraj w quiz, aby zobaczyć swoje wyniki',
    all: 'Wszystkie', pts: 'pkt', correct: 'Poprawnie!', wrong: 'Błąd! Odpowiedź:',
    timesUp: 'Czas minął!', nextQuestion: 'Następne Pytanie', seeResults: 'Wyniki',
    loadingQuestions: 'Ładowanie pytań...', outstanding: 'Znakomity',
    greatJob: 'Świetna Robota', goodEffort: 'Dobry Wysiłek', keepTrying: 'Próbuj Dalej',
    studyMore: 'Ucz Się Więcej', totalScore: 'Łączny Wynik', accuracy: 'Dokładność',
    subject: 'Temat', player: 'Gracz', playAgain: 'Zagraj Znowu', home: 'Start',
    language: 'Język', chooseLanguage: 'Wybierz Język',
    easy: 'Łatwy', normal: 'Normalny', hard: 'Trudny', impossible: 'Niemożliwy',
    anatomy: 'Anatomia', physiology: 'Fizjologia', pharmacology: 'Farmakologia',
    biochemistry: 'Biochemia', pathology: 'Patologia', microbiology: 'Mikrobiologia',
    general: 'Wiedza Ogólna',
    anatomyDesc: 'Budowa ciała ludzkiego',
    physiologyDesc: 'Funkcje układów ciała',
    pharmacologyDesc: 'Działanie i interakcje leków',
    biochemistryDesc: 'Procesy chemiczne w życiu',
    pathologyDesc: 'Mechanizmy chorób',
    microbiologyDesc: 'Mikroorganizmy i infekcje',
    generalDesc: 'Historia, etyka i kultura medyczna',
    pharma: 'Farma', biochem: 'Bioch', micro: 'Mikro', gen: 'Ogólne',
    justNow: 'Przed chwilą', minutesAgo: 'min temu', hoursAgo: 'h temu', daysAgo: 'd temu',
    answerPrefix: 'Błąd! Odpowiedź:',
  },
};

export function t(lang: Language): TranslationKeys {
  return translations[lang] ?? translations['en'];
}

export function getSubjectName(lang: Language, subjectId: string): string {
  const tr = translations[lang] ?? translations['en'];
  const key = subjectId as keyof TranslationKeys;
  return tr[key] || subjectId;
}

export function getSubjectDesc(lang: Language, subjectId: string): string {
  const tr = translations[lang] ?? translations['en'];
  const key = (subjectId + 'Desc') as keyof TranslationKeys;
  return tr[key] || '';
}

export function getDifficultyName(lang: Language, diffId: string): string {
  const tr = translations[lang] ?? translations['en'];
  const key = diffId as keyof TranslationKeys;
  return tr[key] || diffId;
}
