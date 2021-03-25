import { Redirect } from "../index.js";

const style = `
    .container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // background-color: red;
    }

    .title{
        font-size: 5em;
        color: white;
    }

    .form_pin{
        display: flex;
        flex-direction: column;
        width: 20%;
        padding: 10px;
        background: white;
        border-radius: 5px;
    }

    input{
        height: 50px;
        border: 2px solid grey;
        border-radius: 5px;
        outline: none;
        text-align: center;
        font-size: 1.4em;
        font-weight: bold;
    }

    input::placeholder{
        color: rgba(127, 143, 166, .7);
    }

    button{
        margin-top: 5px;
        height: 50px;
        border: 2px solid grey;
        border-radius: 5px;
        outline: none;
        font-size: 1.6em;
        font-weight: bold;
        background-color: #273c75;
        color: white;
    }
`;

const userScreen = `
    <div class="container">
        <div class="title">KaFake!</div>
        <div class="form_pin">
            <input type="text" placeholder="GAME PIN">
            <button>Enter</button>
        </div>
    </div>
`;

async function getManyDoc(){
    const res = await firebase.firestore().collection('room').get();
    const users = getDataFromDocs(res.docs);
    return users;
}

function getDataFromDoc(doc){
    const data = doc.data();
    return data;
}

function getDataFromDocs(docs){
    return docs.map(getDataFromDoc);
}

class UserScreen extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
        this._shadowRoot.innerHTML = `
            <style>${style}</style>
            ${userScreen}
        `;
        this.Login();
    }

    async Login(){
        let data = await getManyDoc();
        this.shadowRoot.querySelector('button')
        .addEventListener('click', ()=>{
            const code = this.shadowRoot.querySelector('input').value;
            const info = data.map(function(value){return value.id});
            if(info.includes(code)){
                Redirect('login');
            }
            else{
                console.log('bad');
            }
        });
    }
}

window.customElements.define('user-screen', UserScreen);