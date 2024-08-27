document.getElementById("studentTable").addEventListener("submit", function(event)
{
    event.preventDefault();
    let errors = [];

    username = document.getElementById("username").value.trim();
    email = document.getElementById("email").value.trim();
    phoneNo = document.getElementById("phoneNo").value.trim();
    password = document.getElementById("password").value.trim();
    confirmPass = document.getElementById("confirmPass").value.trim();
    
    if(username === "" || email === "" || phoneNo === "" || password === "" || confirmPass === "")
    {
        errors.push('One or more field is empty.');
    }
    
    phonePattern = /^\d{10}$/;
    if(!phonePattern.test(phoneNo))
        errors.push("Phone number should be 10 digits.");

    emailPattern = /^[^\s@]+@[^\s@]{3,}\.[^\s@]{2,3}$/;
    if(!emailPattern.test(email))
        errors.push("Invalid email.");

    passPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/;
    if(!passPattern.test(password))
        errors.push("Password must be at least 7 characters long and contain at least one capital letter, one digit, and one special character from the set (&,$,#,@)")

    if(password !== confirmPass)
        errors.push("Password and confirm password do not match.");

    errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '';
    if (errors.length > 0) 
    {
        errorMessages.innerHTML = errors.join('<br>');
    } 
    else 
    {
        //window.location.href = 'submitted.html'
        errorMessages.innerHTML = 'Form submitted successfully!';
    }
});