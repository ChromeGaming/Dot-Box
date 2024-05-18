function setBackgroundVideo(videoSrc) {
    const videoElement = document.querySelector('video.back');
    videoElement.querySelector('source').setAttribute('src', videoSrc);
    videoElement.load();
    videoElement.play();
}

document.getElementById('theme-button').addEventListener('click', () => {
    const themeOptions = document.getElementById('theme-options');
    if (themeOptions.style.visibility === 'hidden' || themeOptions.style.visibility === '') {
        themeOptions.style.visibility = 'visible';
    } else {
        themeOptions.style.visibility = 'hidden';
    }
});

document.querySelectorAll('.theme-option').forEach(button => {
    button.addEventListener('click', (event) => {
        const videoSrc = `./background/${event.target.getAttribute('data-video')}`;
        setBackgroundVideo(videoSrc);

        // Save selected video in localStorage to persist the theme
        localStorage.setItem('selectedTheme', videoSrc);
        localStorage.setItem('selectedThemeName', event.target.innerText);

        // Remove 'selected' class from all theme options
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add 'selected' class to the clicked option
        event.target.classList.add('selected');

        // Hide theme options after selection
        document.getElementById('theme-options').style.visibility = 'hidden';
    });
});

// Check localStorage for saved theme and apply it
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedThemeName = localStorage.getItem('selectedThemeName');
    if (savedTheme) {
        setBackgroundVideo(savedTheme);
        document.querySelectorAll('.theme-option').forEach(option => {
            if (option.innerText === savedThemeName) {
                option.classList.add('selected');
            }
        });
    }
});
