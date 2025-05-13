// تغییر حالت دارک/لایت
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // بررسی حالت ذخیره شده در localStorage
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(savedTheme);
    
    // تنظیم آیکون مناسب بر اساس حالت فعلی
    if (savedTheme === 'dark-mode') {
        document.querySelector('.dark-icon').style.display = 'none';
        document.querySelector('.light-icon').style.display = 'block';
    } else {
        document.querySelector('.dark-icon').style.display = 'block';
        document.querySelector('.light-icon').style.display = 'none';
    }
    
    // تغییر حالت با کلیک روی دکمه
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');
            
            // تغییر آیکون
            const darkIcon = document.querySelector('.dark-icon');
            const lightIcon = document.querySelector('.light-icon');
            
            if (body.classList.contains('dark-mode')) {
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'block';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                darkIcon.style.display = 'block';
                lightIcon.style.display = 'none';
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }
    
    // منوی جمع‌شونده در دسکتاپ
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    const collapsedSidebar = document.querySelector('.collapsed-sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (collapseBtn && sidebar && collapsedSidebar && mainContent) {
        collapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            collapsedSidebar.classList.toggle('active');
            mainContent.classList.toggle('expanded');
            
            // تغییر آیکون
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            } else {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            }
            
            // ذخیره حالت در localStorage
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
        
        // بررسی حالت ذخیره شده
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            collapsedSidebar.classList.add('active');
            mainContent.classList.add('expanded');
            collapseBtn.querySelector('i').classList.remove('fa-chevron-right');
            collapseBtn.querySelector('i').classList.add('fa-chevron-left');
        }
    }
});