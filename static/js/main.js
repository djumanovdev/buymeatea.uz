// ============================================
// BuyMeaTea - Main JavaScript
// ============================================

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initAnimations();
    initDonationForm();
    initCounters();
    initShareButtons();
});

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 16px rgba(44, 36, 22, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Intersection Observer Animations
// ============================================
function initAnimations() {
    // Fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
    slideElements.forEach(el => observer.observe(el));
}

// ============================================
// Donation Form Functionality
// ============================================
function initDonationForm() {
    const form = document.getElementById('donationForm');
    
    if (!form) return;
    
    // Tea button selection
    const teaButtons = document.querySelectorAll('.tea-btn');
    const teaCountInput = document.getElementById('tea_count');
    const totalAmountDisplay = document.getElementById('totalAmount');
    const teaCountDisplay = document.getElementById('teaCount');
    
    // Tea price constant
    const TEA_PRICE = 3.00;
    
    // Handle tea button clicks
    teaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all buttons
            teaButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update input value
            const value = button.dataset.value;
            teaCountInput.value = value;
            
            // Update displays
            updateDonationSummary(value);
        });
    });
    
    // Handle custom amount input
    teaCountInput.addEventListener('input', () => {
        // Remove active class from all buttons
        teaButtons.forEach(btn => btn.classList.remove('active'));
        
        // Update displays
        updateDonationSummary(teaCountInput.value);
    });
    
    // Update donation summary
    function updateDonationSummary(teaCount) {
        const count = parseInt(teaCount) || 1;
        const total = (count * TEA_PRICE).toFixed(2);
        
        if (teaCountDisplay) {
            teaCountDisplay.textContent = count;
        }
        
        if (totalAmountDisplay) {
            totalAmountDisplay.textContent = `$${total}`;
        }
    }
    
    // Message character counter
    const messageTextarea = document.getElementById('message');
    const charCountDisplay = document.getElementById('charCount');
    
    if (messageTextarea && charCountDisplay) {
        messageTextarea.addEventListener('input', () => {
            const count = messageTextarea.value.length;
            charCountDisplay.textContent = count;
            
            // Change color when approaching limit
            if (count > 250) {
                charCountDisplay.style.color = '#C07854';
            } else {
                charCountDisplay.style.color = '#6B5E4F';
            }
        });
    }
    
    // Form validation
    form.addEventListener('submit', (e) => {
        const teaCount = parseInt(teaCountInput.value);
        
        if (!teaCount || teaCount < 1) {
            e.preventDefault();
            alert('Please select at least 1 tea');
            return;
        }
        
        if (teaCount > 100) {
            e.preventDefault();
            alert('Maximum 100 teas per donation');
            return;
        }
        
        // Show loading state on submit button
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="btn-text">Processing...</span><span class="btn-icon">⏳</span>';
        }
    });
    
    // Initialize with default value
    updateDonationSummary(teaCountInput.value || 1);
    
    // Set first tea button as active by default
    if (teaButtons.length > 0) {
        teaButtons[0].classList.add('active');
    }
}

// ============================================
// Animated Counters
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, duration / steps);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// ============================================
// Share Buttons
// ============================================
function initShareButtons() {
    // These functions will be called from HTML onclick attributes
    // but we define them here for organization
}

function shareOnTwitter() {
    const text = 'I just supported a creator on BuyMeaTea! ☕';
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function copyLink() {
    const url = window.location.href;
    
    // Create temporary input
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(tempInput);
}

function showCopyNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = 'Link copied to clipboard! ✓';
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #7FAA6B;
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-family: 'DM Sans', sans-serif;
        font-weight: 600;
        animation: slideUp 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make functions available globally for HTML onclick
window.shareOnTwitter = shareOnTwitter;
window.shareOnFacebook = shareOnFacebook;
window.copyLink = copyLink;

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Form Input Focus Effects
// ============================================
const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        const parent = input.closest('.form-group');
        if (parent) {
            parent.classList.add('focused');
        }
    });
    
    input.addEventListener('blur', () => {
        const parent = input.closest('.form-group');
        if (parent && !input.value) {
            parent.classList.remove('focused');
        }
    });
});

// ============================================
// Easter Egg: Tea Steam Animation on Hover
// ============================================
const logoIcon = document.querySelector('.tea-icon');

if (logoIcon) {
    logoIcon.addEventListener('mouseenter', () => {
        logoIcon.style.animation = 'none';
        setTimeout(() => {
            logoIcon.style.animation = 'steam 1s ease-in-out 3';
        }, 10);
    });
}

// ============================================
// Performance: Lazy Load Images (if needed)
// ============================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// Console Message
// ============================================
console.log('%c☕ BuyMeaTea', 'font-size: 24px; font-weight: bold; color: #C07854;');
console.log('%cSupport creators with warmth!', 'font-size: 14px; color: #6B5E4F;');
