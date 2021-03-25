import { Redirect } from "../index.js";

const style = `
    .create__room{
        height: 100vh;
        width: 115vh;

        // overflow: hidden;
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

    .create_quiz{
        width: 80%;
        height: 80vh;
        margin: 50px auto;
        box-shadow: 0 0 10px black;
        position: relative;
    }

    .question__container{
        position: absolute;
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
        background: yellow;
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

    .list_quiz{
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
        position: relative;
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

const createQuiz = `
    <div class="create__room">
        <div class="header">
            <button id="exit">Exit</button>
            <button id="done">Done</button>
        </div>
        <div class="content">
            <div class="list_quiz">
                <div class="quiz__container">
                    <div class="quiz__number">Quiz 1</div>
                    <div class="quiz__content">
                        <div class="quiz__title">Question</div>
                        <div class="quiz__answer">
                            <div class="item"></div>
                            <div class="item"></div>
                            <div class="item"></div>
                            <div class="item"></div>
                        </div>
                    </div>
                    <div style="position: absolute;top:50%; left: 10px; background-color: red; cursor: default; z-index: 10" class="remove__quiz">xoa</div>
                </div>
                
                <button id="add-quiz">Add Quiz</button>
            </div>
            <div class="create_quiz">
                <div class="question__container">
                    <!-- <div class="question__number">
                        QUIZ 1
                    </div> -->
                    <div class="name">
                        <input class="name__quiz" onchage="" type="text" placeholder="Click to start typing your question">
                    </div>
                    <div class="option__anwser">
                        <div class="item">
                            <div class="A">A</div>
                            <input class="anwser__A" type="text" placeholder="Add anwser A">
                            <div id="A" class="true__anwser"></div>
                        </div>
                        <div class="item">
                            <div class="B">B</div>
                            <input class="anwser__B" type="text" placeholder="Add anwser B">
                            <div id="B" class="true__anwser"></div>
                        </div>
                        <div class="item">
                            <div class="C">C</div>
                            <input class="anwser__C" type="text" placeholder="Add anwser C">
                            <div id="C" class="true__anwser"></div>
                        </div>
                        <div class="item">
                            <div class="D">D</div>
                            <input class="anwser__D" type="text" placeholder="Add anwser D">
                            <div id="D" class="true__anwser"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

async function getManyDoc(nameQuiz){
    // const res = await firebase.firestore().collection('cauhoi').get();
    // const users = getDataFromDocs(res.docs);
    
    // for(let i = 0; i < users.length; i++){
    //     if(users[i].nameQuiz === nameQuiz){
    //         let value = '';
    //         value = res.docs[i].id;
    //         return value;
    //     }
    // }
    return nameQuiz;
}

function getDataFromDoc(doc){
    const data = doc.data();
    return data;
}

function getDataFromDocs(docs){
    return docs.map(getDataFromDoc);
}

class CreateQuiz extends HTMLElement{
    constructor(){
        super();
        this._shadowDOM = this.attachShadow({mode:'open'});
        this._shadowDOM.innerHTML = `
        <style>${style}</style>
        ${createQuiz}
        `;
        this.Input();
        this.SaveToFirebase();
        this.AddQuiz();
        this.ChooseQuiz();
        this.RemoveQuiz();
        this.BackHome();
        this.UpdateList();
        this.upQuiz = 2;
    }

    BackHome(){
        this._shadowDOM.getElementById('exit')
        .addEventListener('click', function(){
            Redirect('home-user')
        })
    }
    Input(){
        this.inputsList = this._shadowDOM.querySelectorAll(".option__anwser input");
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
        this.checksList = this._shadowDOM.querySelectorAll(".true__anwser");
        for(let i = 0; i < this.checksList.length; i++){
            this.checksList[i].onclick = ()=>{
                if($(this.checksList[i]).text() === ''){
                    $(this.checksList[i]).text('√');
                    $(this.checksList[i]).attr('check', 'true');
                }
                else{
                    $(this.checksList[i]).text('');
                    $(this.checksList[i]).attr('check', 'false');
                }
            }
        }
    }

    SaveToFirebase(){
        this._shadowDOM.querySelector('#done')
        .addEventListener('click', async ()=>{
            this.nameQuiz = this._shadowDOM.querySelectorAll('.name__quiz');
            this.anwserA = this._shadowDOM.querySelectorAll('.anwser__A');
            this.anwserB = this._shadowDOM.querySelectorAll('.anwser__B');
            this.anwserC = this._shadowDOM.querySelectorAll('.anwser__C');
            this.anwserD = this._shadowDOM.querySelectorAll('.anwser__D');
            let trueAnwser = [];
            let notEmpty = 0;

            this.checksList = this._shadowDOM.querySelectorAll(".true__anwser");
            for(let i = 0; i < this.checksList.length; i++){
                if($(this.checksList[i]).text() === '√'){
                    trueAnwser.push($(this.checksList[i]).attr('id'))
                }
            }
            // let CauHoi = 1;

            var listCauHoi = {};
            // let CauHoi = {
            //     answer: [],
            //     correctAnswer: 0,
            //     name: '',
            // }
            // listCauHoi.CauHoi.answer.push(answer);
            let Q = 0;
            for(let i = 0; i < this.nameQuiz.length; i++){
                Q ++;
                listCauHoi['Q'+Q] = {
                    answer: [
                        $(this.anwserA).eq(i).val(),
                        $(this.anwserB).eq(i).val(),
                        $(this.anwserC).eq(i).val(),
                        $(this.anwserD).eq(i).val()
                    ],
                    correctAnswer: trueAnwser[i],
                    name: $(this.nameQuiz).eq(i).val().toLowerCase(),
                }
                // console.log(cauHoi);
                // listCauHoi = 
                
                // CauHoi.answer.push(answer);
                // listCauHoi.CauHoi.correctAnswer = trueAnwser[i];
                // listCauHoi.CauHoi.name = $(this.nameQuiz).eq(i).val().toLowerCase();
                

                

                // if(data.nameQuiz.trim() !== '' && data.anwserA.trim() !== ''
                // && data.anwserB.trim() !== '' && data.anwserC.trim() !== ''
                // && data.anwserD.trim() !== '' && trueAnwser.length == this.nameQuiz.length){
                //     notEmpty++;
                // }


                // if(this.nameQuiz.length == notEmpty){
                //     // firebase.firestore().collection('cauhoi').add(data);
                //     console.log('nice')
                // }
                // else{
                //     console.log('Please input full empty')
                // }

                // if(data.nameQuiz.trim() !== '' && data.anwserA.trim() !== ''
                // && data.anwserB.trim() !== '' && data.anwserC.trim() !== ''
                // && data.anwserD.trim() !== '' && trueAnwser.length == this.nameQuiz.length){
                //     // if(value !== undefined){
                //     //     // firebase.firestore().collection("cauhoi").doc(value).update(data);
                //     //     console.log('update!!!');
                //     // }
                //     // else{
                //     //     // firebase.firestore().collection('cauhoi').add(data);
                //     //     console.log('added!!!');
                //     // }
                //     console.log('add')
                // }
                // else{
                //     console.log('dien thong tin');
                // }
                // firebase.firestore().collection('cauhoi').add(data);
            }
            listCauHoi['author'] = currentUser.displayName;
            // firebase.firestore().collection('cauhoi').add(listCauHoi);
            // const value = await getManyDoc(this.nameQuiz);
            // console.log(value);
            // if(this.nameQuiz.trim() !== '' && this.anwserA.trim() !== ''
            // && this.anwserB.trim() !== '' && this.anwserC.trim() !== ''
            // && this.anwserD.trim() !== '' && trueAnwser !== ''){
            //     if(value !== undefined){
            //         // firebase.firestore().collection("cauhoi").doc(value).update(data);
            //         console.log('update!!!');
            //     }
            //     else{
            //         // firebase.firestore().collection('cauhoi').add(data);
            //         console.log('added!!!');
            //     }
            // }
            // else{
            //     console.log('dien thong tin');
            // }
        });
    }

    AddQuiz(){
        this._shadowDOM.querySelector('#add-quiz')
        .addEventListener('click', ()=>{
            let htmlAdd = document.createElement('div');
            this.upQuiz += 1;
            htmlAdd.setAttribute('class', 'quiz__container');
            htmlAdd.innerHTML = `
                <div class="quiz__number" value="${this.upQuiz-1}">Quiz ${this.upQuiz-1}</div>
                <div class="quiz__content">
                    <div class="quiz__title">Question</div>
                    <div class="quiz__answer">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                    </div>
                </div>
                <div style="position: absolute;top:50%; left: 10px; background-color: red; cursor: default; z-index: 10" class="remove__quiz">xoa</div>`;
            this.htmlAddNew = this._shadowDOM.querySelector('.list_quiz');
            this.htmlAddNew.insertBefore(htmlAdd, this.htmlAddNew.children[this.upQuiz - 2]);
            this.ChooseQuiz();

            let htmlContent = document.createElement('div');
            htmlContent.setAttribute('class', 'question__container');
            htmlContent.setAttribute('value', this.upQuiz-1);
            htmlContent.innerHTML = `
                <div class="name">
                    <input class="name__quiz" type="text" placeholder="Click to start typing your question">
                </div>
                <div class="option__anwser">
                    <div class="item">
                        <div class="A">A</div>
                        <input class="anwser__A" type="text" placeholder="Add anwser A">
                        <div id="A" class="true__anwser"></div>
                    </div>
                    <div class="item">
                        <div class="B">B</div>
                        <input class="anwser__B" type="text" placeholder="Add anwser B">
                        <div id="B" class="true__anwser"></div>
                    </div>
                    <div class="item">
                        <div class="C">C</div>
                        <input class="anwser__C" type="text" placeholder="Add anwser C">
                        <div id="C" class="true__anwser"></div>
                    </div>
                    <div class="item">
                        <div class="D">D</div>
                        <input class="anwser__D" type="text" placeholder="Add anwser D">
                        <div id="D" class="true__anwser"></div>
                    </div>
                </div>`;
            this.htmlContentNew = this._shadowDOM.querySelector('.create_quiz');
            this.htmlContentNew.appendChild(htmlContent);
            this.Input();
            this.ChooseQuiz();
            this.RemoveQuiz();
        });
    }
    UpdateList(){
        this._shadowDOM.querySelector('.name__quiz')
        .addEventListener('change', (changed)=>{
            changed.preventDefault()
            let questionUpdate = this._shadowDOM.querySelector('.name__quiz').value
            if (questionUpdate!==''){
                let newData = this._shadowDOM.querySelector('.quiz__title').innerText
                console.log(newData)
                this._shadowDOM.querySelector('.quiz__title').innerText = questionUpdate
                }else{
                this._shadowDOM.querySelector('.quiz__title').innerText = 'Question'
                }
        })
    }
    ChooseQuiz(){
        this.quizList = this._shadowDOM.querySelectorAll(".quiz__container");
        this.questionslist = this._shadowDOM.querySelectorAll(".question__container");
        for(let i = 0; i < this.quizList.length; i++){
            this.quizList[i].onclick = ()=>{
                $(this.quizList).css('background', 'rgba(0, 168, 255, 0)');
                $(this.quizList[i]).css('background', 'rgba(0, 168, 255, .1)');
                $(this.questionslist).css('z-index', '0');
                $(this.questionslist).eq(i).css('z-index', '1');
            }
        }
    }

    RemoveQuiz(){
        this.htmlAddRemove = this._shadowDOM.querySelector('.list_quiz');
        this.htmlContentRemove = this._shadowDOM.querySelector('.create_quiz');
        this.removeQuiz = this._shadowDOM.querySelectorAll('.remove__quiz');
        for(let i = 0; i < this.removeQuiz.length; i++){
            this.removeQuiz[i].onclick = ()=>{
                this.upQuiz--;
                this.htmlAddRemove.removeChild(this.htmlAddRemove.childNodes[i]);
                this.htmlContentRemove.removeChild(this.htmlContentRemove.childNodes[i]);
                console.log(i);
            }
        }
    }
}


window.customElements.define('create-quiz', CreateQuiz);