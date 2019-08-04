let nameError = document.getElementById('name-error');
let emailidError = document.getElementById('email-error');
let dobError = document.getElementById('dob-error');
let passwordError = document.getElementById('password-error');
let cnfPasswordError = document.getElementById('cnf-password-error');

const signUp = document.getElementById('sign-up');

const makeNewUserObject = (name,emailId,dob,password) => { 
    
    return new Promise ((resolve,reject) => {
        obj = {
            name : name,
            emailid : emailId,
            dob : dob,
            password : password
        };
        resolve(obj);
    });
}

const sendNewUserObject = (user) => {
    $.post("http://localhost:5000/twitter/signup",user,(data,status,xhr) => {
        console.log(data);
        console.log(status);
        console.log(xhr);
    },"json");
}

const validateName = (name) => {
    let validationResult = false;
    return new Promise((resolve,reject) => {
        if(name==""){
            nameError.style.visibility = "visible";
            nameError.innerHTML = "Please Enter Your Name";
        }
        //else if() {}
        else{
            nameError.style.visibility = "hidden";
            validationResult = true;
        }
        validationResult ? resolve(): reject();
    });
}

const validateEmailId = (emailid) => {
    let validationResult = false;
    return new Promise((resolve,reject) => {
        if(emailid==""){
            emailidError.style.visibility = "visible";
            emailidError.innerHTML = "Please Enter Your Email-ID";
        }
        else{
            emailidError.style.visibility = "hidden";
            validationResult = true;
        }
        validationResult ? resolve(): reject();
    });
}

const validateDob = (dob) => {
    let validationResult = false;
    return new Promise((resolve,reject) => {
        if(dob=="") {
            dobError.style.visibility = "visible";
            dobError.innerHTML = "Please Enter Your Birth Date";
        }
        else {
            dobError.style.visibility = "hidden";
            validationResult = true;
        }
        validationResult ? resolve(): reject();
    });
}

const validatePassword = (password) => {
    let validationResult = false;
    return new Promise((resolve,reject) => {
        if(password=="") {
            passwordError.style.visibility = "visible";
            passwordError.innerHTML = "Please Enter Password";
        }
        else {
            passwordError.style.visibility = "hidden";
            validationResult = true;
        }
        validationResult ? resolve(): reject();
    });
}

const validateCnfPassword = (confirmPassword) => {
    let validationResult = false;
    return new Promise((resolve,reject) => {
        if(confirmPassword=="") {
            cnfPasswordError.style.visibility = "visible";
            cnfPasswordError.innerHTML = "Please Enter Correct Password";
        }
        else {
            cnfPasswordError.style.visibility = "hidden";
            validationResult = true;
        }
        validationResult ? resolve(): reject();
    });
}


const validateNewUser = async (event,callback) => {

    let name = document.getElementById('user-name').value;
    let emailid = document.getElementById('user-email').value;
    let dob = document.getElementById('user-dob').value;
    let password = document.getElementById('user-password').value;
    let confrimPassword = document.getElementById('cnf-password').value;

    try{
        await Promise.all([validateName(name),validateDob(dob),validateEmailId(emailid),validatePassword(password),validateCnfPassword(confrimPassword)]);
        const userObject = await makeNewUserObject(name,emailid,dob,password);
        callback(userObject);
    }
    catch(error) {
        console.log(error);
    }
}

const callback = (userObject) => {
    sendNewUserObject(userObject);
}


signUp.addEventListener("click",function(event) {
    validateNewUser(event,callback);
});

