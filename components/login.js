const style = `
    .login{
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
        margin-top: 30px;
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

    #login{
        margin-top: .5vw;
        width: 25%;
        height: 4%;
        font-weight: bold;
    }
`;

const login = `
    <div class="login">
        <div class="title">Login</div>
        <form id='login-input'>
            <div class="item">
                <label for="email">Email:</label>
                <input-wrapper id="email" type="text" placeholder="Enter your email">
            </div>
            <div class="item">
                <label for="password">Password:</label>
                <input-wrapper id="password" type="password" placeholder="Enter your password">
            </div>
        </form>
        <button id="login">login</button>
        <div id="have__account">You don't have account?</div>
    </div>
`;
import { emailValid } from "../ulitis.js";
import { Redirect } from "../index.js";
class Login extends HTMLElement {
    constructor() {
        super();
        this._shadowDom = this.attachShadow({ mode: 'open' });
        this._shadowDom.innerHTML = `
        <style>${style}</style>
        ${login}
        `;
        this._shadowDom.getElementById('login')
            .addEventListener('click', (events) => {
                events.preventDefault()
                const email = this._shadowDom.getElementById('email').value
                const password = this._shadowDom.getElementById('password').value
                let isValid = true;
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
                if (isValid) {
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then((res) => {
                            alert(`Welcom ${user.dislayName}!`)
                            console.log(res)
                            // if (!res.user.emailVerified) {
                            //     alert('Please verified email!')
                            //     return
                            // }
                            const user = {
                                email: res.user.email,
                                dislayName: res.user.dislayName,
                                id: res.user.uid
                            }
                            window.currentUser = user
                            Redirect('home-user')
                        })
                        .catch((err) => {
                            alert(err.message)
                        })
                }
            });
        this._shadowDom.getElementById('have__account')
            .addEventListener('click', function () {
                Redirect('register')
            })
    }
}

window.customElements.define('login-form', Login);