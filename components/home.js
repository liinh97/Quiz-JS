const style = `
    .container{
        background: linear-gradient(140deg, rgba(94,82,189,1) 0%, rgba(183,189,195,1) 100%);
        width: 100%;
        height: 100%;
    }

    .container__title{
        position: absolute;
        top: 7%;
        left: 50%;
        transform: translate(-50%, -7%);
        font-size: 3rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 5px;
        color: white;
        text-shadow: -3px 3px 5px black;
    }

    .list__question{
        position: absolute;
        width: 80%;
        height: 60vh;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -60%);
    }

    .btn__create__question{
        width: 300px;
        height: 70px;
        cursor: pointer;
        background: white;
        font-weight: bold;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -25%);
    }
    .header {
        background-color: gray;
        height: 4%;
        width: 95%;
        transform: translate(-50%, -1250%);
        padding-left: 2.5%;
        padding-right: 2.5%;
        opacity: 0.8;
        position: absolute;
    }
    #option {
        height: 100%;
        text-align: center;
        float: left;
        display: flex;
        align-items: center;
        position: absolute;

    }

    #userName {
        height: 100%;
        float: right;
        display: flex;
        margin-right: 2.5%;
        align-items: center;
    }

    #logout {
        height: 100%;
        float: right;
        display: flex;
        align-items: center;
    }
    #logout:hover{
        text-decoration: underline;
    }
    #option:hover{
        text-decoration: underline;
    }
`;

const listQuestion = `
    <div class="container">  
        <div class="container__title">Question Available</div>
        <div class="list__question">
            <item-list-question></item-list-question>
        </div>
        <div class="btn__create__question">CREATE QUESTION</div>
    </div>
`;
import { Redirect } from "../index.js";
class Home extends HTMLElement {
    constructor() {
        super();
        this._shadowDom = this.attachShadow({ mode: 'open' });
        this._shadowDom.innerHTML = `
        <style>${style}</style>
        <div class="header">
            <div id=option>Home</div>
            <div id=logout>Logout</div>
            <div id=userName>Hello! ${currentUser.displayName}</div>
        </div>  
        ${listQuestion}
        `;
        this._shadowDom.getElementById('logout')
        .addEventListener('click', (e) => {
            e.preventDefault()
            firebase.auth().signOut().then(()=>{
                alert('Sign-out successful!')
            }).catch((error)=>{
                console.log(error)
            })
        })
        this._shadowDom.querySelector('.btn__create__question')
        .addEventListener('click', (events) => {
            events.preventDefault();
            Redirect('create-quiz')
        })
    }
}

window.customElements.define('home-user', Home);