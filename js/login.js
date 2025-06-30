document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const passwordError = document.getElementById('passwordError');
    const rememberCheckbox = document.getElementById('remember');

    // Daftar user valid (hanya admin)
    const validUsers = [
        { username: "admin", password: "sman1buru75" }
    ];

    // Cek jika ada data login yang disimpan
    if(localStorage.getItem('rememberedUser')) {
        const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
        usernameInput.value = rememberedUser.username;
        passwordInput.value = rememberedUser.password;
        rememberCheckbox.checked = true;
    }

    // Toggle show/hide password
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberCheckbox.checked;

        // Validasi login
        const isValidUser = validUsers.some(user => 
            user.username === username && user.password === password
        );

        if(isValidUser) {
            // Jika remember me dicentang, simpan ke localStorage
            if(rememberMe) {
                const userToRemember = { username, password };
                localStorage.setItem('rememberedUser', JSON.stringify(userToRemember));
            } else {
                localStorage.removeItem('rememberedUser');
            }

            // Langsung redirect tanpa alert
            window.location.href = "fauzi.html";
        } else {
            // Tampilkan pesan error
            passwordError.style.display = 'block';
            passwordInput.focus();
            
            // Hilangkan pesan error setelah 3 detik
            setTimeout(() => {
                passwordError.style.display = 'none';
            }, 3000);
        }
    });

    // Validasi real-time saat mengetik
    passwordInput.addEventListener('input', function() {
        passwordError.style.display = 'none';
    });
});
