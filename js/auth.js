document.addEventListener('DOMContentLoaded', function() {
    // نمایش/مخفی کردن رمز عبور
    const showPasswordBtns = document.querySelectorAll('.show-password');
    
    showPasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.input-icon').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // اعتبارسنجی فرم ورود
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!email || !password) {
                alert('لطفا ایمیل و رمز عبور را وارد کنید');
                return false;
            }
            
            // در اینجا می‌توانید اطلاعات را به سرور ارسال کنید
            console.log('ورود با:', { email, password });
            
            // ریدایرکت به صفحه اصلی بعد از ورود موفق
            window.location.href = 'index.html';
        });
    }
    
    // اعتبارسنجی فرم ثبت‌نام
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();
            
            if (!fullname || !email || !password || !confirmPassword) {
                alert('لطفا تمام فیلدها را پر کنید');
                return false;
            }
            
            if (password !== confirmPassword) {
                alert('رمز عبور و تکرار آن مطابقت ندارند');
                return false;
            }
            
            if (password.length < 6) {
                alert('رمز عبور باید حداقل 6 کاراکتر باشد');
                return false;
            }
            
            // در اینجا می‌توانید اطلاعات را به سرور ارسال کنید
            console.log('ثبت‌نام با:', { fullname, email, password });
            
            // ریدایرکت به صفحه ورود بعد از ثبت‌نام موفق
            alert('ثبت‌نام با موفقیت انجام شد. لطفا وارد شوید.');
            window.location.href = 'login.html';
        });
    }
});