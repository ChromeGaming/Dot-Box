document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('sign-in-form');
    const signUpForm = document.getElementById('sign-up-form');

    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            signIn();
        });
    }

    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            signUp();
        });
    }

    checkAuth();
});

function signIn() {
    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    if (validateEmail(email) && validatePassword(password)) {
        fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token);
                alert('Sign-in successful');
                showGameElements();
            } else {
                alert('Sign-in failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during sign-in.');
        });
    } else {
        alert('Please enter a valid email and password.');
    }
}

function signUp() {
    const username = document.getElementById('sign-up-username').value;
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;

    if (validateEmail(email) && validatePassword(password)) {
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Sign-up successful');
                toggleForms();
            } else {
                alert('Sign-up failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during sign-up.');
        });
    } else {
        alert('Please enter a valid username, email, and password.');
    }
}

function recoverPassword() {
    const email = document.getElementById('recovery-email').value;

    if (validateEmail(email)) {
        fetch('/api/recover', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Password recovery email sent');
                closePasswordRecovery();
            } else {
                alert('Password recovery failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during password recovery.');
        });
    } else {
        alert('Please enter a valid email.');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.length >= 6;
}

function checkAuth() {
    if (localStorage.getItem('token')) {
        fetch('/api/protected', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.ok) {
                showGameElements();
            } else {
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '/';
        });
    }
}

function showGameElements() {
    document.querySelector('.auth-forms').classList.add('hidden');
    document.querySelectorAll('.settings, .players, .player-turn, .board').forEach(el => el.classList.remove('hidden'));
}

function showPasswordRecovery() {
    document.getElementById('password-recovery-modal').style.display = 'block';
}

function closePasswordRecovery() {
    document.getElementById('password-recovery-modal').style.display = 'none';
}

function toggleForms() {
    const signInForm = document.getElementById('sign-in-form');
    const signUpForm = document.getElementById('sign-up-form');
    if (signInForm.style.display === 'none') {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    }
}
