// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ========== //
    
    // 1. Button Click
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = "You clicked the button! 🎉";
        clickOutput.style.color = "#e74c3c";
    });
    
    // 2. Hover Effects (handled in CSS, but we can add more with JS)
    const hoverBox = document.querySelector('.hover-box');
    const hoverEffect = document.querySelector('.hover-effect');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverEffect.textContent = "You're hovering!";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverEffect.textContent = "";
    });
    
    // 3. Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${e.target.value}`;
    });
    
    // 4. Secret Action (double click)
    const secretBtn = document.getElementById('secret-btn');
    const secretOutput = document.getElementById('secret-output');
    
    secretBtn.addEventListener('dblclick', function() {
        secretOutput.textContent = "You found the secret! 🎊";
        secretOutput.classList.add('shake');
        setTimeout(() => secretOutput.classList.remove('shake'), 500);
    });
    
    // Long press detection
    let pressTimer;
    secretBtn.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            secretOutput.textContent = "Long press detected! 🕒";
        }, 1000);
    });
    
    secretBtn.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBtn.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // ========== Interactive Elements ========== //
    
    // 1. Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    
    colorBtn.addEventListener('click', function() {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.backgroundColor = randomColor;
        this.textContent = `Color: ${randomColor}`;
    });
    
    // 2. Image Gallery/Slideshow
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // 3. Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ========== //
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        const errorElement = this.nextElementSibling;
        if (this.value.trim() === '') {
            showError(this, errorElement, 'Name is required');
        } else {
            clearError(this, errorElement);
        }
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const errorElement = this.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value && !emailRegex.test(this.value)) {
            showError(this, errorElement, 'Please enter a valid email');
        } else {
            clearError(this, errorElement);
        }
    });
    
    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        const value = this.value;
        
        // Check length
        document.getElementById('length-rule').classList.toggle('valid', value.length >= 8);
        
        // Check for number
        document.getElementById('number-rule').classList.toggle('valid', /\d/.test(value));
        
        // Check for special character
        document.getElementById('special-rule').classList.toggle('valid', /[!@#$%^&*]/.test(value));
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            const errorElement = nameInput.nextElementSibling;
            showError(nameInput, errorElement, 'Name is required');
            isValid = false;
        }
        
        // Validate email format if provided
        if (emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                const errorElement = emailInput.nextElementSibling;
                showError(emailInput, errorElement, 'Please enter a valid email');
                isValid = false;
            }
        }
        
        // Validate password
        if (passwordInput.value.length < 8) {
            const errorElement = passwordInput.nextElementSibling;
            showError(passwordInput, errorElement, 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fix the errors before submitting.');
        } else {
            alert('Form submitted successfully!');
            // In a real app, you would submit to a server here
        }
    });
    
    // Helper functions for form validation
    function showError(input, errorElement, message) {
        input.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearError(input, errorElement) {
        input.style.borderColor = '#ddd';
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
});
