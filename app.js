class PomodoroTimer {
    constructor() {
        this.selectedTime = null;
        this.timeRemaining = 0;
        this.timerInterval = null;
        this.isRunning = false;

        this.startScreen = document.getElementById('start-screen');
        this.timerScreen = document.getElementById('timer-screen');
        this.completionScreen = document.getElementById('completion-screen');
        this.timerDisplay = document.getElementById('timer');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.completionStopBtn = document.getElementById('completion-stop-btn');
        this.balloons = document.querySelectorAll('.balloon');
        this.timerCompleteSound = document.getElementById('timer-complete');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.balloons.forEach(balloon => {
            balloon.addEventListener('click', () => {
                this.selectBalloon(balloon);
            });
        });

        this.startBtn.addEventListener('click', () => {
            if (this.selectedTime) {
                this.startTimer();
            }
        });

        this.stopBtn.addEventListener('click', () => {
            this.stopTimer();
        });

        this.completionStopBtn.addEventListener('click', () => {
            this.timerCompleteSound.pause();
            this.timerCompleteSound.currentTime = 0;
            this.completionScreen.classList.add('hidden');
            this.startScreen.classList.remove('hidden');
        });
    }

    selectBalloon(balloon) {
        this.balloons.forEach(b => b.classList.remove('selected'));
        balloon.classList.add('selected');
        this.selectedTime = parseInt(balloon.dataset.minutes);
    }

    startTimer() {
        this.timeRemaining = this.selectedTime * 60;
        this.startScreen.classList.add('hidden');
        this.timerScreen.classList.remove('hidden');

        this.isRunning = true;
        const initialMinutes = this.selectedTime;
        document.getElementById('minutes-tens').textContent = Math.floor(initialMinutes / 10);
        document.getElementById('minutes-ones').textContent = initialMinutes % 10;
        document.getElementById('seconds-tens').textContent = '0';
        document.getElementById('seconds-ones').textContent = '0';

        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining <= 0) {
                this.timerComplete();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.selectedTime = null;
        this.balloons.forEach(b => b.classList.remove('selected'));

        if (!this.completionScreen.classList.contains('hidden')) {
            return;
        }

        this.timerScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;

        document.getElementById('minutes-tens').textContent = Math.floor(minutes / 10);
        document.getElementById('minutes-ones').textContent = minutes % 10;
        document.getElementById('seconds-tens').textContent = Math.floor(seconds / 10);
        document.getElementById('seconds-ones').textContent = seconds % 10;
    }

    timerComplete() {
        this.timerCompleteSound.play();
        this.timerScreen.classList.add('hidden');
        this.completionScreen.classList.remove('hidden');
        clearInterval(this.timerInterval);
        this.isRunning = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pomodoro = new PomodoroTimer();
});