// Quiz Arena - Advanced Team Competition Platform
class QuizArena {
    constructor() {
        this.state = {
            currentScreen: 'welcome',
            user: null,
            currentTeam: null,
            teams: [],
            questions: [],
            currentQuestionIndex: 0,
            quizInProgress: false,
            timer: null,
            timeRemaining: 0,
            selectedAnswer: null,
            score: 0,
            streak: 0,
            chatMessages: [],
            notifications: [],
            gameSettings: {
                questionCount: 10,
                categories: ['Technology', 'Science', 'Geography'],
                timerEnabled: true,
                chatEnabled: true
            }
        };

        this.sampleData = {
            teams: [
                {
                    id: "team-1",
                    name: "Code Warriors",
                    color: "#6366f1",
                    code: "CW123",
                    members: [
                        {id: "u1", name: "Alex Chen", role: "captain", avatar: "👨‍💻"},
                        {id: "u2", name: "Sarah Kim", role: "member", avatar: "👩‍💼"},
                        {id: "u3", name: "Mike Johnson", role: "member", avatar: "👨‍🎓"}
                    ],
                    score: 0,
                    streak: 0
                },
                {
                    id: "team-2", 
                    name: "Quiz Masters",
                    color: "#8b5cf6",
                    code: "QM456",
                    members: [
                        {id: "u4", name: "Emma Davis", role: "captain", avatar: "👩‍🔬"},
                        {id: "u5", name: "David Wilson", role: "member", avatar: "👨‍⚕️"}
                    ],
                    score: 0,
                    streak: 0
                }
            ],
            questions: [
                {
                    id: "q1",
                    category: "Technology",
                    difficulty: "easy",
                    question: "What does HTML stand for?",
                    options: [
                        "HyperText Markup Language",
                        "Home Tool Markup Language", 
                        "Hyperlinks and Text Markup Language",
                        "Hyperlinking Text Management Language"
                    ],
                    correctAnswer: 0,
                    timeLimit: 15,
                    points: 100
                },
                {
                    id: "q2",
                    category: "Science",
                    difficulty: "medium",
                    question: "What is the chemical symbol for gold?",
                    options: ["Go", "Gd", "Au", "Ag"],
                    correctAnswer: 2,
                    timeLimit: 20,
                    points: 150
                },
                {
                    id: "q3",
                    category: "Geography",
                    difficulty: "hard",
                    question: "Which country has the most time zones?",
                    options: ["Russia", "United States", "China", "France"],
                    correctAnswer: 3,
                    timeLimit: 25,
                    points: 200
                },
                {
                    id: "q4",
                    category: "Technology",
                    difficulty: "medium",
                    question: "Which programming language is known as the 'language of the web'?",
                    options: ["Python", "JavaScript", "Java", "C++"],
                    correctAnswer: 1,
                    timeLimit: 20,
                    points: 150
                },
                {
                    id: "q5",
                    category: "Science",
                    difficulty: "easy",
                    question: "What is the largest planet in our solar system?",
                    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
                    correctAnswer: 1,
                    timeLimit: 15,
                    points: 100
                },
                {
                    id: "q6",
                    category: "Geography",
                    difficulty: "medium",
                    question: "What is the capital of Australia?",
                    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
                    correctAnswer: 2,
                    timeLimit: 20,
                    points: 150
                },
                {
                    id: "q7",
                    category: "Technology",
                    difficulty: "hard",
                    question: "Who is considered the father of computer science?",
                    options: ["Bill Gates", "Steve Jobs", "Alan Turing", "Tim Berners-Lee"],
                    correctAnswer: 2,
                    timeLimit: 25,
                    points: 200
                },
                {
                    id: "q8",
                    category: "Science",
                    difficulty: "medium",
                    question: "What is the speed of light in vacuum?",
                    options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
                    correctAnswer: 0,
                    timeLimit: 20,
                    points: 150
                },
                {
                    id: "q9",
                    category: "Geography",
                    difficulty: "easy",
                    question: "Which is the longest river in the world?",
                    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
                    correctAnswer: 1,
                    timeLimit: 15,
                    points: 100
                },
                {
                    id: "q10",
                    category: "Technology",
                    difficulty: "easy",
                    question: "What does CPU stand for?",
                    options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"],
                    correctAnswer: 1,
                    timeLimit: 15,
                    points: 100
                }
            ]
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.showLoadingScreen();
        this.loadSampleData();
        
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showScreen('welcome');
        }, 2000);
    }

    loadSampleData() {
        this.state.teams = [...this.sampleData.teams];
        this.state.questions = [...this.sampleData.questions];
    }

    bindEvents() {
        // Welcome screen events
        document.getElementById('create-team-btn').addEventListener('click', () => {
            this.showModal('team-creation-modal');
        });

        document.getElementById('join-team-btn').addEventListener('click', () => {
            this.showModal('team-join-modal');
        });

        // Modal events
        document.getElementById('close-create-modal').addEventListener('click', () => {
            this.hideModal('team-creation-modal');
        });

        document.getElementById('close-join-modal').addEventListener('click', () => {
            this.hideModal('team-join-modal');
        });

        document.getElementById('create-team-confirm').addEventListener('click', () => {
            this.createTeam();
        });

        document.getElementById('join-team-confirm').addEventListener('click', () => {
            this.joinTeam();
        });

        // Avatar selection
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const parent = e.target.closest('.avatar-selector');
                parent.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Lobby events
        document.getElementById('copy-code-btn').addEventListener('click', () => {
            this.copyTeamCode();
        });

        document.getElementById('leave-team-btn').addEventListener('click', () => {
            this.leaveTeam();
        });

        document.getElementById('start-quiz-btn').addEventListener('click', () => {
            this.startQuiz();
        });

        // Chat events
        document.getElementById('send-message-btn').addEventListener('click', () => {
            this.sendChatMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });

        // Results events
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.resetQuiz();
        });

        document.getElementById('view-details-btn').addEventListener('click', () => {
            this.showNotification('Detailed analytics would be available in the full version!', 'info');
        });

        // Settings events
        document.getElementById('question-count-select').addEventListener('change', (e) => {
            this.state.gameSettings.questionCount = parseInt(e.target.value);
        });

        document.querySelectorAll('.category-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('active');
                this.updateSelectedCategories();
            });
        });
    }

    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 250);
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(`${screenId}-screen`).classList.add('active');
        this.state.currentScreen = screenId;
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    createTeam() {
        const teamName = document.getElementById('team-name-input').value.trim();
        const captainName = document.getElementById('captain-name-input').value.trim();
        const selectedAvatar = document.querySelector('#team-creation-modal .avatar-option.active').dataset.avatar;

        if (!teamName || !captainName) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        const teamCode = this.generateTeamCode();
        const teamId = `team-${Date.now()}`;
        const userId = `user-${Date.now()}`;

        const newTeam = {
            id: teamId,
            name: teamName,
            color: this.getRandomTeamColor(),
            code: teamCode,
            members: [{
                id: userId,
                name: captainName,
                role: 'captain',
                avatar: selectedAvatar
            }],
            score: 0,
            streak: 0
        };

        this.state.user = {
            id: userId,
            name: captainName,
            avatar: selectedAvatar,
            role: 'captain'
        };

        this.state.currentTeam = newTeam;
        this.state.teams.push(newTeam);

        this.hideModal('team-creation-modal');
        this.showScreen('lobby');
        this.updateLobbyUI();
        this.showNotification(`Team "${teamName}" created successfully!`, 'success');
        this.addSystemMessage(`${captainName} created the team`);
    }

    joinTeam() {
        const teamCode = document.getElementById('team-code-input').value.trim().toUpperCase();
        const memberName = document.getElementById('member-name-input').value.trim();
        const selectedAvatar = document.querySelector('#team-join-modal .avatar-option.active').dataset.avatar;

        if (!teamCode || !memberName) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        const team = this.state.teams.find(t => t.code === teamCode);
        if (!team) {
            this.showNotification('Team not found. Please check the code.', 'error');
            return;
        }

        if (team.members.length >= 5) {
            this.showNotification('Team is full!', 'error');
            return;
        }

        const userId = `user-${Date.now()}`;
        const newMember = {
            id: userId,
            name: memberName,
            role: 'member',
            avatar: selectedAvatar
        };

        team.members.push(newMember);

        this.state.user = {
            id: userId,
            name: memberName,
            avatar: selectedAvatar,
            role: 'member'
        };

        this.state.currentTeam = team;

        this.hideModal('team-join-modal');
        this.showScreen('lobby');
        this.updateLobbyUI();
        this.showNotification(`Joined team "${team.name}" successfully!`, 'success');
        this.addSystemMessage(`${memberName} joined the team`);
    }

    generateTeamCode() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    getRandomTeamColor() {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateLobbyUI() {
        if (!this.state.currentTeam) return;

        document.getElementById('lobby-team-name').textContent = this.state.currentTeam.name;
        document.getElementById('team-code-display').textContent = this.state.currentTeam.code;

        this.renderTeamMembers();
        this.renderChatMessages();
    }

    renderTeamMembers() {
        const membersList = document.getElementById('team-members-list');
        membersList.innerHTML = '';

        this.state.currentTeam.members.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member animate-slide-up';
            memberElement.innerHTML = `
                <div class="member-avatar">${member.avatar}</div>
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-role ${member.role}">${member.role}</div>
                </div>
            `;
            membersList.appendChild(memberElement);
        });
    }

    copyTeamCode() {
        const teamCode = this.state.currentTeam.code;
        navigator.clipboard.writeText(teamCode).then(() => {
            this.showNotification('Team code copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy team code', 'error');
        });
    }

    leaveTeam() {
        if (this.state.user.role === 'captain') {
            this.showNotification('Captain cannot leave the team. Transfer leadership first.', 'error');
            return;
        }

        this.state.currentTeam = null;
        this.state.user = null;
        this.showScreen('welcome');
        this.showNotification('Left the team', 'info');
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        this.state.chatMessages.push({
            id: Date.now(),
            author: this.state.user.name,
            avatar: this.state.user.avatar,
            text: message,
            timestamp: new Date()
        });

        input.value = '';
        this.renderChatMessages();
    }

    addSystemMessage(text) {
        this.state.chatMessages.push({
            id: Date.now(),
            author: 'System',
            avatar: '🤖',
            text: text,
            timestamp: new Date(),
            isSystem: true
        });
        this.renderChatMessages();
    }

    renderChatMessages() {
        const chatContainer = document.getElementById('chat-messages');
        chatContainer.innerHTML = '';

        this.state.chatMessages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${message.isSystem ? 'system' : ''}`;
            messageElement.innerHTML = `
                <div class="chat-message-author">${message.avatar} ${message.author}</div>
                <p class="chat-message-text">${message.text}</p>
            `;
            chatContainer.appendChild(messageElement);
        });

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    updateSelectedCategories() {
        const selectedCategories = [];
        document.querySelectorAll('.category-option.active').forEach(option => {
            selectedCategories.push(option.dataset.category);
        });
        this.state.gameSettings.categories = selectedCategories;
    }

    startQuiz() {
        // Allow single player for demo purposes - removed the minimum team size restriction
        this.state.quizInProgress = true;
        this.state.currentQuestionIndex = 0;
        this.state.score = 0;
        this.state.streak = 0;
        this.state.currentTeam.score = 0;

        // Simulate other teams joining
        this.simulateOtherTeamsJoining();

        this.showScreen('quiz');
        this.showNextQuestion();
        this.showLiveLeaderboard();
        this.addSystemMessage('Quiz started! Good luck team!');
    }

    simulateOtherTeamsJoining() {
        // Add some simulated teams for competition
        this.state.teams.forEach(team => {
            if (team.id !== this.state.currentTeam.id) {
                team.score = Math.floor(Math.random() * 100);
            }
        });
    }

    showNextQuestion() {
        if (this.state.currentQuestionIndex >= Math.min(this.state.questions.length, this.state.gameSettings.questionCount)) {
            this.endQuiz();
            return;
        }

        const question = this.state.questions[this.state.currentQuestionIndex];
        this.state.selectedAnswer = null;
        this.state.timeRemaining = question.timeLimit;

        this.renderQuestion(question);
        this.updateProgressBar();
        this.startTimer();
    }

    renderQuestion(question) {
        document.getElementById('question-category').textContent = question.category;
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('question-counter').textContent = 
            `${this.state.currentQuestionIndex + 1} / ${Math.min(this.state.questions.length, this.state.gameSettings.questionCount)}`;

        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option-button';
            optionButton.textContent = option;
            optionButton.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(optionButton);
        });
    }

    selectAnswer(answerIndex) {
        if (this.state.selectedAnswer !== null) return;

        this.state.selectedAnswer = answerIndex;
        const question = this.state.questions[this.state.currentQuestionIndex];
        const isCorrect = answerIndex === question.correctAnswer;

        // Update UI
        const options = document.querySelectorAll('.option-button');
        options[answerIndex].classList.add('selected');

        setTimeout(() => {
            this.showAnswerFeedback(isCorrect, question.correctAnswer);
        }, 500);
    }

    showAnswerFeedback(isCorrect, correctIndex) {
        const options = document.querySelectorAll('.option-button');
        
        options[correctIndex].classList.add('correct');
        
        if (!isCorrect && this.state.selectedAnswer !== null) {
            options[this.state.selectedAnswer].classList.add('incorrect');
        }

        this.stopTimer();
        this.calculateScore(isCorrect);
        this.updateScore();

        setTimeout(() => {
            this.state.currentQuestionIndex++;
            this.showNextQuestion();
        }, 2000);
    }

    calculateScore(isCorrect) {
        if (!isCorrect) {
            this.state.streak = 0;
            return;
        }

        const question = this.state.questions[this.state.currentQuestionIndex];
        const timeBonus = Math.floor((this.state.timeRemaining / question.timeLimit) * 50);
        const streakBonus = this.state.streak * 25;
        
        const points = question.points + timeBonus + streakBonus;
        this.state.score += points;
        this.state.currentTeam.score += points;
        this.state.streak++;

        this.showNotification(`+${points} points! ${this.state.streak > 1 ? `${this.state.streak} streak!` : ''}`, 'success');
    }

    updateScore() {
        document.getElementById('team-score-display').querySelector('.score').textContent = this.state.currentTeam.score;
        this.updateLiveLeaderboard();
    }

    startTimer() {
        const timerDisplay = document.getElementById('timer-display');
        const timerCircle = document.querySelector('.timer-circle');
        
        this.state.timer = setInterval(() => {
            this.state.timeRemaining--;
            timerDisplay.textContent = this.state.timeRemaining;

            if (this.state.timeRemaining <= 5) {
                timerCircle.classList.add('warning');
            }

            if (this.state.timeRemaining <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.state.timer = null;
        }
        document.querySelector('.timer-circle').classList.remove('warning');
    }

    timeUp() {
        if (this.state.selectedAnswer === null) {
            this.showAnswerFeedback(false, this.state.questions[this.state.currentQuestionIndex].correctAnswer);
            this.showNotification('Time\'s up!', 'error');
        }
    }

    updateProgressBar() {
        const totalQuestions = Math.min(this.state.questions.length, this.state.gameSettings.questionCount);
        const progress = ((this.state.currentQuestionIndex + 1) / totalQuestions) * 100;
        document.getElementById('quiz-progress-fill').style.width = `${progress}%`;
    }

    showLiveLeaderboard() {
        document.getElementById('live-leaderboard').classList.add('active');
        this.updateLiveLeaderboard();
    }

    updateLiveLeaderboard() {
        const sortedTeams = [...this.state.teams].sort((a, b) => b.score - a.score);
        const liveRankings = document.getElementById('live-rankings');
        liveRankings.innerHTML = '';

        sortedTeams.forEach((team, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item';
            rankingItem.innerHTML = `
                <div class="ranking-position">${index + 1}</div>
                <div class="ranking-team">
                    <div class="ranking-team-name">${team.name}</div>
                    <div class="ranking-team-members">${team.members.length} members</div>
                </div>
                <div class="ranking-score">${team.score}</div>
            `;
            liveRankings.appendChild(rankingItem);
        });
    }

    endQuiz() {
        this.state.quizInProgress = false;
        this.stopTimer();
        document.getElementById('live-leaderboard').classList.remove('active');
        
        // Simulate final scores for other teams
        this.state.teams.forEach(team => {
            if (team.id !== this.state.currentTeam.id) {
                team.score += Math.floor(Math.random() * 300) + 200; // Make competition more realistic
            }
        });

        this.showScreen('results');
        this.renderFinalResults();
        this.addSystemMessage(`Quiz completed! Final score: ${this.state.currentTeam.score} points`);
    }

    renderFinalResults() {
        // Final leaderboard
        const sortedTeams = [...this.state.teams].sort((a, b) => b.score - a.score);
        const finalRankings = document.getElementById('final-rankings');
        finalRankings.innerHTML = '';

        sortedTeams.forEach((team, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item animate-slide-up';
            rankingItem.style.animationDelay = `${index * 0.1}s`;
            rankingItem.innerHTML = `
                <div class="ranking-position">${index + 1}</div>
                <div class="ranking-team">
                    <div class="ranking-team-name">${team.name}</div>
                    <div class="ranking-team-members">${team.members.map(m => m.name).join(', ')}</div>
                </div>
                <div class="ranking-score">${team.score}</div>
            `;
            finalRankings.appendChild(rankingItem);
        });

        // Team analytics
        const totalQuestions = Math.min(this.state.questions.length, this.state.gameSettings.questionCount);
        const correctAnswers = Math.floor((this.state.score / 100) * 0.7); // Estimate based on score
        const accuracy = Math.min(Math.round((correctAnswers / totalQuestions) * 100), 100);
        const avgResponseTime = (Math.random() * 3 + 1).toFixed(1);
        
        document.getElementById('accuracy-percentage').textContent = `${accuracy}%`;
        document.getElementById('avg-response-time').textContent = `${avgResponseTime}s`;
        document.getElementById('best-streak').textContent = this.state.streak.toString();
    }

    resetQuiz() {
        this.state.currentQuestionIndex = 0;
        this.state.score = 0;
        this.state.streak = 0;
        this.state.selectedAnswer = null;
        this.state.quizInProgress = false;
        
        if (this.state.currentTeam) {
            this.state.currentTeam.score = 0;
        }

        // Reset other teams' scores
        this.state.teams.forEach(team => {
            team.score = 0;
        });

        this.showScreen('lobby');
        this.updateLobbyUI();
        this.showNotification('Ready for another round!', 'success');
    }

    showNotification(message, type = 'info') {
        const notificationId = Date.now();
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.animationDelay = '0s';

        document.getElementById('notifications-container').appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new QuizArena();
});