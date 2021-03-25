const style = `
    .create__room{
        height: 100vh;
        overflow: hidden;
    }

    .header{
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: #dcdde1;
        width: 100%;
        height: 3.5vw;
        box-shadow: 0 0 10px black;
    }

    .header button{
        width: 100px;
        height: 35px;
        margin: 0 5px;
        outline: none;
        border: none;
        cursor: pointer;
        box-shadow: 0 0 1px black;
        border-radius: 5px;
        font-size: 15px;
        font-weight: bold;
        color: #000;
    }

    .content{
        display: flex;
    }

    .content__question{
        width: 80%;
        height: 80vh;
        margin: 50px auto;
        box-shadow: 0 0 10px black;
        position: relative;
    }

    /* .question__number{
        position: absolute;
        left: 50%;
        top: -15%;
        transform: translate(-50%, -15%);
        font-size: 3vw;
        font-weight: bold;
        color: white;
        letter-spacing: 1px;
    } */

    .name{
        width: 70%;
        margin: 0 auto;
    }

    .name input{
        width: 100%;
        height: 100px;
        outline: none;
        font-size: 2.5vw;
        font-family: Aria;
        text-align: center;
        border: none;
        border-radius: 10px;
        transition: 1s;
        margin: 3vw auto;
    }

    .name input:focus{
        box-shadow: 0 0 20px black;
        transition: .5s;
    }

    .name input:focus::placeholder{
        color: transparent;
    }

    .option__anwser{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 8vw;
    }

    .option__anwser .item{
        width: 40%;
        background: white;
        height: 80px;
        margin: 5px;
        display: flex;
        border-radius: 10px;
        align-items: center;
    }

    .A,.B,.C,.D{
        font-size: 2vw;
        width: 9%;
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        margin-left: 10px;
        border-radius: 50%;
    }

    .A{
        background: blue;
    }

    .B{
        background: red;
    }

    .C{
        background: purple;
    }

    .D{
        background: black;
    }

    .option__anwser .item input{
        width: 80%;
        padding-left: 20px;
        outline: none;
        font-size: 2vw;
        font-family: aria;
        border: none;
    }

    .true__anwser__edit{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 4px solid white;
        margin: auto;
        box-shadow: 0 0 5px black;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3vw;
        color: white;
        font-weight: bold;
        margin-right: 15px;
    }
    .quiz__side{
        background: white;
        box-shadow: 0 0 10px black;
        width: 15vw;
        height: 100vh;
        overflow-x: auto;
    }

    .quiz__container{
        width: 86%;
        /*background: rgba(0, 168, 255, .2);*/
        padding: 20px;
        cursor: pointer;
    }

    .quiz__content{
        text-align: center;
        border: 1px solid black;
        margin: 10px 0;
        padding: 10px;
    }

    .quiz__title{
        margin: 10px 0;
    }

    .quiz__answer{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .quiz__answer .item{
        width: 40%;
        border: 1px solid black;
        height: 10px;
        margin: 5px;
    }

    #add-quiz{
        margin: 10px 4vw;
        width: 6vw;
    }
`;

const contentQuestion = `
    <div class="create__room">
        <div class="header">
            <button id="exit">Exit</button>
            <button id="done">Done</button>
        </div>
        <div class="content">
            <div class="quiz__side">
                <div class="quiz__container">
                    <div class="quiz__number">Quiz 1</div>
                    <div class="quiz__content">
                        <div class="quiz__title">HELLO WORLD</div>
                        <div class="quiz__answer">
                            <div class="item"></div>
                            <div class="item"></div>
                            <div class="item"></div>
                            <div class="item"></div>
                        </div>
                    </div>
                </div>
                <button id="add-quiz">Add Quiz</button>
            </div>
            <div class="content__question" vlaue="">
                <!-- <div class="question__number">
                    QUIZ 1
                </div> -->
                <div class="name">
                    <input id="name-quiz" type="text" placeholder="Click to start typing your question">
                </div>
                <div class="option__anwser">
                    <div class="item">
                        <div class="A">A</div>
                        <input id="anwser-A" type="text" placeholder="Add anwser A">
                        <div id="A" class="true__anwser"></div>
                    </div>
                    <div class="item">
                        <div class="B">B</div>
                        <input id="anwser-B" type="text" placeholder="Add anwser B">
                        <div id="B" class="true__anwser"></div>
                    </div>
                    <div class="item">
                        <div class="C">C</div>
                        <input id="anwser-C" type="text" placeholder="Add anwser C">
                        <div id="C" class="true__anwser"></div>
                    </div>
                    <div class="item">
                        <div class="D">D</div>
                        <input id="anwser-D" type="text" placeholder="Add anwser D">
                        <div id="D" class="true__anwser"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

async function getManyDoc(nameQuiz){
    const res = await firebase.firestore().collection('cauhoi').get();
    const users = getDataFromDocs(res.docs);
    
    for(let i = 0; i < users.length; i++){
        if(users[i].nameQuiz === nameQuiz){
            let value = '';
            value = res.docs[i].id;
            return value;
        }
    }
    // return users;
}

function getDataFromDoc(doc){
    const data = doc.data();
    return data;
}

function getDataFromDocs(docs){
    return docs.map(getDataFromDoc);
}

class ContentQuestion extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
        this._shadowRoot.innerHTML = `
        <style>${style}</style>
        ${contentQuestion}
        `;
        this.Input();
        this.SaveToFirebase();
    }

    Input(){
        this.inputsList = this.shadowRoot.querySelectorAll(".option__anwser input");
        for(let i = 0; i < this.inputsList.length; i++){
            this.inputsList[i].onkeyup = function(){
                let background = $(this).prev().css('background-color');
                if($(this).val() != ''){
                    $(this).css('background', background);
                    $(this).parent().css('background', background);
                    $(this).next().addClass('true__anwser__edit');
                }
                else{
                    $(this).parent().css('background', 'white');
                    $(this).css('background', 'white');
                    $(this).next().removeClass('true__anwser__edit');
                    $(this).next().text('');
                }
            }
        }

        this.checksList = this.shadowRoot.querySelectorAll(".true__anwser");
        for(let i = 0; i < this.checksList.length; i++){
            this.checksList[i].onclick = ()=>{
                $(this.checksList).text('');
			    $(this.checksList[i]).text('√');
            }
        }
    }

    SaveToFirebase(){
        this.shadowRoot.querySelector('#save')
        .addEventListener('click', async ()=>{
            const nameQuiz = this.shadowRoot.querySelector('#name-quiz').value.toLowerCase();
            const anwserA = this.shadowRoot.querySelector('#anwser-A').value;
            const anwserB = this.shadowRoot.querySelector('#anwser-B').value;
            const anwserC = this.shadowRoot.querySelector('#anwser-C').value;
            const anwserD = this.shadowRoot.querySelector('#anwser-D').value;
            let trueAnwser = '';

            this.checksList = this.shadowRoot.querySelectorAll(".true__anwser");
            for(let i = 0; i < this.checksList.length; i++){
                if($(this.checksList[i]).text() === '√'){
                    trueAnwser = $(this.checksList[i]).attr('id');
                }
            }

            const data = {
                nameQuiz: nameQuiz,
                anwserA: anwserA,
                anwserB: anwserB,
                anwserC: anwserC,
                anwserD: anwserD,
                trueAnwser: trueAnwser
            }

            const value = await getManyDoc(nameQuiz);

            if(nameQuiz.trim() !== '' && anwserA.trim() !== ''
            && anwserB.trim() !== '' && anwserC.trim() !== ''
            && anwserD.trim() !== '' && trueAnwser !== ''){
                if(value !== undefined){
                    firebase.firestore().collection("cauhoi").doc(value).update(data);
                    console.log('update!!!');
                }
                else{
                    firebase.firestore().collection('cauhoi').add(data);
                    console.log('added!!!');
                }
            }
            else{
                console.log('dien thong tin');
            }
        });
 
        this.shadowRoot.querySelector('#exit')
        .addEventListener('click', ()=>{
            this.test();
        })
    }

    test(){
        let a = $(this).parent().attr('value');
        setInterval(() => {
            // console.log($(this).parent().attr('value'))
        }, 1000);
        // if(a !== setInterval){
        //     console.log('nice')
        // }
        // console.log(b)
    }
}


window.customElements.define('content-question', ContentQuestion);