/* =========================================================
   Психологическое тестирование для деления на проектные группы
   Основа: Belbin Team Roles, FIRO-B, Margerison-McCann TMP
   ========================================================= */

// --- Вопросы -------------------------------------------------
const QUESTIONS = [
  // Блок 1. Командные роли
  { text: "Мне нравится предлагать новые идеи, даже если они ещё не до конца продуманы.", scale: "GI", block: 1 },
  { text: "Я предпочитаю распределять задачи между участниками и следить, чтобы все работали согласованно.", scale: "KO", block: 1 },
  { text: "Я получаю удовлетворение, когда задача выполнена качественно и в срок.", scale: "IS", block: 1 },
  { text: "Прежде чем принять решение, я стараюсь собрать как можно больше фактов и оценить риски.", scale: "AN", block: 1 },
  { text: "Я легко нахожу общий язык с разными людьми и помогаю сглаживать конфликты.", scale: "DI", block: 1 },
  { text: "Я замечаю ошибки и несоответствия в работе раньше других.", scale: "KR", block: 1 },
  { text: "Я часто предлагаю нестандартные решения, которые другим не приходят в голову.", scale: "GI", block: 1 },
  { text: "Мне комфортно быть человеком, который организует обсуждение и подводит итоги.", scale: "KO", block: 1 },
  { text: "Я предпочитаю чёткие инструкции и стабильный порядок в работе.", scale: "IS", block: 1 },
  { text: "Мне нравится анализировать данные и проверять, насколько выводы подтверждаются фактами.", scale: "AN", block: 1 },
  { text: "Я умею слушать и поддерживать атмосферу сотрудничества в группе.", scale: "DI", block: 1 },
  { text: "Я внимательно проверяю детали и не люблю, когда что-то остаётся недоработанным.", scale: "KR", block: 1 },

  // Блок 2. Межличностные потребности
  { text: "Мне важно чувствовать себя частью команды, а не работать в одиночку.", scale: "VK", block: 2 },
  { text: "Я предпочитаю, чтобы в группе был чётко определён лидер и распределены роли.", scale: "KT", block: 2 },
  { text: "Мне важно, чтобы в команде были доверительные, дружеские отношения.", scale: "PR", block: 2 },
  { text: "Я часто беру инициативу на себя, если вижу, что группе не хватает направленности.", scale: "KT", block: 2 },
  { text: "Мне комфортнее работать с людьми, которые разделяют мои интересы.", scale: "VK", block: 2 },
  { text: "Я стараюсь поддерживать личный контакт с участниками и интересуюсь их состоянием.", scale: "PR", block: 2 },
  { text: "Я легко включаюсь в новую группу и быстро нахожу своё место.", scale: "VK", block: 2 },
  { text: "Мне важно, чтобы моё мнение учитывалось при принятии решений.", scale: "KT", block: 2 },
  { text: "Я ценю возможность обсудить с командой не только рабочие, но и личные вопросы.", scale: "PR", block: 2 },

  // Блок 3. Рабочие предпочтения
  { text: "Мне интереснее придумывать новое, чем поддерживать уже работающий процесс.", scale: "IN", block: 3 },
  { text: "Я предпочитаю организовывать работу, планировать этапы и контролировать сроки.", scale: "OR", block: 3 },
  { text: "Мне нравится доводить дело до конкретного результата, даже если работа рутинная.", scale: "PR2", block: 3 },
  { text: "Я получаю удовольствие, когда представляю результаты команды и общаюсь с другими.", scale: "KO2", block: 3 },
  { text: "Я быстро адаптируюсь к изменениям и люблю пробовать новые подходы.", scale: "IN", block: 3 },
  { text: "Мне комфортно работать по чёткому плану и не отклоняться от него.", scale: "OR", block: 3 },
  { text: "Я предпочитаю практические задачи, где виден реальный результат.", scale: "PR2", block: 3 },
  { text: "Я легко налаживаю контакты и умею объяснять сложные вещи простым языком.", scale: "KO2", block: 3 }
];

// --- Названия шкал -------------------------------------------
const SCALE_NAMES = {
  GI: "Генератор идей",
  KO: "Координатор",
  IS: "Исполнитель",
  AN: "Аналитик",
  DI: "Дипломат",
  KR: "Контролёр",
  VK: "Включённость",
  KT: "Контроль",
  PR: "Привязанность",
  IN: "Инновации",
  OR: "Организация",
  PR2: "Производство (практика)",
  KO2: "Коммуникация"
};

const BLOCK_NAMES = {
  1: "Блок 1. Командные роли",
  2: "Блок 2. Межличностные потребности",
  3: "Блок 3. Рабочие предпочтения"
};

const BLOCK_SCALES = {
  1: ["GI", "KO", "IS", "AN", "DI", "KR"],
  2: ["VK", "KT", "PR"],
  3: ["IN", "OR", "PR2", "KO2"]
};

// --- Состояние -----------------------------------------------
const state = {
  current: 0,
  answers: new Array(QUESTIONS.length).fill(null)
};

// --- DOM -----------------------------------------------------
const screens = {
  intro: document.getElementById("screen-intro"),
  test: document.getElementById("screen-test"),
  result: document.getElementById("screen-result")
};

const el = {
  progressText: document.getElementById("progress-text"),
  progressPercent: document.getElementById("progress-percent"),
  progressFill: document.getElementById("progress-fill"),
  questionBlock: document.getElementById("question-block"),
  questionText: document.getElementById("question-text"),
  options: document.getElementById("options"),
  btnPrev: document.getElementById("btn-prev"),
  btnNext: document.getElementById("btn-next"),
  btnStart: document.getElementById("btn-start"),
  btnRestart: document.getElementById("btn-restart"),
  rolesResult: document.getElementById("roles-result"),
  firoResult: document.getElementById("firo-result"),
  workResult: document.getElementById("work-result"),
  resultIntro: document.getElementById("result-intro"),
  recommendations: document.getElementById("recommendations")
};

// --- Переключение экранов ------------------------------------
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Рендер вопроса ------------------------------------------
function renderQuestion() {
  const q = QUESTIONS[state.current];
  const total = QUESTIONS.length;
  const answered = state.answers.filter(a => a !== null).length;
  const percent = Math.round((answered / total) * 100);

  el.progressText.textContent = `Вопрос ${state.current + 1} из ${total}`;
  el.progressPercent.textContent = `${percent}%`;
  el.progressFill.style.width = `${percent}%`;
  el.questionBlock.textContent = BLOCK_NAMES[q.block];
  el.questionText.textContent = q.text;
  el.options.innerHTML = "";

  const labels = [
    "0 — совершенно не согласен",
    "1 — скорее не согласен",
    "2 — нейтрально",
    "3 — скорее согласен",
    "4 — полностью согласен"
  ];

  labels.forEach((label, value) => {
    const opt = document.createElement("label");
    opt.className = "option";
    if (state.answers[state.current] === value) opt.classList.add("selected");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = value;
    input.checked = state.answers[state.current] === value;

    const mark = document.createElement("span");
    mark.className = "radio-mark";

    const span = document.createElement("span");
    span.className = "option-label";
    span.textContent = label;

    opt.appendChild(input);
    opt.appendChild(mark);
    opt.appendChild(span);
    opt.addEventListener("click", () => selectAnswer(value));
    el.options.appendChild(opt);
  });

  el.btnPrev.disabled = state.current === 0;
  el.btnNext.disabled = state.answers[state.current] === null;
  el.btnNext.textContent = state.current === total - 1 ? "Показать результат" : "Далее";
}

function selectAnswer(value) {
  state.answers[state.current] = value;
  renderQuestion();
}

function goNext() {
  if (state.answers[state.current] === null) return;
  if (state.current < QUESTIONS.length - 1) {
    state.current++;
    renderQuestion();
  } else {
    finishTest();
  }
}

function goPrev() {
  if (state.current > 0) {
    state.current--;
    renderQuestion();
  }
}

// --- Подсчёт результатов -------------------------------------
function calculateScores() {
  const scores = {};
  Object.keys(SCALE_NAMES).forEach(k => (scores[k] = 0));
  QUESTIONS.forEach((q, i) => {
    const val = state.answers[i];
    if (val !== null) scores[q.scale] += val;
  });
  return scores;
}

function maxScoreForScale(scale) {
  const count = QUESTIONS.filter(q => q.scale === scale).length;
  return count * 4;
}

function getTopRoles(scores) {
  const roles = BLOCK_SCALES[1].map(key => ({ key, score: scores[key] }));
  roles.sort((a, b) => b.score - a.score);
  return roles;
}

function buildRecommendations(scores) {
  const recs = [];
  const top = getTopRoles(scores);
  recs.push(`Ведущая командная роль: «${SCALE_NAMES[top[0].key]}». Дополнительные роли: «${SCALE_NAMES[top[1].key]}» и «${SCALE_NAMES[top[2].key]}».`);

  if (scores.KT >= 9) {
    recs.push("Высокая потребность в контроле: в группе важно чётко распределить лидерские функции, чтобы избежать борьбы за влияние.");
  } else if (scores.KT <= 3) {
    recs.push("Низкая потребность в контроле: вы комфортно работаете под руководством и не претендуете на лидерство.");
  }
  if (scores.VK >= 9) recs.push("Высокая включённость: вы хорошо встраиваетесь в командную работу и поддерживаете групповую динамику.");
  if (scores.PR >= 9) recs.push("Высокая потребность в привязанности: важны доверительные отношения; хорошо сочетаетесь с аналитиками и исполнителями.");
  if (scores.IN >= 6) recs.push("Выраженная ориентация на инновации: вы — источник идей для группы.");
  if (scores.OR >= 6) recs.push("Выраженная ориентация на организацию: вы можете планировать этапы и контролировать сроки.");
  if (scores.PR2 >= 6) recs.push("Выраженная ориентация на практику: вы доводите задачи до конкретного результата.");
  if (scores.KO2 >= 6) recs.push("Выраженная ориентация на коммуникацию: вы можете представлять результаты команды.");

  return recs;
}

function renderResults() {
  const scores = calculateScores();
  const top = getTopRoles(scores);

  el.resultIntro.textContent =
    `Ваша ведущая роль — «${SCALE_NAMES[top[0].key]}» (${top[0].score} баллов). ` +
    `Дополнительные роли: «${SCALE_NAMES[top[1].key]}» и «${SCALE_NAMES[top[2].key]}».`;

  renderBlock(el.rolesResult, BLOCK_SCALES[1], scores, top[0].key);
  renderBlock(el.firoResult, BLOCK_SCALES[2], scores, null);
  renderBlock(el.workResult, BLOCK_SCALES[3], scores, null);

  el.recommendations.innerHTML = "";
  buildRecommendations(scores).forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    el.recommendations.appendChild(li);
  });

  showScreen("result");
}

function renderBlock(container, scaleKeys, scores, topKey) {
  container.innerHTML = "";
  scaleKeys.forEach(key => {
    const score = scores[key];
    const max = maxScoreForScale(key);
    const percent = Math.round((score / max) * 100);

    const row = document.createElement("div");
    row.className = "result-row" + (key === topKey ? " top" : "");

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = SCALE_NAMES[key];
    if (key === topKey) {
      const badge = document.createElement("span");
      badge.className = "role-badge";
      badge.textContent = "ведущая";
      label.appendChild(badge);
    }

    const barWrap = document.createElement("div");
    barWrap.className = "bar-wrap";
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = `${percent}%`;
    barWrap.appendChild(bar);

    const scoreEl = document.createElement("span");
    scoreEl.className = "score";
    scoreEl.textContent = `${score}/${max}`;

    row.appendChild(label);
    row.appendChild(barWrap);
    row.appendChild(scoreEl);
    container.appendChild(row);
  });
}

function finishTest() {
  renderResults();
}

// --- Сброс ---------------------------------------------------
function restart() {
  state.current = 0;
  state.answers.fill(null);
  showScreen("intro");
}

// --- Инициализация -------------------------------------------
function init() {
  el.btnStart.addEventListener("click", () => {
    state.current = 0;
    state.answers.fill(null);
    renderQuestion();
    showScreen("test");
  });
  el.btnNext.addEventListener("click", goNext);
  el.btnPrev.addEventListener("click", goPrev);
  el.btnRestart.addEventListener("click", restart);

  document.addEventListener("keydown", (e) => {
    if (!screens.test.classList.contains("active")) return;
    if (e.key >= "0" && e.key <= "4") selectAnswer(Number(e.key));
    if (e.key === "ArrowRight" && !el.btnNext.disabled) goNext();
    if (e.key === "ArrowLeft" && !el.btnPrev.disabled) goPrev();
  });
}

document.addEventListener("DOMContentLoaded", init);
