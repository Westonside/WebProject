document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('login-form').onsubmit = logInSubmit;
    document.getElementById('login_fail').style.display = 'none';
});

function logInSubmit(){
    //get the form and then loop through its elements searching for password and text type if they are empty highlight them
    let form = document.getElementById('login-form');
    let el = form.elements;
    let success = false;
    //add additional regex for checking the input

    let email = document.getElementById('email_field');
    let password = document.getElementById('password_field');
    success = email.value && password.value ? true : false;
    if(!success){
        email.style.borderColor = !email.value ? 'red' : 'none';
        password.style.borderColor = !password.value ? 'red' : 'none';

    }

    if(success){
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
       .then(response =>{
           if(response.redirected)
           {
               //if the server is redirecting the user then follow the url of the redirect
               window.location.href = response.url;
           }
           else{
            document.getElementById('login_fail').innerHTML = "Please enter a valid username and/or password"
            document.getElementById('login_fail').style.display = 'block';
           }
       })
    }
    else{
        document.getElementById('login_fail').innerHTML = "Please fill out all fields"
        document.getElementById('login_fail').style.display = 'block';
    }
    return false;
    
}