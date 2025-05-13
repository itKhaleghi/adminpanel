document.addEventListener('DOMContentLoaded', function() {
    // منوی همبرگر ثابت برای همه حالت‌ها
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // نمایش/مخفی کردن منو
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }
    
    // بستن منو وقتی روی محتوا کلیک می‌شود
    document.addEventListener('click', function() {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // جلوگیری از بسته شدن منو وقتی روی خود منو کلیک می‌شود
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // سیستم تب‌ها
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // حذف کلاس active از همه دکمه‌ها و تب‌ها
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // اضافه کردن کلاس active به تب و دکمه مربوطه
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // نمایش درختی دسته‌بندی‌ها
    const treeToggles = document.querySelectorAll('.tree-toggle');
    
    treeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('collapsed');
        });
    });
    
    // اعتبارسنجی فرم دسته‌بندی
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const categoryName = document.getElementById('category-name').value.trim();
            
            if (!categoryName) {
                alert('لطفا نام دسته‌بندی را وارد کنید');
                return false;
            }
            
            // در اینجا می‌توانید اطلاعات فرم را به سرور ارسال کنید
            console.log('دسته‌بندی جدید:', {
                name: categoryName,
                parent: document.getElementById('category-parent').value,
                description: document.getElementById('category-desc').value.trim()
            });
            
            // ریست فرم
            this.reset();
            alert('دسته‌بندی با موفقیت ایجاد شد');
        });
    }
    
    // تغییر سایز صفحه
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
        } else {
            // در حالت موبایل، دکمه همبرگر را نمایش دهید
            menuToggle.style.display = 'flex';
        }
    });
    
    // مقداردهی اولیه برای چک کردن سایز صفحه
    if (window.innerWidth <= 992) {
        menuToggle.style.display = 'flex';
    }
});

//حالت نوار کنار در دیکتاپ
document.getElementById('toggle-menu').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('sidebar-mini');
    
    // ذخیره وضعیت در LocalStorage
    localStorage.setItem('menuState', sidebar.classList.contains('sidebar-mini') ? 'mini' : 'full');
});

// بررسی وضعیت ذخیره‌شده
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    if (localStorage.getItem('menuState') === 'mini') {
        sidebar.classList.add('sidebar-mini');
    }
});