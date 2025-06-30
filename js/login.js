document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const passwordError = document.getElementById('passwordError');
    const rememberCheckbox = document.getElementById('remember');

    const validUsers = [
        { username: "admin", password: "sman1buru75" }
    ];

    if(localStorage.getItem('rememberedUser')) {
        const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
        usernameInput.value = rememberedUser.username;
        passwordInput.value = rememberedUser.password;
        rememberCheckbox.checked = true;
    }

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberCheckbox.checked;

        const isValidUser = validUsers.some(user => 
            user.username === username && user.password === password
        );

        if(isValidUser) {
            if(rememberMe) {
                const userToRemember = { username, password };
                localStorage.setItem('rememberedUser', JSON.stringify(userToRemember));
            } else {
                localStorage.removeItem('rememberedUser');
            }

            alert('Login berhasil!');
            window.location.href = "fauzi.html";
        } else {
            passwordError.style.display = 'block';
            passwordInput.focus();

            setTimeout(() => {
                passwordError.style.display = 'none';
            }, 3000);
        }
    });

    passwordInput.addEventListener('input', function() {
        passwordError.style.display = 'none';
    });
});