function validate() {
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pass").value;
    var mobile = document.getElementById("number").value;
    var email = document.getElementById("email").value;

    var regxUsername = /[EMD][0-9][0-9]celebal/;
    var regxmobile = /^[7-9]\d{9}$/;
    var regxemail = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,8})?$/;

    var unameError = document.getElementById("unameError");
    var mobileError = document.getElementById("mobileError");
    var emailError = document.getElementById("emailError");

    // Reset error message visibility initially
    unameError.style.visibility = "hidden";
    mobileError.style.visibility = "hidden";
    emailError.style.visibility = "hidden";

    if (!regxUsername.test(username)) {
        unameError.style.visibility = "visible";
        setTimeout(function () {
            unameError.style.visibility = "hidden"; 
        }, 2000); 
        return false;
    } else if (!regxmobile.test(mobile)) {
        mobileError.style.visibility = "visible";
        setTimeout(function () {
            mobileError.style.visibility = "hidden";
        }, 3000);
        return false;
    } else if (!regxemail.test(email)) {
        emailError.style.visibility = "visible";
        setTimeout(function () {
            emailError.style.visibility = "hidden";
        }, 3000);
        return false;
    } else if (password.trim().length < 5) {
        // Handle the password validation as needed
        return false;
    } else {
        return true;
    }
}


// \d - match any digit (equal to [0-9])
// \w - match any word character (a-z,A-,0-9 & _)
// \s - match whitespaces character (eg spaces & tabs)
// \t - match a tab only 