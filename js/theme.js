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

const backgroundVideo = document.getElementById('background-video');
const toggleButton = document.getElementById('toggle-background');
const backgroundVideos = [
    './background/back3.mp4',
    './background/back4.mp4',
    './background/back5.mp4'
];
let currentIndex = 1; // Start from index 1, which is back4

// Function to toggle background video
function toggleBackground() {
    currentIndex = (currentIndex + 1) % backgroundVideos.length;
    backgroundVideo.src = backgroundVideos[currentIndex];
    backgroundVideo.play();
}

// Add event listener to toggle background button
toggleButton.addEventListener('click', toggleBackground);


// Add event listener for theme button to toggle visibility of theme options
document.getElementById('theme-button').addEventListener('click', () => {
    const themeOptions = document.getElementById('theme-options');
    if (themeOptions.style.visibility === 'hidden' || themeOptions.style.visibility === '') {
        themeOptions.style.visibility = 'visible';
    } else {
        themeOptions.style.visibility = 'hidden';
    }
});

