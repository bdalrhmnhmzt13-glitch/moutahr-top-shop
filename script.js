// 📦 بيانات المنتجات 
const PRODUCTS_DATA = [
    // تطبيقات اجتماعية (Social)
    { id: 501, name: "Soul Chill", price: 15000, category: "social", color: "#9b59b6", description: "عملات وعناصر Soul Chill", icon: "fa-solid fa-music", realPrice: 12000 },
    { id: 502, name: "Bigo Live", price: 12000, category: "social", color: "#e74c3c", description: "عملات وعناصر Bigo Live", icon: "fa-solid fa-video", realPrice: 9000 },
    { id: 503, name: "Poppo Live", price: 13000, category: "social", color: "#3498db", description: "عملات وعناصر Poppo Live", icon: "fa-solid fa-camera", realPrice: 10000 },
    { id: 505, name: "Ahlan Chat", price: 10000, category: "social", color: "#f39c12", description: "عملات وعناصر Ahlan Chat", icon: "fa-solid fa-comment-dots", realPrice: 7000 },

    // ألعاب المعارك (Battle)
    { id: 603, name: "ببجي - 325 شدة", price: 50000, category: "battle", color: "#e74c3c", description: "325 شدة للعبة ببجي", icon: "fa-solid fa-gun", realPrice: 40000 },
    { id: 604, name: "فري فاير - 520 جوهرة", price: 55000, category: "battle", color: "#3498db", description: "520 جوهرة للعبة فري فاير", icon: "fa-solid fa-gem", realPrice: 45000 },
    { id: 102, name: "Genshin Impact", price: 15000, category: "battle", color: "#3498db", description: "كريستالات Genshin Impact", icon: "fa-solid fa-wand-magic", realPrice: 12000 },
    { id: 104, name: "Farlight 84", price: 13000, category: "battle", color: "#9b59b6", description: "عملات وعناصر Farlight 84", icon: "fa-solid fa-rocket", realPrice: 10000 },
    
    // ألعاب الاستراتيجية (Strategy)
    { id: 201, name: "انتقام السلاطين", price: 20000, category: "strategy", color: "#d35400", description: "عملات انتقام السلاطين", icon: "fa-solid fa-shield-halved", realPrice: 16000 },
    { id: 203, name: "King of Avalon", price: 19000, category: "strategy", color: "#2ecc71", description: "عملات King of Avalon", icon: "fa-solid fa-crown", realPrice: 15000 },

    // ألعاب الرياضة (Sports)
    { id: 301, name: "FC Mobile", price: 15000, category: "sports", color: "#27ae60", description: "عملات FC Mobile", icon: "fa-solid fa-futbol", realPrice: 12000 },
    
    // ألعاب Casual
    { id: 402, name: "Yalla Ludo", price: 9000, category: "casual", color: "#e74c3c", description: "عملات Yalla Ludo", icon: "fa-solid fa-dice", realPrice: 7000 }
];

// 🛒 حالة المتجر العامة
let cart = [];
let currentCategory = 'all';

// --------------------------------------------------------
// 🛠️ وظائف مساعدة لتخزين البيانات
// --------------------------------------------------------

/**
 * دالة مساعدة لحفظ السلة في التخزين المحلي للمتصفح (Local Storage)
 */
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

/**
 * دالة مساعدة لتحميل السلة من التخزين المحلي
 */
function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// --------------------------------------------------------
// ⚙️ وظائف العرض (DOM Manipulation)
// --------------------------------------------------------

/**
 * دالة مساعدة لتحويل الأرقام إلى نص مع فواصل (مثال: 10,000)
 */
const formatCurrency = (num) => `${num.toLocaleString()} ل.س`;

/**
 * إنشاء HTML لبطاقة منتج واحد
 */
function createProductCard(product) {
    return `
        <div class="product" data-id="${product.id}">
            <div class="product-image" style="background: ${product.color};">
                <i class="${product.icon}"></i>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${formatCurrency(product.price)}</div>
            <button class="buy-now-btn" onclick="showRealPrice(${product.id})">
                <i class="fa-solid fa-money-check-dollar"></i> معرفة السعر الحقيقي
            </button>
        </div>
    `;
}

/**
 * عرض المنتجات بناءً على الفئة المختارة
 */
function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    const sectionTitle = document.getElementById('sectionTitle');

    const filteredProducts = currentCategory === 'all'
        ? PRODUCTS_DATA
        : PRODUCTS_DATA.filter(product => product.category === currentCategory);

    // تحديث عنوان القسم
    const categoryNames = {
        'all': 'جميع المنتجات', 'social': 'التطبيقات الاجتماعية', 'battle': 'ألعاب المعارك',
        'strategy': 'ألعاب الاستراتيجية', 'sports': 'ألعاب الرياضة', 'casual': 'ألعاب Casual'
    };
    sectionTitle.innerHTML = `🛍️ ${categoryNames[currentCategory]}`;

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #7f8c8d; font-size: 1.2rem;">لا توجد منتجات في هذا القسم حالياً.</p>`;
        return;
    }

    productsContainer.innerHTML = filteredProducts.map(createProductCard).join('');
}

/**
 * إنشاء HTML لعنصر واحد داخل السلة (مُحسَّن)
 */
function createCartItemHTML(item, index) {
    // العثور على المنتج الأصلي للحصول على الأيقونة واللون
    const originalProduct = PRODUCTS_DATA.find(p => p.id === item.id);
    const itemIcon = originalProduct ? `<i class="${originalProduct.icon}"></i>` : '📦';
    const itemColor = originalProduct ? originalProduct.color : '#bdc3c7';
    const subtotal = item.price * item.quantity;

    return `
        <div class="cart-item">
            <div class="cart-item-details">
                <div class="item-icon" style="background-color: ${itemColor};">${itemIcon}</div>
                <div class="item-name-qty">
                    <span class="name">${item.name}</span>
                    <span class="item-price">السعر: ${formatCurrency(item.price)} / الوحدة</span>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash-can"></i> إزالة
                </button>
            </div>
        </div>
    `;
}


/**
 * تحديث عرض السلة والإجمالي وحفظها في التخزين المحلي
 */
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // حساب الإجمالي والكمية
    let total = 0;
    const totalItems = cart.reduce((sum, item) => {
        total += item.price * item.quantity;
        return sum + item.quantity;
    }, 0);

    // تحديث العداد والإجمالي وحالة الزر
    cartCount.textContent = totalItems;
    cartTotalElement.textContent = `الإجمالي: ${formatCurrency(total)}`;
    checkoutBtn.disabled = cart.length === 0;

    // تحديث قائمة العناصر
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;"><i class="fa-solid fa-box-open"></i> سلة التسوق فارغة حالياً.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(createCartItemHTML).join('');
    }

    // 🔑 حفظ السلة بعد كل تحديث
    saveCart(); 
}


// --------------------------------------------------------
// 🧠 وظائف المنطق وتتبّع الأحداث
// --------------------------------------------------------

/**
 * تفعيل عرض السعر الحقيقي وتتبّع حدث view_real_price
 */
function showRealPrice(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    // ** تتبّع الحدث المخصص لـ GA4: "عرض السعر الحقيقي" **
    if (typeof gtag === 'function') {
        gtag('event', 'view_real_price', {
            product_id: product.id,
            product_name: product.name,
            currency: "SYP", 
            value: product.realPrice 
        });
    }
    
    const saving = product.price - product.realPrice;
    const savingPercentage = Math.round((saving / product.price) * 100);
    
    const confirmed = confirm(
        `🛒 ${product.name}\n\n` +
        `السعر الوهمي: ${formatCurrency(product.price)}\n` +
        `✅ السعر الحقيقي: ${formatCurrency(product.realPrice)}\n` +
        `💰 توفير: ${formatCurrency(saving)} (${savingPercentage}%)\n\n` +
        `هل تريد إضافة هذا المنتج إلى السلة؟`
    );
    
    if (confirmed) {
        addToCart(productId);
    }
}

/**
 * تصفية المنتجات وتحديث زر الفئة النشط
 */
function filterCategory(category, clickedButton) {
    currentCategory = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    clickedButton.classList.add('active');
    
    displayProducts();
    scrollToTop(); // العودة للأعلى بعد التصفية
}

/**
 * إضافة المنتج إلى السلة
 */
function addToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.realPrice,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    openCart();
}

/**
 * تحديث كمية المنتج في السلة
 */
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCartDisplay();
}

/**
 * إزالة منتج من السلة
 */
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

/**
 * إنشاء رسالة واتساب وإرسالها مع تتبّع حدث الشراء (purchase)
 */
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert('🛒 السلة فارغة!');
        return;
    }

    // حساب الإجمالي لغرض تتبّع GA4
    const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // ** تتبّع الحدث القياسي لـ GA4: "الشراء (Purchase)" **
    if (typeof gtag === 'function') {
        const itemsForGA = cart.map(item => ({
            item_id: item.id.toString(),
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        gtag('event', 'purchase', {
            transaction_id: `WA-${Date.now()}`, 
            value: totalValue, 
            currency: "SYP", 
            items: itemsForGA
        });
    }
    
    // بناء رسالة الطلب
    let message = "مرحباً، أريد شراء المنتجات التالية من Top للشحن:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} (الكمية: ${item.quantity}، الإجمالي: ${formatCurrency(item.price * item.quantity)})\n`;
    });
    
    message += `\nالمجموع الكلي: ${formatCurrency(totalValue)}\n`;
    message += "\n(أرجو إضافة أي ملاحظات أو معلومات مثل ID الحساب هنا)";
    
    const whatsappNumber = "963964659342";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    
    // تفريغ السلة وحفظها
    cart = [];
    updateCartDisplay();
    closeCart();
    
    setTimeout(() => {
        alert('✅ تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً عبر واتساب لإتمام الشحن.');
    }, 500);
}

// --------------------------------------------------------
// 🖱️ وظائف واجهة المستخدم (UI)
// --------------------------------------------------------

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// إظهار/إخفاء زر العودة للأعلى
window.onscroll = function() {
    const btn = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
};

// 🚀 التهيئة الأولية
document.addEventListener('DOMContentLoaded', function() {
    loadCart(); // 🔑 تحميل السلة عند بدء تشغيل الصفحة
    displayProducts();
    updateCartDisplay();
    console.log('✅ تم تحميل المتجر بنجاح!');
});
