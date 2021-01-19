// document.addEventListener('DOMContentLoaded', () =>{
//     document.getElementById('login-form').onsubmit = () =>{logInSubmit(); return false}
//     document.getElementById('login_fail').style.display = 'none';
// });

// function logInSubmit(){
//     //get the form and then loop through its elements searching for password and text type if they are empty highlight them
//     let form = document.getElementById('login-form');
//     let el = form.elements;
//     let success = false;
//     //add additional regex for checking the input

//     let email = document.getElementById('email_field');
//     let password = document.getElementById('pwd-input');
//     success = email.value && password.value ? true : false;
//     if(!success){
//         email.style.borderColor = !email.value ? 'red' : 'none';
//         password.style.borderColor = !password.value ? 'red' : 'none';

//     }

//     if(success){
//         fetch('/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email: email.value,
//                 password: password.value
//             })
//         })
//        .then(response =>{
//            if(response.redirected)
//            {
//                //if the server is redirecting the user then follow the url of the redirect
//                window.location.href = response.url;
//            }
//            else{
//             document.getElementById('login_fail').innerHTML = "Please enter a valid username and/or password"
//             document.getElementById('login_fail').style.display = 'block';
//             email.value = '';
//             password.value = '';
//             return false;
//            }
//        })
//     }
//     else{
//         document.getElementById('login_fail').innerHTML = "Please fill out all fields"
//         document.getElementById('login_fail').style.display = 'block';
//     }
//     email.value = '';
//     password.value = '';
//     return false;
    
// }
function getFormInputs(formId){
    let ins = []
    let form = document.querySelector(`#${formId}`)
    for (e of form.querySelectorAll('input,textarea')){
        let [typev,namev] = [e.getAttribute("type"),e.getAttribute("name")]
        if (namev && (typev == "text" || typev == "password")){
            ins.push(e)
        }
    }
    return ins
}
//from inputs return form data
function getFormData(formId){
    let fdata = new FormData()
    ins = getFormInputs(formId)
    csrf = document.querySelector("input[name='csrfmiddlewaretoken']")
    if (csrf) fdata.append("csrfmiddlewaretoken",csrf.value)
    ins.forEach(e => fdata.append(e.getAttribute("name"),e.value) )
    return fdata
}
function loginSubmit(){
    let fdata = getFormData("login-form")
    let success = true;
    let fins = getFormInputs("login-form")
    //add additional regex for checking the input
    fins.forEach( e => {
        if (!e.value){
            success = false
            e.style.borderColor = 'red';
            document.querySelector('#login_fail').innerHTML = "Please fill out all fields"
            document.querySelector('#login_fail').classList.toggle('d-none');
        }
    })
    if (!success){return}
    fetch('/register', {
        method: 'POST',
        body: fdata,
    }).then(response =>{
        if(response.redirected)
        {
            console.log("success")
            window.location.href = response.url;
        }
        else{
            fdata.forEach((i,k)=>{ console.log(`${i},${k}`)})
            console.log("failed")
            document.getElementById('login_fail').innerHTML = "Please enter a valid username and/or password"
            document.getElementById('login_fail').classList.toggle('d-none');
        }
    })
}
function registerSubmit(){
    let fdata = getFormData("register-form")
    let success = true;
    let fins = getFormInputs("register-form")
    //add additional regex for checking the input
    fins.forEach( e => {
        if (!e.value){
            success = false
            e.style.borderColor = 'red';
            document.querySelector('#login_fail').innerHTML = "Please fill out all fields"
            document.querySelector('#login_fail').classList.toggle('d-none');
        }
    })
    if (!success){return}
    fetch('/register', {
        method: 'POST',
        body: fdata,
    }).then(response =>{
        if(response.redirected)
        {
            console.log("success")
            window.location.href = response.url;
        }
        else{
            fdata.forEach((i,k)=>{ console.log(`${i},${k}`)})
            console.log("failed")
            document.getElementById('login_fail').innerHTML = "Please enter a valid username and/or password"
            document.getElementById('login_fail').classList.toggle('d-none');
        }
    })
}