document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            // Don't prevent default - let Formspree handle the actual submission
            
            // Show loading state on button
            const submitButton = signupForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="ph ph-spinner ph-spin fa fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Create a success message container if it doesn't exist
            let successMessage = document.querySelector('.signup-success');
            if (!successMessage) {
                successMessage = document.createElement('div');
                successMessage.className = 'signup-success';
                successMessage.style.display = 'none';
                signupForm.parentNode.insertBefore(successMessage, signupForm.nextSibling);
            }
            
            // Handle form submission response
            signupForm.addEventListener('formspree:submit', function(e) {
                // Hide the form
                signupForm.style.display = 'none';
                
                // Get user's name from the form
                const nameInput = signupForm.querySelector('input[name="name"]');
                const userName = nameInput ? nameInput.value.split(' ')[0] : 'there';
                
                // Show success message
                successMessage.innerHTML = `
                    <div class="signup-success__icon">
                        <i class="ph ph-check-circle fa fa-check-circle"></i>
                    </div>
                    <h3>Thank you, ${userName}!</h3>
                    <p>You've successfully signed up for TradeMaster AI daily insights.</p>
                    <p>Please check your inbox for a confirmation email. Your first market analysis will be delivered before the next market open.</p>
                `;
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset button state (in case user goes back)
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
            
            // Handle form submission errors
            signupForm.addEventListener('formspree:error', function(e) {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Show error message
                alert('There was an error submitting the form. Please try again.');
            });
        });
    }
});
