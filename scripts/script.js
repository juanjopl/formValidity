form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    validateForm();
})

function validateForm() {
    const success = document.getElementById('success');
    let isValid = true;

    const fields = [
        {elementId: 'firstname', errorId: 'fnerror', message: 'This field is required'},
        {elementId: 'lastname', errorId: 'lnerror', message: 'This field is required'},
        {elementId: 'message', errorId: 'messageerror', message: 'This field is required'}
    ]

    const fieldEmail = {
        emailId: 'email',
        emailError: 'emailerror',
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        emailMessage: 'Please enter a valid email address'
    }

    const fieldsOption = [ {
        selectorId: 'querytype',
        errorId: 'qterror',
        message: 'Please select a query type'
    },
    {
        selectorId: 'consent',
        errorId: 'consenterror',
        message: 'To submit this form, please consent to being contacted'
    }]

    fields.forEach(({elementId, errorId, message}) => {
        if(!validateRequireField(elementId, errorId, message)) {
           isValid = false; 
        }
    });

    if(!validateEmail(fieldEmail)) {
        isValid = false;
    }

    fieldsOption.forEach(({selectorId, errorId, message}) => {
        if(!validateOptionField(selectorId, errorId, message)) {
            isValid = false;
        }
    })

    if(isValid === true) {
        success.style.display = 'block';
    }else {
        success.style.display = 'none';
    }

    function validateRequireField(elementId, errorId, message) {
        const element = document.getElementById(elementId);
        const error = document.getElementById(errorId);

        if(element.value.trim() === '') {
            element.classList.add('required');
            error.textContent = message;
            return false;
        }else {
            element.classList.remove('required');
            error.textContent = '';
            return true;
        }
    }

    function validateEmail({emailId, emailError, emailRegex, emailMessage}) {
        const email = document.getElementById(emailId);
        const error = document.getElementById(emailError);

        if(emailRegex.test(email.value.trim())) {
            error.textContent = '';
            email.classList.remove('required');
            return true;
        }else {
            email.classList.add('required');
            error.textContent = emailMessage;
            return false;
        }
    }

    function validateOptionField(selectorId, errorId, message) {
        const selector = document.querySelector(`input[name="${selectorId}"]:checked`);
        const error = document.getElementById(errorId);

        if(selector) {
            error.textContent = '';
            return true;
        }else {
            error.textContent = message;
            return false;
        }
    }
}
