/**
 * A class that handles the countdown and festival messages for Diwali.
 *
 * @class DiwaliCountdown
 */
class DiwaliCountdown {
    /**
     * Initializes the countdown.
     *
     * @constructor
     */
    constructor() {
        // Cache DOM elements and add error handling
        const elements = ['days', 'hours', 'minutes', 'seconds', 'festival-message'].reduce((acc, id) => {
            const element = document.getElementById(id);
            if (!element) {
                throw new Error(`Required element #${id} not found`);
            }
            acc[id] = element;
            return acc;
        }, {});

        this.daysEl = elements.days;
        this.hoursEl = elements.hours;
        this.minutesEl = elements.minutes;
        this.secondsEl = elements.seconds;
        this.messageEl = elements['festival-message'];
        this.countdownContainer = document.querySelector('.countdown-container');

        // Month is 0-based in JavaScript (9 = October, 10 = November)
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
            dhanteras: "Welcome to Dhanteras! Today we celebrate new beginnings! Watch for twinkling lights! ",
            narakaChaturdasi: "It's Choti Diwali! Time to light beautiful diyas and make rangoli! ",
            lakshmiPuja: "Happy Diwali! Today we celebrate with lights, sweets, and family fun! ",
            govardhanPuja: "Happy Govardhan Puja! Time to thank nature for its gifts! ",
            bhaiDooj: "Happy Bhai Dooj! Celebrating the special bond between brothers and sisters! "
        };

        // Performance optimization: Cache the animation frame request
        this.animationFrameId = null;
        this.intervalId = null;

        this.init();
    }

    /**
     * Initializes the countdown.
     */
    init() {
        // Initial update
        this.update();

        // Only run interval when tab is visible
        this.intervalId = setInterval(() => {
            if (!document.hidden) {
                this.update();
            }
        }, 1000);

        // Handle tab visibility changes
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    /**
     * Handles tab visibility changes.
     */
    handleVisibilityChange() {
        if (!document.hidden) {
            this.update(); // Immediate update when tab becomes visible
        }
    }

    /**
     * Returns the next available Diwali date.
     *
     * @param {number} currentYear The current year.
     * @returns {Date} The next available Diwali date or null.
     */
    getNextDiwaliDate(currentYear) {
        // Get the next available Diwali date
        let year = currentYear;
        while (!this.diwaliDates[year]) {
            year++;
            // Prevent infinite loop
            if (year > currentYear + 10) return null;
        }
        return this.diwaliDates[year].dhanteras;
    }

    /**
     * Updates the countdown.
     */
    update() {
        // Use simulated date for testing or real current date
        const now = this.simulatedDate || new Date(); // Simulate date for testing here Example: new Date(2025, 9, 20);
        const currentYear = now.getFullYear();
        const currentDates = this.diwaliDates[currentYear] || this.diwaliDates[2025];

        let currentFestival = null;
        
        // Check each festival date
        const festivals = Object.entries(currentDates);
        for (let i = 0; i < festivals.length - 1; i++) {
            const [festival, startDate] = festivals[i];
            const endDate = festivals[i + 1][1];
            
            if (now >= startDate && now < endDate) {
                currentFestival = festival;
                break;
            }
        }

        if (currentFestival) {
            this.showFestivalMessage(currentFestival);
            this.countdownContainer.classList.add('celebrating');
        } else {
            this.countdownContainer.classList.remove('celebrating');
            const nextDiwali = this.getNextDiwaliDate(currentYear);
            if (nextDiwali) {
                const diff = this.getTimeRemaining(nextDiwali);
                this.updateCountdown(diff);
                this.messageEl.textContent = "Counting down to the magical festival of Diwali... ";
            } else {
                this.messageEl.textContent = "Future Diwali dates not available";
            }
        }
    }

    /**
     * Returns the time remaining until the given date.
     *
     * @param {Date} endDate The date to calculate the remaining time for.
     * @returns {Object} An object with the remaining time in various units.
     */
    getTimeRemaining(endDate) {
        const total = endDate.getTime() - Date.now();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return { total, days, hours, minutes, seconds };
    }

    /**
     * Updates the countdown display.
     *
     * @param {Object} diff The time remaining until the next festival.
     */
    updateCountdown({ days, hours, minutes, seconds }) {
        // Batch DOM updates
        requestAnimationFrame(() => {
            this.daysEl.textContent = days.toString().padStart(2, '0');
            this.hoursEl.textContent = hours.toString().padStart(2, '0');
            this.minutesEl.textContent = minutes.toString().padStart(2, '0');
            this.secondsEl.textContent = seconds.toString().padStart(2, '0');
        });
    }

    /**
     * Shows a festival message.
     *
     * @param {string} festival The festival to show a message for.
     */
    showFestivalMessage(festival) {
        if (this.messageEl.textContent !== this.festivalMessages[festival]) {
            this.messageEl.style.opacity = '0';
            
            // Cancel any existing animation frame
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
            }

            this.animationFrameId = requestAnimationFrame(() => {
                this.messageEl.textContent = this.festivalMessages[festival];
                this.messageEl.style.opacity = '1';
                this.animationFrameId = null;
            });
        }
    }

    /**
     * Cleans up the countdown.
     */
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Initialize with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.diwaliCountdown = new DiwaliCountdown();
    } catch (error) {
        console.error('Failed to initialize Diwali countdown:', error);
    }
});
