// متغيرات السلة
let cart = [];
let total = 0;

// ==================== 🛒 دوال السلة ====================

// عرض/إخفاء السلة
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    console.log('🛒 toggleCart called - Element:', cartSidebar);
    
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        console.log('✅ السلة:', cartSidebar.classList.contains('active') ? 'مفتوحة' : 'مغلقة');
    } else {
        console.error('❌ لم يتم العثور على عنصر سلة التسوق');
    }
}

// إضافة منتج للسلة
function addToCart(name, price) {
    console.log('🛍️ إضافة منتج:', name, price);
    
    // البحث إذا المنتج موجود مسبقاً
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('✅ تم إضافة المنتج للسلة');
    
    // فتح السلة تلقائياً بعد الإضافة
    setTimeout(() => {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && !cartSidebar.classList.contains('active')) {
            cartSidebar.classList.add('active');
        }
    }, 300);
}

// تحديث عرض السلة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    console.log('🔄 تحديث السلة - العناصر:', cartItems, cartCount, cartTotal);
    
    if (!cartItems || !cartCount || !cartTotal) {
        console.error('❌ عناصر السلة غير موجودة في HTML');
        return;
    }
    
    // تحديث العدد
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // تحديث العناصر
    cartItems.innerHTML = '';
    total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">السلة فارغة</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <br>
                    <small>$${item.price} × ${item.quantity}</small>
                </div>
                <div class="cart-item-actions">
                    <strong>$${itemTotal}</strong>
                    <button class="remove-btn" onclick="removeFromCart(${index})" title="إزالة المنتج">
                        ✕
                    </button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
    }
    
    // تحديث المجموع
    cartTotal.textContent = `المجموع: $${total}`;
}

// إزالة منتج من السلة
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        updateCart();
        showNotification(`🗑️ تم إزالة ${removedItem.name} من السلة`);
    }
}

// ==================== 📱 دوال الواتساب ====================

// إرسال الطلب للواتساب
function sendToWhatsApp() {96364659342
    if (cart.length === 0) {
        showNotification('❌ السلة فارغة! أضف منتجات أولاً');
        return;
    }
    
    // تحضير نص الطلب
    let orderText = `🎯 *طلب جديد من متجر Top للشحن التطبيقات* 🎯\n\n`;
    orderText += `📦 *تفاصيل الطلب:*\n`;
    orderText += `────────────────────\n`;
    
    cart.forEach(item => {
        orderText += `🛍️ *${item.name}*\n`;
        orderText += `💰 السعر: $${item.price}\n`;
        orderText += `📦 الكمية: ${item.quantity}\n`;
        orderText += `🔢 المجموع: $${item.price * item.quantity}\n`;
        orderText += `────────────────────\n`;
    });
    
    orderText += `\n💰 *المجموع الكلي: $${total}*\n\n`;
    orderText += `👤 *معلومات العميل:*\n`;
    orderText += `الاسم: _________\n`;
    orderText += `الهاتف: _________\n\n`;
    orderText += `📍 *عنوان التوصيل:*\n________________\n\n`;
    orderText += `⚡ *شكراً لاختياركم متجرنا* 🚀`;
    
    // ترميز النص للرابط
    const encodedText = encodeURIComponent(orderText);
    
    // رقم الواتساب - غير هذا الرقم لرقمك الحقيقي
    const phoneNumber = '963964659342'; // 🔄 غير هذا الرقم
    
    // فتح الواتساب
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${https://wa.me/message/AI3MMIEL5HIEN1}`;
    console.log('📞 رابط الواتساب:', https://wa.me/message/AI3MMIEL5HIEN1);
    window.open(whatsappUrl, '_blank');
    
    // تفريغ السلة بعد الإرسال
    cart = [];
    updateCart();
    toggleCart();
    
    showNotification('📱 تم فتح الواتساب لإكمال الطلب');
}

// ==================== 🔔 الإشعارات ====================

// إشعارات
function showNotification(message) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #8A2BE2, #00FFFF);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        font-weight: bold;
        border: 1px solid rgba(255,255,255,0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// ==================== 🎯 الأحداث والمستمعين ====================

// إغلاق السلة عند الضغط خارجها
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartSidebar && cartIcon) {
        const isClickInsideCart = cartSidebar.contains(event.target);
        const isClickOnCartIcon = cartIcon.contains(event.target);
        
        if (!isClickInsideCart && !isClickOnCartIcon) {
            cartSidebar.classList.remove('active');
        }
    }
});

// التهيئة الأولية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 متجر Top للشحن التطبيقات - جاهز للتشغيل');
    
    // تحديث السلة أول مرة
    updateCart();
    
    // اختبار عناصر السلة
    const cartElements = [
        'cart-sidebar',
        'cart-items', 
        'cart-count',
        'cart-total'
    ];
    
    cartElements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${element ? '✅' : '❌'} عنصر ${id}:`, element ? 'موجود' : 'مفقود');
    });
});

// ==================== 🎮 تفعيل الأقسام ====================

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

console.log('🛒 نظام السلة جاهز للعمل!');
