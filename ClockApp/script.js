class DigitalClock {
    constructor() {
        this.timeElement = document.getElementById('time');
        this.dateElement = document.getElementById('date');
        this.toggleFormatBtn = document.getElementById('toggleFormat');
        this.toggleThemeBtn = document.getElementById('toggleTheme');
        
        this.is24HourFormat = true;
        this.isDarkTheme = false;
        
        this.init();
    }
    
    init() {
        this.updateClock();
        this.setupEventListeners();
        
        // Update clock every second
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }
    
    setupEventListeners() {
        this.toggleFormatBtn.addEventListener('click', () => {
            this.toggleTimeFormat();
        });
        
        this.toggleThemeBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    updateClock() {
        const now = new Date();
        
        // Update time
        const timeString = this.formatTime(now);
        this.timeElement.textContent = timeString;
        
        // Update date
        const dateString = this.formatDate(now);
        this.dateElement.textContent = dateString;
    }
    
    formatTime(date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        let ampm = '';
        
        if (!this.is24HourFormat) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
        }
        
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}${ampm}`;
    }
    
    formatDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return date.toLocaleDateString('en-US', options);
    }
    
    toggleTimeFormat() {
        this.is24HourFormat = !this.is24HourFormat;
        this.updateClock();
        
        // Add visual feedback
        this.toggleFormatBtn.style.background = 'rgba(255, 255, 255, 0.4)';
        setTimeout(() => {
            this.toggleFormatBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 200);
    }
    
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.classList.toggle('dark', this.isDarkTheme);
        
        // Add visual feedback
        this.toggleThemeBtn.style.background = 'rgba(255, 255, 255, 0.4)';
        setTimeout(() => {
            this.toggleThemeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 200);
    }
}

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
});

// Add some fun effects
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    const clockContainer = document.querySelector('.clock-container');
    clockContainer.style.opacity = '0';
    clockContainer.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        clockContainer.style.transition = 'all 0.5s ease';
        clockContainer.style.opacity = '1';
        clockContainer.style.transform = 'scale(1)';
    }, 100);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.key === 't' || event.key === 'T') {
        document.getElementById('toggleFormat').click();
    }
    if (event.key === 'd' || event.key === 'D') {
        document.getElementById('toggleTheme').click();
    }
});