// Carter University Dashboard JavaScript

// User data (would come from backend in production)
let userData = {
  name: 'Calvin',
  progress: 15,
  completedLessons: ['start', 'intro'],
  currentLesson: 'terminal'
};

// Module content loader
function loadModule(moduleName) {
  console.log('Loading module:', moduleName);
  // In production, this would fetch from backend
  updateProgress();
}

// Update progress bar
function updateProgress() {
  const progressBar = document.getElementById('progress-fill');
  if (progressBar) {
    progressBar.style.width = userData.progress + '%';
  }
  
  const progressText = document.getElementById('progress-text');
  if (progressText) {
    progressText.textContent = userData.progress + '%';
  }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  updateProgress();
  
  // Add click handlers for lesson cards
  document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => {
      const lesson = card.dataset.lesson;
      loadModule(lesson);
    });
  });
});
