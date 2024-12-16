window.addEventListener('DOMContentLoaded', () => {

    const interactivePaths = document.querySelectorAll('.interactive');
    interactivePaths.forEach(path => {
        path.addEventListener('click', function() {
            const state = this.getAttribute('data-state');
            if (state) {
                navigateToState(state);
            }
        });
    });

});

document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })
});