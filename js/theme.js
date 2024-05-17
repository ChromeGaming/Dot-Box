// Function to ensure background video stays consistent
function setBackgroundVideo(videoSrc) {
    const videoElement = document.querySelector('video.back');
    videoElement.querySelector('source').setAttribute('src', videoSrc);
    videoElement.load();
    videoElement.play();
}

// Function to handle theme option button clicks
function handleThemeOptionClick(event) {
    const videoSrc = `./background/${event.target.getAttribute('data-video')}`;
    setBackgroundVideo(videoSrc);

    // Save selected video in localStorage to persist the theme
    localStorage.setItem('selectedTheme', videoSrc);
}

// Attach event listeners directly to theme options buttons
document.querySelectorAll('.theme-option').forEach(button => {
    button.addEventListener('click', handleThemeOptionClick);
});

// Check localStorage for saved theme and apply it
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setBackgroundVideo(savedTheme);
    }
});

// Add event listener for theme button to toggle visibility of theme options
document.getElementById('theme-button').addEventListener('click', () => {
    const themeOptions = document.getElementById('theme-options');
    if (themeOptions.style.visibility === 'hidden' || themeOptions.style.visibility === '') {
        themeOptions.style.visibility = 'visible';
    } else {
        themeOptions.style.visibility = 'hidden';
    }
});

