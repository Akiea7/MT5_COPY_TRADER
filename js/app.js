// دالة لتحميل الصفحات ديناميكياً
async function loadPage(pageName, pageTitle) {
    const contentDiv = document.getElementById('app-content');
    const titleElement = document.getElementById('page-title');
    
    try {
        // جلب ملف الـ HTML المطلوب
        const response = await fetch(`views/${pageName}.html`);
        if (!response.ok) throw new Error('الصفحة غير موجودة');
        
        const html = await response.text();
        contentDiv.innerHTML = html;
        
        // تحديث عنوان الصفحة في الشريط العلوي
        titleElement.textContent = pageTitle;
        
        // تحديث حالة الأزرار في الشريط السفلي
        updateNavButtons(pageName);
        
    } catch (error) {
        contentDiv.innerHTML = `<div class="text-center text-danger mt-10">
            <i class="fa-solid fa-triangle-exclamation text-4xl mb-3"></i>
            <p>حدث خطأ أثناء تحميل الصفحة. يرجى التأكد من وجود ملف ${pageName}.html</p>
        </div>`;
        console.error(error);
    }
}

// دالة لتغيير لون الزر النشط في الشريط السفلي
function updateNavButtons(activeTarget) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-target') === activeTarget) {
            btn.classList.add('text-blue-500');
            btn.classList.remove('text-gray-500', 'hover:text-blue-400');
        } else {
            btn.classList.remove('text-blue-500');
            btn.classList.add('text-gray-500', 'hover:text-blue-400');
        }
    });
}

// تحميل الصفحة الرئيسية تلقائياً عند فتح التطبيق
document.addEventListener('DOMContentLoaded', () => {
    loadPage('home', 'MT5 Copy Trader');
});
