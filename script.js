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

// تفريغ السلة بالكامل
function clearCart() {
    cart = [];
    updateCart();
    showNotification('🗑️ تم تفريغ السلة بالكامل');
}

// ==================== 📱 دوال الواتساب ====================

// إرسال الطلب للواتساب مع معلومات الدفع
function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('❌ السلة فارغة! أضف منتجات أولاً');
        return;
    }
    
    // تحضير نص الطلب مع معلومات الدفع
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
    
    // إضافة معلومات الدفع
    orderText += `💳 *معلومات الدفع:*\n`;
    orderText += `────────────────────\n`;
    orderText += `🏦 *الدفع عبر التحويل البنكي:*\n`;
    orderText += `• اسم الشركة: الفؤاد او الهرم\n`;
    orderText += `• العنوان: ريف دمشق\n`;
    orderText += `• اسم المستفيد: حمزه عبد الرحمن\n\n`;
    
    orderText += `📱 *الدفع عبر المحافظ الإلكترونية:*\n`;
    orderText += `• شام كاش: [رقم شام كاش]\n`;
    orderText += `• سيرياتيل كاش: 963995606528\n`;
    orderText += `• USDT: [عنوان المحفظة]\n\n`;
    
    orderText += `📋 *خطوات إكمال الطلب:*\n`;
    orderText += `1. قم بإجراء التحويل للمبلغ المطلوب\n`;
    orderText += `2. التقط صورة واضحة لإشعار التحويل\n`;
    orderText += `3. أرسل الصورة في هذه المحادثة\n`;
    orderText += `4. سنقوم بالتأكيد خلال دقائق ⏱️\n\n`;
    
    orderText += `👤 *معلومات العميل:*\n`;
    orderText += `────────────────────\n`;
    orderText += `الاسم الكامل: _________\n`;
    orderText += `رقم الهاتف: _________\n\n`;
    
    orderText += `📍 *عنوان التوصيل:*\n`;
    orderText += `────────────────────\n`;
    orderText += `المحافظة: _________\n`;
    orderText += `المنطقة: _________\n`;
    orderText += `العنوان التفصيلي: _________\n\n`;
    
    orderText += `⚡ *شكراً لثقتكم بنا* 🚀\n`;
    orderText += `سنقوم بالتوصيل خلال 10 دقائق`;

    // ترميز النص للرابط
    const encodedText = encodeURIComponent(orderText);
    
    // رقم الواتساب - تأكد من استخدام الرقم الصحيح
    const phoneNumber = '963964659342';
    
    // إنشاء رابط الواتساب الصحيح
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    console.log('📞 رابط الواتساب:', whatsappUrl);
    
    // فتح نافذة جديدة للواتساب
    window.open(whatsappUrl, '_blank');
    
    // تفريغ السلة بعد الإرسال
    cart = [];
    updateCart();
    
    // إغلاق السلة
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
    }
    
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
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    // إضافة أنيميشن إذا لم تكن موجودة
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
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
    const cartIcon = document.querySelector('.cart-icon') || document.querySelector('.cart-button');
    
    if (cartSidebar && cartIcon) {
        const isClickInsideCart = cartSidebar.contains(event.target);
        const isClickOnCartIcon = cartIcon.contains(event.target);
        
        if (!isClickInsideCart && !isClickOnCartIcon && cartSidebar.classList.contains('active')) {
            cartSidebar.classList.remove('active');
        }
    }
});

// ==================== 🎮 تفعيل الأقسام ====================

// تصفية الأقسام
function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.cat-btn, .category-btn');
    const categorySections = document.querySelectorAll('.category-section, .products-section');
    
    if (categoryButtons.length === 0) {
        console.log('ℹ️ لم يتم العثور على أزرار التصنيفات');
        return;
    }
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            const category = this.dataset.category || this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            
            console.log('🎯 تصفية حسب:', category);
            
            if (category === 'all' || !category) {
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
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    console.warn('⚠️ القسم غير موجود:', category);
                }
            }
        });
    });
}

// ==================== 🚀 التهيئة ====================

// التهيئة الأولية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 متجر Top للشحن التطبيقات - جاهز للتشغيل');
    
    // تحديث السلة أول مرة
    updateCart();
    
    // إعداد تصفية التصنيفات
    setupCategoryFilter();
    
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
    
    // إضافة أزرار تفريغ السلة إذا كانت موجودة
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});

// ==================== 🛠️ أدوات مساعدة ====================

// حفظ السلة في localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('topCart', JSON.stringify(cart));
        console.log('💾 تم حفظ السلة في التخزين المحلي');
    } catch (error) {
        console.error('❌ خطأ في حفظ السلة:', error);
    }
}

// تحميل السلة من localStorage
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('topCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
            console.log('📂 تم تحميل السلة من التخزين المحلي');
        }
    } catch (error) {
        console.error('❌ خطأ في تحميل السلة:', error);
    }
}

// تحديث السلة مع الحفظ
function updateCartAndSave() {
    updateCart();
    saveCartToStorage();
}

console.log('🛒 نظام السلة جاهز للعمل!');

// جعل الدوال متاحة عالمياً
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.sendToWhatsApp = sendToWhatsApp;
window.clearCart = clearCart;
window.updateCart = updateCart;
