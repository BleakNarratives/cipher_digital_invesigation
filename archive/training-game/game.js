// Mr. Carter's Training Arena - Game Logic

let gameState = {
  currentOpponent: 0,
  currentQuestion: 0,
  playerHealth: 100,
  opponentHealth: 100,
  score: 0,
  combo: 0,
  maxCombo: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  timeLeft: 30,
  timerInterval: null,
  questionStartTime: 0,
  mistakes: []
};

function startGame() {
  showScreen('gameScreen');
  resetGameState();
  loadOpponent(0);
  loadQuestion();
  startTimer();
  playSound('🔔 DING DING!');
}

function resetGameState() {
  gameState = {
    currentOpponent: 0,
    currentQuestion: 0,
    playerHealth: 100,
    opponentHealth: opponents[0].health,
    score: 0,
    combo: 0,
    maxCombo: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    timeLeft: 30,
    timerInterval: null,
    questionStartTime: Date.now(),
    mistakes: []
  };
  updateHUD();
}

function loadOpponent(index) {
  const opponent = opponents[index];
  gameState.currentOpponent = index;
  gameState.opponentHealth = opponent.health;
  gameState.currentQuestion = 0;
  
  document.getElementById('opponentName').textContent = opponent.name;
  document.getElementById('opponentNameDisplay').textContent = opponent.name;
  document.querySelector('#opponent .fighter-sprite').textContent = opponent.sprite;
  document.getElementById('difficulty').textContent = opponent.difficulty;
  
  updateHUD();
}

function loadQuestion() {
  const opponent = opponents[gameState.currentOpponent];
  const questions = questionBank[opponent.name];
  
  if (gameState.currentQuestion >= questions.length) {
    // Opponent defeated!
    opponentDefeated();
    return;
  }
  
  const q = questions[gameState.currentQuestion];
  gameState.questionStartTime = Date.now();
  gameState.timeLeft = 30;
  
  // Display question
  document.getElementById('explanation').innerHTML = q.explanation;
  document.getElementById('question').textContent = q.question;
  document.getElementById('hintText').textContent = q.hint;
  document.getElementById('hintText').classList.remove('show');
  
  // Create answer buttons
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';
  
  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index, q.correct, q.damage);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct, damage) {
  gameState.totalAnswers++;
  const timeTaken = (Date.now() - gameState.questionStartTime) / 1000;
  const speedBonus = Math.max(0, Math.floor((30 - timeTaken) / 3) * 10);
  
  // Disable all buttons
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
  });
  
  const buttons = document.querySelectorAll('.answer-btn');
  
  if (selected === correct) {
    // CORRECT ANSWER!
    buttons[selected].classList.add('correct');
    gameState.correctAnswers++;
    gameState.combo++;
    gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
    
    // Calculate damage with combo multiplier
    const comboMultiplier = 1 + (gameState.combo * 0.1);
    const totalDamage = Math.floor(damage * comboMultiplier) + speedBonus;
    
    gameState.opponentHealth = Math.max(0, gameState.opponentHealth - totalDamage);
    gameState.score += totalDamage * 10;
    
    // Animations
    playerPunch();
    opponentHit();
    showImpact('💥', 'right');
    showFloatingText(`-${totalDamage} HP!`, 'right', '#ff0040');
    
    if (gameState.combo > 1) {
      setTimeout(() => {
        showFloatingText(`${gameState.combo}x COMBO!`, 'center', '#ffd700');
      }, 300);
    }
    
    if (speedBonus > 0) {
      setTimeout(() => {
        showFloatingText(`+${speedBonus} SPEED!`, 'center', '#00d4ff');
      }, 600);
    }
    
    playSound('💥 POW!');
    
    setTimeout(() => {
      if (gameState.opponentHealth <= 0) {
        opponentDefeated();
      } else {
        nextQuestion();
      }
    }, 2000);
    
  } else {
    // WRONG ANSWER!
    buttons[selected].classList.add('wrong');
    buttons[correct].classList.add('correct');
    gameState.combo = 0;
    
    const opponent = opponents[gameState.currentOpponent];
    const questions = questionBank[opponent.name];
    const q = questions[gameState.currentQuestion];
    
    gameState.mistakes.push({
      question: q.question,
      yourAnswer: q.answers[selected],
      correctAnswer: q.answers[correct],
      explanation: q.explanation
    });
    
    // Player takes damage
    const playerDamage = 20;
    gameState.playerHealth = Math.max(0, gameState.playerHealth - playerDamage);
    
    // Animations
    opponentPunch();
    playerHit();
    showImpact('💢', 'left');
    showFloatingText(`-${playerDamage} HP!`, 'left', '#ff0040');
    playSound('💢 OUCH!');
    
    setTimeout(() => {
      if (gameState.playerHealth <= 0) {
        playerDefeated();
      } else {
        nextQuestion();
      }
    }, 2000);
  }
  
  updateHUD();
}

function nextQuestion() {
  gameState.currentQuestion++;
  loadQuestion();
}

function opponentDefeated() {
  clearInterval(gameState.timerInterval);
  playSound('🎉 K.O.!');
  
  // Victory animation
  document.getElementById('opponent').style.animation = 'hit 0.5s 3';
  
  setTimeout(() => {
    if (gameState.currentOpponent < opponents.length - 1) {
      // More opponents to fight
      showVictoryScreen(false);
    } else {
      // Final victory!
      showVictoryScreen(true);
    }
  }, 1500);
}

function playerDefeated() {
  clearInterval(gameState.timerInterval);
  playSound('💀 K.O.!');
  
  // Defeat animation
  document.getElementById('player').style.animation = 'hit 0.5s 3';
  
  setTimeout(() => {
    showDefeatScreen();
  }, 1500);
}

function showVictoryScreen(finalVictory) {
  showScreen('victoryScreen');
  
  const accuracy = Math.floor((gameState.correctAnswers / gameState.totalAnswers) * 100);
  const timeBonus = gameState.score * 0.1;
  
  document.getElementById('finalScore').textContent = gameState.score;
  document.getElementById('finalAccuracy').textContent = accuracy + '%';
  document.getElementById('maxCombo').textContent = gameState.maxCombo;
  document.getElementById('timeBonus').textContent = Math.floor(timeBonus);
  
  // Determine rank
  let rank = 'ROOKIE';
  if (accuracy >= 90 && gameState.maxCombo >= 4) rank = 'CHAMPION';
  else if (accuracy >= 80 && gameState.maxCombo >= 3) rank = 'EXPERT';
  else if (accuracy >= 70) rank = 'VETERAN';
  else if (accuracy >= 60) rank = 'FIGHTER';
  
  document.getElementById('rank').textContent = rank;
  
  // Show unlocked skills
  const opponent = opponents[gameState.currentOpponent];
  const skillsDiv = document.getElementById('unlockedSkills');
  skillsDiv.innerHTML = `
    <div class="skill-badge">
      ✅ Mastered: ${opponent.name}
    </div>
    <div class="skill-badge">
      ✅ ${opponent.difficulty} Level Complete
    </div>
  `;
  
  if (finalVictory) {
    skillsDiv.innerHTML += `
      <div class="skill-badge gold">
        🏆 CRYPTO FORENSICS MASTER!
      </div>
    `;
  }
}

function showDefeatScreen() {
  showScreen('defeatScreen');
  
  const mistakesDiv = document.getElementById('mistakes');
  mistakesDiv.innerHTML = '';
  
  gameState.mistakes.forEach((mistake, index) => {
    const mistakeCard = document.createElement('div');
    mistakeCard.className = 'mistake-card';
    mistakeCard.innerHTML = `
      <h4>Question ${index + 1}</h4>
      <p><strong>Q:</strong> ${mistake.question}</p>
      <p class="wrong">❌ Your answer: ${mistake.yourAnswer}</p>
      <p class="correct">✅ Correct answer: ${mistake.correctAnswer}</p>
      <p class="explanation">${mistake.explanation}</p>
    `;
    mistakesDiv.appendChild(mistakeCard);
  });
}

function nextOpponent() {
  gameState.currentOpponent++;
  if (gameState.currentOpponent < opponents.length) {
    gameState.playerHealth = 100;
    gameState.combo = 0;
    loadOpponent(gameState.currentOpponent);
    showScreen('gameScreen');
    loadQuestion();
    startTimer();
  } else {
    backToTitle();
  }
}

function restartGame() {
  startGame();
}

function backToTitle() {
  showScreen('titleScreen');
  clearInterval(gameState.timerInterval);
}

function startTimer() {
  clearInterval(gameState.timerInterval);
  gameState.timeLeft = 30;
  
  gameState.timerInterval = setInterval(() => {
    gameState.timeLeft--;
    document.getElementById('timer').textContent = gameState.timeLeft;
    
    if (gameState.timeLeft <= 10) {
      document.getElementById('timer').classList.add('warning');
    } else {
      document.getElementById('timer').classList.remove('warning');
    }
    
    if (gameState.timeLeft <= 0) {
      // Time's up! Treat as wrong answer
      checkAnswer(-1, 0, 0);
    }
  }, 1000);
}

function updateHUD() {
  document.getElementById('playerHealth').style.width = gameState.playerHealth + '%';
  document.getElementById('opponentHealth').style.width = 
    (gameState.opponentHealth / opponents[gameState.currentOpponent].health * 100) + '%';
  document.getElementById('combo').textContent = gameState.combo;
  document.getElementById('score').textContent = gameState.score;
  document.getElementById('roundNum').textContent = gameState.currentQuestion + 1;
  
  const accuracy = gameState.totalAnswers > 0 
    ? Math.floor((gameState.correctAnswers / gameState.totalAnswers) * 100)
    : 0;
  document.getElementById('accuracy').textContent = accuracy;
  
  const speedBonus = Math.max(0, Math.floor((30 - gameState.timeLeft) / 3) * 10);
  document.getElementById('speedBonus').textContent = speedBonus;
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

function showHint() {
  const hintText = document.getElementById('hintText');
  hintText.classList.toggle('show');
}

// Animation functions
function playerPunch() {
  const player = document.getElementById('player');
  player.classList.add('punch');
  setTimeout(() => player.classList.remove('punch'), 300);
}

function opponentPunch() {
  const opponent = document.getElementById('opponent');
  opponent.classList.add('punch');
  setTimeout(() => opponent.classList.remove('punch'), 300);
}

function playerHit() {
  const player = document.getElementById('player');
  player.classList.add('hit');
  setTimeout(() => player.classList.remove('hit'), 500);
}

function opponentHit() {
  const opponent = document.getElementById('opponent');
  opponent.classList.add('hit');
  setTimeout(() => opponent.classList.remove('hit'), 500);
}

function showImpact(emoji, position) {
  const impact = document.getElementById('impactEffect');
  impact.textContent = emoji;
  impact.style.left = position === 'left' ? '30%' : '70%';
  impact.style.top = '50%';
  impact.classList.add('show');
  setTimeout(() => impact.classList.remove('show'), 500);
}

function showFloatingText(text, position, color) {
  const floating = document.getElementById('floatingText');
  floating.textContent = text;
  floating.style.color = color;
  
  if (position === 'left') {
    floating.style.left = '30%';
  } else if (position === 'right') {
    floating.style.left = '70%';
  } else {
    floating.style.left = '50%';
  }
  
  floating.style.top = '40%';
  floating.classList.add('show');
  setTimeout(() => floating.classList.remove('show'), 1000);
}

function playSound(text) {
  const sound = document.getElementById('soundEffect');
  sound.textContent = text;
  sound.classList.add('show');
  setTimeout(() => sound.classList.remove('show'), 500);
}
