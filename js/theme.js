/**
 * سیستم مدیریت حالت تاریک/روشن
 * نسخه 2.0 - دارای قابلیت‌های:
 * - تغییر حالت با انیمیشن
 * - ذخیره حالت در localStorage
 * - پشتیبانی از اولویت سیستم
 * - همگام‌سازی چند دکمه
 * - مدیریت کلاس‌های مربوطه
 */

document.addEventListener('DOMContentLoaded', function() {
    // عناصر اصلی
    const themeToggles = document.querySelectorAll('.theme-toggle-checkbox');
    const darkTheme = document.getElementById('dark-theme');
    const body = document.body;
    
    // بررسی اولویت سیستم
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // بررسی حالت ذخیره شده یا استفاده از اولویت سیستم
    let savedTheme = localStorage.getItem('theme');
    
    // اگر حالت ذخیره شده وجود نداشت از اولویت سیستم استفاده کن
    if (!savedTheme) {
        savedTheme = systemPrefersDark ? 'dark' : 'light';
        localStorage.setItem('theme', savedTheme);
    }
    
    // اعمال حالت اولیه
    if (savedTheme === 'dark') {
        enableDarkMode(true);
    } else {
        enableLightMode(true);
    }
    
    // رویداد تغییر برای تمام دکمه‌ها
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        });
    });
    
    // نظارت بر تغییرات اولویت سیستم
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        }
    });
    
    // فعال کردن حالت تاریک
    function enableDarkMode(initialLoad = false) {
        // اعمال تغییرات ظاهری
        if (!initialLoad) {
            document.documentElement.style.setProperty('--transition-time', '0.3s');
            body.style.transition = 'background-color 0.3s ease';
        }
        
        darkTheme.disabled = false;
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        
        // به‌روزرسانی تمام دکمه‌ها
        themeToggles.forEach(toggle => {
            toggle.checked = true;
        });
        
        // انتشار رویداد سفارشی
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: 'dark' }));
    }
    
    // فعال کردن حالت روشن
    function enableLightMode(initialLoad = false) {
        // اعمال تغییرات ظاهری
        if (!initialLoad) {
            document.documentElement.style.setProperty('--transition-time', '0.3s');
            body.style.transition = 'background-color 0.3s ease';
        }
        
        darkTheme.disabled = true;
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        
        // به‌روزرسانی تمام دکمه‌ها
        themeToggles.forEach(toggle => {
            toggle.checked = false;
        });
        
        // انتشار رویداد سفارشی
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: 'light' }));
    }
    
    // تابع کمکی برای تغییر سیستماتیک تم
    window.changeTheme = function(theme) {
        if (theme === 'dark') {
            enableDarkMode();
        } else if (theme === 'light') {
            enableLightMode();
        } else {
            // حالت خودکار بر اساس اولویت سیستم
            if (systemPrefersDark) {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        }
    };
    
    // تابع کمکی برای دریافت حالت فعلی
    window.getCurrentTheme = function() {
        return body.classList.contains('dark-mode') ? 'dark' : 'light';
    };
});

// رویداد سفارشی برای تغییر تم
document.addEventListener('themeChanged', function(e) {
    console.log('تم تغییر کرد به:', e.detail);
    // اینجا می‌توانید کدهای دیگری که باید با تغییر تم اجرا شوند را اضافه کنید
});