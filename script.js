// متغيرات السلة
let cart = [];
let total = 0;

// ==================== 🛒 دوال السلة ====================

// عرض/إخفاء السلة
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        console.log('تم الضغط على السلة - الحالة:', cartSidebar.classList.contains('active'));
    } else {
        console.error('❌ لم يتم العثور على عنصر سلة التسوق');
    }
}

// إضافة منتج للسلة
function addToCart(name, price) {
    console.log('🛍️ محاولة إضافة منتج:', name, price);
    
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
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('active')) {
        cartSidebar.classList.add('active');
    }
}

// تحديث عرض السلة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
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
        cartItems.innerHTML = '<p style="text-align: center; color: #888;">السلة فارغة</p>';
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
        cart.splice(index, 1);
        updateCart();
        showNotification('🗑️ تم إزالة المنتج من السلة');
    }
}

// ==================== 📱 دوال الواتساب ====================

// إرسال الطلب للواتساب
function sendToWhatsApp() {
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
    const phoneNumber = '963123456789'; // 🔄 غير هذا الرقم
    
    // فتح الواتساب
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    console.log('📞 رابط الواتساب:', whatsappUrl);
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
        if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
            cartSidebar.classList.remove('active');
        }
    }
});

// منع إغلاق السلة عند الضغط داخلها
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.contains(event.target)) {
        event.stopPropagation();
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
    
    // إضافة أنيميشن للإشعارات في الـ CSS إذا لم تكن موجودة
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
            
            .cart-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                margin-bottom: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
            }
            
            .remove-btn {
                background: #ff4757;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 10px;
                transition: all 0.3s ease;
            }
            
            .remove-btn:hover {
                background: #ff3742;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }
});

// ==================== 🎮 تفعيل السلة بالأزرار ====================

// تفعيل أزرار الإضافة من خلال الأحداث
function setupProductButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
            
            addToCart(productName, productPrice);
        });
    });
}

// تفعيل عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupProductButtons);
} else {
    setupProductButtons();
}

console.log('🛒 نظام السلة جاهز للعمل!');
