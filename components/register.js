const style = `
    .register{
        width: 23vw;
        height: 80vh;
        box-shadow: 0 0 10px black;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .title{
        color: white;
        font-size: 3vw;
        font-weight: bold;
        text-transform: uppercase;
        font-family: arial;
        margin-top: 4vw;
    }

    form{
        margin-top: 1.5vw;
    }

    .item{
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        width: 15vw;
    }

    label{
        font-size: 1.3vw;
        color: white;
    }

    input{
        width: 100%;
        height: 2vw;
        outline: none;
        border: 2px solid grey;
        text-align: center;
        font-weight: bold;
    }

    input:focus::placeholder{
        color: transparent;
    }

    .have__account{
        margin-top: 3vw;
        cursor: pointer;
        color: yellow;
    }

    #have__account:hover{
        text-decoration: underline;
    }

    .btn{
        text-aline: center
    }

    #register{
        margin-top: .5vw;
        width: 25%;
        height: 4%;
        font-weight: bold;
    }
    .error{
        text-color: red;
    }
`;
import { emailValid } from "../ulitis.js";
import { Redirect } from "../index.js";
const register = `
    <div class="register">
        <div class="title">Register</div>
        <form id="register-input">
            <div class="item">
                <label for="name">Name:</label>
                <input-wrapper id="name" type="text" placeholder="Enter your name">
            </div>
            <div class="item">
                <label for="email">Email:</label>
                <input-wrapper id="email" type="email" placeholder="Enter your email">
            </div>
            <div class="item">
                <label for="password">Password:</label>
                <input-wrapper id="password" type="password" placeholder="Enter your password">
            </div>
            <div class="item">
                <label for="re-password">Re-Password:</label>
                <input-wrapper id="re-password" type="password" placeholder="Enter your password again">
            </div>
            <button class="btn">Register</button>
        </form>
        <div id="have__account">If you have an account, let login</div>
    </div>
`;

class Register extends HTMLElement {
    constructor() {
        super();
        this._shadowDom = this.attachShadow({ mode: 'open' });
        this._shadowDom.innerHTML = `
        <style>${style}</style>
        ${register}
        `;

        this._shadowDom.getElementById('register-input')
            .addEventListener('submit', (events) => {
                events.preventDefault()
                const name = this._shadowDom.getElementById('name').value
                const email = this._shadowDom.getElementById('email').value
                const password = this._shadowDom.getElementById('password').value
                const rePassword = this._shadowDom.getElementById('re-password').value
                let isValid = true;
                if (name.trim() === '') {
                    this._shadowDom.getElementById('name')
                        .setAttribute('error', 'Please input full name')
                    isValid = false
                } else {
                    this._shadowDom.getElementById('name')
                        .setAttribute('error', '')
                }
                if (email.trim() === '') {
                    this._shadowDom.getElementById('email')
                        .setAttribute('error', 'Please input your email')
                    isValid = false
                } else if (!emailValid(email)) {
                    this._shadowDom.getElementById('email')
                        .setAttribute('error', 'Email dose not vaild')
                    isValid = false
                } else {
                    this._shadowDom.getElementById('email')
                        .setAttribute('error', '')
                }
                if (password.trim() === '') {
                    this._shadowDom.getElementById('password')
                        .setAttribute('error', 'Please input password')
                    isValid = false
                } else {
                    this._shadowDom.getElementById('password')
                        .setAttribute('error', '')
                }
                if (rePassword.trim() === '') {
                    this._shadowDom.getElementById('re-password')
                        .setAttribute('error', 'Please input password')
                    isValid = false
                } else if (password.trim() !== rePassword.trim()) {
                    this._shadowDom.getElementById('re-password')
                        .setAttribute('error', 'Please input the same password')
                    isValid = false
                } else {
                    this._shadowDom.getElementById('re-password')
                        .setAttribute('error', '')
                }
                if (isValid) {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((res) => {
                            alert('Success!')
                            firebase.auth().currentUser.sendEmailVerification()
                            firebase.auth().currentUser.updateProfile({
                                displayName: name
                            })
                            Redirect('home')
                        })
                        .catch((err) => {
                            alert(err.message)
                        })
                }
            });
        this._shadowDom.getElementById('have__account')
            .addEventListener('click', function(){
                Redirect('login')
            })
    }
}

window.customElements.define('register-form', Register);