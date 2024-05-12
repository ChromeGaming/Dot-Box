// dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle-checkbox');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});
