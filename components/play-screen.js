const style = `
    .container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .name{
        font-size: 4em;
        background-color: rgba(245, 246, 250,1.0);
        padding: 10px 40px;
        border-radius: 10px;
        box-shadow: 0 0 10px black;
        cursor: default;
    }

    .time{
        font-size: 7em;
        padding: 15px 25px;
        background-color: white;
        border-radius: 50%;
        cursor: default;
        font-weight: bold;
        margin: 7%;
    }

    .answers{
        /* background-color: white; */
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .option{
        display: flex;
        align-items: center;
        padding-left: 10px;
        margin: 3px;
        width: 45%;
        height: 80px;
        font-size: 2em;
        color: white;
        border-radius: 10px;
    }

    .A{
        background-color: red;
    }

    .B{
        background-color: blue;
    }

    .C{
        background-color: yellow;
    }

    .D{
        background-color: violet;
    }

    span{
        margin-left: 10px;
    }

    input{
        visibility: hidden;
    }

    .show--info{
        position: absolute;
        width: 100%;
        height: 100%;
        background: red;
        visibility: hidden;
    }
`;

let playScreen;

// function test(value){
//     playScreen = `
//         <div class="container">
//             <div class="name">${value}</div>
//             <div class="time">10</div>
//             <div class="answers">
//                 <div class="option A">
//                     <label for="A">A <span>1 chân</span></label>
//                     <input id="A" type="radio" name="answer">
//                 </div>
//                 <div class="option B">
//                     <label for="B">B <span>1 chân</span></label>
//                     <input id="B" type="radio" name="answer">
//                 </div>
//                 <div class="option C">
//                     <label for="C">C <span>1 chân</span></label>
//                     <input id="C" type="radio" name="answer">
//                 </div>
//                 <div class="option D">
//                     <label for="D">D <span>1 chân</span></label>
//                     <input id="D" type="radio" name="answer">
//                 </div>
//             </div>
//             <button id="next">CLICK</button>
//         </div>
//     `;
//     return playScreen;
// }


class PlayScreen extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
        this.NextQuestion();
    }

    async NextQuestion(){
        let db = firebase.firestore();
        let data = await db.collection('room').doc('oGe5gh800vHPq4A4vQc4').get();
        let question = 1;
        let idQuestion = data.data().idQuestion;
        let infoQuestion = await db.collection('cauhoi').doc(idQuestion).get();
        
        // test(infoQuestion.data()['Q'+question].name);
        this._shadowRoot.innerHTML = `
            <style>${style}</style>
            ${playScreen}
        `;

        firebase.firestore().collection("room")
        .onSnapshot((snapshot)=>{
            
            this._shadowRoot.innerHTML = `
                <style>${style}</style>
                <div class="container">
                    <div class="name">${infoQuestion.data()['Q'+question].name}</div>
                    <div class="time">10</div>
                    <div class="answers">
                        <div class="option A">
                            <label for="A">A <span>${infoQuestion.data()['Q'+question].answers[0]}</span></label>
                            <input id="A" type="radio" name="answer">
                        </div>
                        <div class="option B">
                            <label for="B">B <span>${infoQuestion.data()['Q'+question].answers[1]}</span></label>
                            <input id="B" type="radio" name="answer">
                        </div>
                        <div class="option C">
                            <label for="C">C <span>${infoQuestion.data()['Q'+question].answers[2]}</span></label>
                            <input id="C" type="radio" name="answer">
                        </div>
                        <div class="option D">
                            <label for="D">D <span>${infoQuestion.data()['Q'+question].answers[3]}</span></label>
                            <input id="D" type="radio" name="answer">
                        </div>
                    </div>
                    <button id="next">CLICK</button>
                    <div class="show--info">
                        <button id="test">CLICK ME<button>
                    </div>
                </div>
            `;
            
            this.shadowRoot.querySelector('#next')
            .addEventListener('click', ()=>{
                question++;
                this.shadowRoot.querySelector('.show--info').style.visibility = 'visible';
                if(question <= Object.values(infoQuestion.data()).length-2){
                    db.collection('room').doc('oGe5gh800vHPq4A4vQc4').update({question: question});
                }
            });

            this.shadowRoot.querySelector('#test')
            .addEventListener('click', ()=>{
                this.shadowRoot.querySelector('.show--info').style.visibility = 'hidden';
            });
            
        });
    }
}

window.customElements.define('play-screen', PlayScreen);