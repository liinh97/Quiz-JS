import './components/register.js';
import './components/login.js';
import './components/create-quiz.js';
import './components/home.js';
import './components/user-screen.js';
import './components/play-screen.js';
import './components/layouts/item-list-question.js';
import './components/input-wrapper.js';
// import './components/layouts/content-question.js';
// import './components/layouts/add-quiz.js';



export function Redirect(screenName){

    if(screenName === 'login'){
        document.querySelector('#app').innerHTML = '<login-form></login-form>';
    }
    else if(screenName === 'register'){
        document.querySelector('#app').innerHTML = '<register-form></register-form>';
    }
    else if(screenName === 'home-user'){
        document.querySelector('#app').innerHTML = '<home-user></home-user>';
    }
    else if(screenName === 'create-quiz'){
        document.querySelector('#app').innerHTML = '<create-quiz></create-quiz>';
    }
}

firebase.auth().onAuthStateChanged(function(userLogedIn){
    if (userLogedIn){
        window.currentUser={
            id: userLogedIn.uid,
            email: userLogedIn.email,
            displayName: userLogedIn.displayName
        }
        Redirect('home-user');    
    } else {
        Redirect('register');
    }
    console.log(userLogedIn);
})

