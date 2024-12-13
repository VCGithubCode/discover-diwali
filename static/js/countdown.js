class DiwaliCountdown {
    constructor() {
        this.daysEl = document.getElementById('days');
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        this.messageEl = document.getElementById('festival-message');
        this.countdownContainer = document.querySelector('.countdown-container');

        this.diwaliDates = {
            2025: {
                dhanteras: new Date(2025, 9, 20),
                narakaChaturdasi: new Date(2025, 9, 21),
                lakshmiPuja: new Date(2025, 9, 22),
                govardhanPuja: new Date(2025, 9, 23),
                bhaiDooj: new Date(2025, 9, 24),
                end: new Date(2025, 9, 25),
            },
            2026: {
                dhanteras: new Date(2026, 10, 8),
                narakaChaturdasi: new Date(2026, 10, 9),
                lakshmiPuja: new Date(2026, 10, 10),
                govardhanPuja: new Date(2026, 10, 11),
                bhaiDooj: new Date(2026, 10, 12),
                end: new Date(2026, 10, 13),
            },
        };

        this.festivalMessages = {
            dhanteras: "Welcome to Dhanteras!",
            narakaChaturdasi: "Happy Choti Diwali!",
            lakshmiPuja: "Happy Diwali!",
            govardhanPuja: "Happy Govardhan Puja!",
            bhaiDooj: "Happy Bhai Dooj!",
        };

        this.init();
    }

    init() {
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentDates = this.diwaliDates[currentYear] || this.diwaliDates[2025];

        let currentFestival = null;
        for (const [festival, date] of Object.entries(currentDates)) {
            if (now >= date && now < currentDates.end) {
                if (festival !== 'end') {
                    currentFestival = festival;
                }
                break;
            }
        }

        if (currentFestival) {
            this.showFestivalMessage(currentFestival);
            this.countdownContainer.classList.add('celebrating');
        } else {
            const nextDiwali = new Date(currentYear + 1, 9, 20);
            const diff = this.getTimeRemaining(nextDiwali);
            this.updateCountdown(diff);
            this.messageEl.textContent = "Counting down to Diwali...";
        }
    }

    getTimeRemaining(endDate) {
        const total = endDate.getTime() - new Date().getTime();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return { total, days, hours, minutes, seconds };
    }

    updateCountdown({ days, hours, minutes, seconds }) {
        this.daysEl.textContent = days.toString().padStart(2, '0');
        this.hoursEl.textContent = hours.toString().padStart(2, '0');
        this.minutesEl.textContent = minutes.toString().padStart(2, '0');
        this.secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    showFestivalMessage(festival) {
        if (this.messageEl.textContent !== this.festivalMessages[festival]) {
            this.messageEl.style.opacity = '0';
            requestAnimationFrame(() => {
                this.messageEl.textContent = this.festivalMessages[festival];
                this.messageEl.style.opacity = '1';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DiwaliCountdown();
});
