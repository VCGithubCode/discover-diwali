// Font Switch for Dyslexic Font
const fontSwitch = document.getElementById('fontSwitch1');

fontSwitch.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dyslexic-font');
    } else {
        document.body.classList.remove('dyslexic-font');
    }
});

// Font Size Adjustment
const fontSizeOptions = document.querySelectorAll('.font-size-option');

fontSizeOptions.forEach(option => {
    option.addEventListener('change', function () {
        document.body.style.fontSize = '';
        if (this.value === 'small') {
            document.body.style.fontSize = '14px';
        } else if (this.value === 'medium') {
            document.body.style.fontSize = '16px';
        } else if (this.value === 'large') {
            document.body.style.fontSize = '18px';
        }
    });
});