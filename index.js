const products = [
    { id: 11, name: "seat area", category: "interior", price: 900.00, condition: "good", image: "image/car10.jpg" },
    { id: 10, name: "Renault petrol engine", category: "engine", price: 3200.00, condition: "good", image: "image/carsp45.jpg" },
    { id: 1, name: "red front bumper", category: "body", price: 4500.00, condition: "good", image: "image/car9.jpg" },
    { id: 2, name: "car transmission", category: "interior", price: 850.00, condition: "good", image: "image/carps33.jpg" },
    { id: 3, name: "Alternator", category: "electrical", price: 1200.00, condition: "fair", image: "image/carsp12.jpg" },
    { id: 4, name: "shelf of car headlight assemblies", category: "body", price: 350.00, condition: "good", image: "image/car34.jpg" },
    { id: 5, name: "engine bay of a vehicle", category: "interior", price: 2200.00, condition: "fair", image: "image/carp23.jpg" },
    { id: 6, name: "Ford Sigma petrol engine", category: "engine", price: 1950.00, condition: "good", image: "image/carpp41.jpg" },
    { id: 7, name: "collection of engine", category: "engine", price: 3200.00, condition: "fair", image: "image/cars423.jpg" },
    { id: 8, name: "Audi A4 Dashboard", category: "interior", price: 1800.00, condition: "poor", image: "image/car6.jpg" },
    { id: 9, name: "Renault Clio Engine", category: "engine", price: 6800.00, condition: "fair", image: "image/car5.jpg" },
    { id: 12, name: "white Kia Picanto", category: "body", price: 5200.00, condition: "fair", image: "image/cars17.jpg" },
    { id: 13, name: "Renault Triber", category: "body", price: 400.00, condition: "good", image: "image/car19.jpg" },
    { id: 14, name: "white Hyundai Grand i10", category: "body", price: 680.00, condition: "good", image: "image/cars261.jpg" },
    { id: 15, name: "vehicle bumper covers", category: "body", price: 3200.00, condition: "fair", image: "image/car232.jpg" },
    { id: 16, name: "Ford Fiesta", category: "body", price: 5800.00, condition: "poor", image: "image/cars281.jpg" },
    { id: 17, name: "Ford Focus sedan", category: "body", price: 9800.00, condition: "good", image: "image/car211.jpg" },
];

// Debug: Test if image exists
function testImage(path) {
    const img = new Image();
    img.onload = () => console.log(`✅ Image found: ${path}`);
    img.onerror = () => console.log(`❌ Image NOT found: ${path}`);
    img.src = path;
}

// Test your image path
testImage("image/car5.jpg");

// Cart functionality
let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartOverlay = document.createElement('div');
cartOverlay.className = 'cart-overlay';
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total-price');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const orderForm = document.getElementById('order-form');
const confirmation = document.getElementById('confirmation');
const orderIdElement = document.getElementById('order-id');
const continueShopping = document.getElementById('continue-shopping');
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');

// Simple Mobile Menu Functionality - FIXED
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
const mobileOverlay = document.createElement('div');
mobileOverlay.className = 'mobile-overlay';

// Add overlays to body
document.body.appendChild(cartOverlay);
document.body.appendChild(mobileOverlay);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartCount();
});

// Display products in the grid
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const conditionText = product.condition === 'good' ? 'Good' : 
                            product.condition === 'fair' ? 'Fair' : 'Poor';
        const conditionClass = `condition-${product.condition}`;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="used-badge">USED</div>
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://images.unsplash.com/photo-1603712609940-9322e6dba4a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-condition ${conditionClass}">
                    <i class="fas fa-circle"></i> Condition: ${conditionText}
                </div>
                <div class="product-price">R${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile Menu
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        
        // Close cart if open
        if (cartSidebar.classList.contains('active')) {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        }
    });

    // Mobile overlay click
    mobileOverlay.addEventListener('click', function() {
        mainNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close mobile menu when clicking links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cart functionality
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
        }
    });

    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Checkout process
    checkoutBtn.addEventListener('click', proceedToCheckout);
    orderForm.addEventListener('submit', placeOrder);
    continueShopping.addEventListener('click', resetShopping);
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
    
    // Contact form
    contactForm.addEventListener('submit', sendContactMessage);
    
    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            condition: product.condition,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('cart-total-price').textContent = '0.00';
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const conditionText = item.condition === 'good' ? 'Good' : 
                            item.condition === 'fair' ? 'Fair' : 'Poor';
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://images.unsplash.com/photo-1603712609940-9322e6dba4a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R${item.price.toFixed(2)}</div>
                <div style="font-size: 0.8rem; color: var(--gray);">Condition: ${conditionText}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    document.getElementById('cart-total-price').textContent = total.toFixed(2);
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            decreaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            increaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Update cart count in the header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Increase item quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        updateCartCount();
    }
}

// Decrease item quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
        updateCartDisplay();
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
    showNotification('Item removed from cart');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
    displayOrderSummary();
    checkoutForm.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display order summary in checkout form
function displayOrderSummary() {
    const orderSummaryItems = document.getElementById('order-summary-items');
    const orderTotal = document.getElementById('order-total');
    let total = 0;
    let html = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const conditionText = item.condition === 'good' ? 'Good' : 
                            item.condition === 'fair' ? 'Fair' : 'Poor';
        html += `
            <div class="order-item">
                <span>${item.name} (${conditionText}) x ${item.quantity}</span>
                <span>R${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    orderSummaryItems.innerHTML = html;
    orderTotal.textContent = `R${total.toFixed(2)}`;
}

// Place order
async function placeOrder(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order object
    const order = {
        orderId: `EA${Date.now()}`,
        name: name,
        email: email,
        phone: phone,
        address: address,
        items: cart,
        total: total,
        date: new Date().toISOString()
    };
    
    try {
        // Send email using FormSubmit
        const formData = new FormData();
        formData.append('_template', 'basic');
        formData.append('_subject', `🛒 New Order: ${order.orderId} - Ekene AutoScrap`);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', `
NEW ORDER RECEIVED! 🛒

Order ID: ${order.orderId}
Customer Name: ${name}
Customer Email: ${email}
Customer Phone: ${phone}
Shipping Address: ${address}

Order Items:
${cart.map(item => {
    const conditionText = item.condition === 'good' ? 'Good' : 
                         item.condition === 'fair' ? 'Fair' : 'Poor';
    return `- ${item.name} (${conditionText}) x ${item.quantity}: R${(item.price * item.quantity).toFixed(2)}`;
}).join('\n')}

Total: R${total.toFixed(2)}
Order Date: ${new Date().toLocaleString()}

This order was received through Ekene AutoScrap website.
        `);
        
        // Send email to store owner
        await fetch('https://formsubmit.co/ajax/Emmanuelekene2307@gmail.com', {
            method: 'POST',
            body: formData
        });
        
        // Send confirmation email to customer
        const customerFormData = new FormData();
        customerFormData.append('_template', 'basic');
        customerFormData.append('_subject', `✅ Order Confirmation: ${order.orderId} - Ekene AutoScrap`);
        customerFormData.append('name', name);
        customerFormData.append('email', email);
        customerFormData.append('message', `
ORDER CONFIRMATION ✅

Thank you for your order at Ekene AutoScrap!

Order ID: ${order.orderId}
Order Date: ${new Date().toLocaleString()}

Order Summary:
${cart.map(item => {
    const conditionText = item.condition === 'good' ? 'Good' : 
                         item.condition === 'fair' ? 'Fair' : 'Poor';
    return `- ${item.name} (${conditionText}) x ${item.quantity}: R${(item.price * item.quantity).toFixed(2)}`;
}).join('\n')}

Total: R${total.toFixed(2)}

Shipping Address:
${address}

We will process your order and contact you shortly with shipping details.

Please note: All parts are used and sold as-is with a 30-day warranty unless otherwise specified.

Thank you for choosing Ekene AutoScrap!
        `);
        
        await fetch('https://formsubmit.co/ajax/Emmanuelekene2307@gmail.com', {
            method: 'POST',
            body: customerFormData
        });
        
        // Show confirmation
        orderIdElement.textContent = order.orderId;
        checkoutForm.classList.remove('active');
        confirmation.classList.add('active');
        
        // Reset cart
        cart = [];
        updateCartCount();
        
    } catch (error) {
        console.error('Order failed:', error);
        alert('Sorry, there was an error processing your order. Please try again.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Reset shopping after order
function resetShopping() {
    confirmation.classList.remove('active');
    orderForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Send contact message
async function sendContactMessage(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    try {
        // Send email using FormSubmit
        const formData = new FormData();
        formData.append('_template', 'basic');
        formData.append('_subject', `📧 Contact Form: ${subject} - Ekene AutoScrap`);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', `
CONTACT FORM MESSAGE 📧

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

This message was sent through the Ekene AutoScrap contact form.
        `);
        
        await fetch('https://formsubmit.co/ajax/Emmanuelekene2307@gmail.com', {
            method: 'POST',
            body: formData
        });
        
        // Show success message
        showNotification('Your message has been sent successfully!');
        contactForm.reset();
        
    } catch (error) {
        console.error('Message failed:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);