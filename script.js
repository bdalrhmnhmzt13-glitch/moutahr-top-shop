// تصفية الأقسام
function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.cat-btn');
    const categorySections = document.querySelectorAll('.category-section');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            if (category === 'all') {
                // إظهار جميع الأقسام
                categorySections.forEach(section => {
                    section.style.display = 'block';
                });
                // التمرير للأعلى
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // إخفاء جميع الأقسام
                categorySections.forEach(section => {
                    section.style.display = 'none';
                });
                // إظهار القسم المختار فقط
                const targetSection = document.getElementById(category);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    // التمرير للقسم المختار
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// تفعيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setupCategoryFilter();
    updateCart();
});
