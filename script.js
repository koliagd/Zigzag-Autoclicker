class ZigzagAutoclicker {
    constructor() {
        this.isRunning = false;
        this.intervalId = null;
        this.init();
    }

    init() {
        this.keySelect = document.getElementById('keySelect');
        this.delayInput = document.getElementById('delayInput');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.status = document.getElementById('status');

        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());

        // Горячие клавиши
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F6') {
                e.preventDefault();
                this.start();
            } else if (e.key === 'F7') {
                e.preventDefault();
                this.stop();
            }
        });
    }

    start() {
        if (this.isRunning) return;

        const delay = parseFloat(this.delayInput.value);
        if (isNaN(delay) || delay < 0.1) {
            alert('Пожалуйста, введите корректную задержку (минимум 0.1 мс)');
            return;
        }

        this.isRunning = true;
        this.status.textContent = 'Автокликер активен';
        this.status.style.background = 'rgba(76, 175, 80, 0.3)';

        const button = this.keySelect.value;
        this.intervalId = setInterval(() => {
            this.simulateClick(button);
        }, delay);
    }

    stop() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.intervalId);
        this.status.textContent = 'Автокликер остановлен';
        this.status.style.background = 'rgba(244, 67, 54, 0.3)';
        
        // Через 2 секунды возвращаем обычный статус
        setTimeout(() => {
            if (!this.isRunning) {
                this.status.textContent = 'Готов к работе';
                this.status.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        }, 2000);
    }

    simulateClick(button) {
        const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: this.getButtonCode(button)
        });

        // Отправляем событие на активный элемент
        if (document.activeElement) {
            document.activeElement.dispatchEvent(event);
        }
    }

    getButtonCode(button) {
        switch (button) {
            case 'left': return 0;
            case 'middle': return 1;
            case 'right': return 2;
            default: return 0;
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ZigzagAutoclicker();
});
