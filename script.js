// First Bank Mobile Money App - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    setupSmoothScroll();
    
    // CTA button interactions
    setupCTAButtons();
    
    // Animate elements on scroll
    setupScrollAnimations();
    
    // Mobile menu toggle (if implemented)
    setupMobileMenu();
});

/**
 * Smooth scroll for navigation links
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * CTA Button click handlers
 */
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleDownloadClick();
        });
    });
    
    const secondaryButtons = document.querySelectorAll('.cta-button.secondary');
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleLearnMoreClick();
        });
    });
}

/**
 * Handle download button click
 */
function handleDownloadClick() {
    console.log('Download app clicked');
    
    // Show toast notification
    showNotification('Redirecting to app stores...', 'success');
    
    // Simulate platform detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    setTimeout(() => {
        if (isMobile) {
            // On mobile, redirect to app store
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = 'https://apps.apple.com';
            } else if (/Android/i.test(navigator.userAgent)) {
                window.location.href = 'https://play.google.com/store';
            }
        } else {
            // On desktop, show modal with app store links
            showAppStoreModal();
        }
    }, 500);
}

/**
 * Handle learn more button click
 */
function handleLearnMoreClick() {
    console.log('Learn more clicked');
    showNotification('Scroll down to learn more about our features!', 'info');
    
    // Scroll to features section
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `notification notification-${type}`;
    toast.textContent = message;
    
    // Add styles for notification
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        fontWeight: '500',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    if (type === 'success') {
        toast.style.backgroundColor = '#00A651';
        toast.style.color = 'white';
    } else if (type === 'error') {
        toast.style.backgroundColor = '#D32F2F';
        toast.style.color = 'white';
    } else {
        toast.style.backgroundColor = '#0052CC';
        toast.style.color = 'white';
    }
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Show app store selection modal
 */
function showAppStoreModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 12px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    content.innerHTML = `
        <h2 style="color: #003d2b; margin-bottom: 24px;">Download First Bank Mobile Money</h2>
        <p style="color: #666; margin-bottom: 32px;">Choose your app store to download:</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <button class="app-store-btn" data-store="ios" style="
                padding: 12px 24px;
                background: #003d2b;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            ">📱 Download on App Store</button>
            <button class="app-store-btn" data-store="android" style="
                padding: 12px 24px;
                background: #00A651;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            ">🤖 Get it on Google Play</button>
            <button class="close-modal" style="
                padding: 12px 24px;
                background: #f5f5f5;
                color: #003d2b;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Add hover effects
    const buttons = content.querySelectorAll('.app-store-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.style.opacity = '0.8';
        });
        btn.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });
        
        btn.addEventListener('click', function() {
            const store = this.getAttribute('data-store');
            if (store === 'ios') {
                window.open('https://apps.apple.com', '_blank');
            } else {
                window.open('https://play.google.com/store', '_blank');
            }
            modal.remove();
        });
    });
    
    // Close button
    const closeBtn = content.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Scroll animations - fade in elements as they come into view
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature cards and benefit items
    const animatableElements = document.querySelectorAll(
        '.feature-card, .benefits-list li, .stat'
    );
    
    animatableElements.forEach(element => {
        element.classList.add('will-animate');
        observer.observe(element);
    });
}

/**
 * Mobile menu setup (for future mobile nav implementation)
 */
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        // Hide nav links on mobile initially
        // This would require additional HTML for mobile menu button
    }
}

/**
 * Format currency for display
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2
    }).format(amount);
}

/**
 * Track user interactions (analytics-ready)
 */
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    
    // This would integrate with analytics service
    // Example: gtag('event', eventName, eventData);
}

/**
 * Handle form submissions (if forms are added)
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Send to server or handle locally
    trackEvent('form_submission', { form: e.target.id });
    showNotification('Thank you! We\'ll be in touch soon.', 'success');
    
    e.target.reset();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .will-animate {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease forwards;
    }
`;

document.head.appendChild(style);

// Export functions for external use
window.FirstBankApp = {
    formatCurrency,
    trackEvent,
    showNotification,
    handleDownloadClick,
    handleLearnMoreClick
};