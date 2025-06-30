document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const passwordError = document.getElementById('passwordError');

    const validUsers = [
        { username: "admin", password: "sman1buru75" }
    ];

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

        const isValidUser = validUsers.some(user => 
            user.username === username && user.password === password
        );

        if(isValidUser) {

            alert('Login berhasil!');
            window.location.href = "fauzi.html";
        } else {

            passwordError.style.display = 'block';
            passwordInput.value = '';
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
