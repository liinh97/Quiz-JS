const style = `
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

let addQuiz = `
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
    <input id="email" type="hidden">
    </div>
`;

class AddQuiz extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
        this._shadowRoot.innerHTML = `
            <style>${style}</style>
            ${addQuiz}`;
        this.AddQuiz();
    }

    AddQuiz(){
        let upQuiz = 1;
        this.shadowRoot.querySelector('#add-quiz')
        .addEventListener('click', ()=>{
            let html = document.createElement('div');
            upQuiz += 1;

            html.setAttribute('class', 'quiz__container');
            html.innerHTML = `
                <div class="quiz__number">Quiz ${upQuiz}</div>
                <div class="quiz__content">
                    <div class="quiz__title">HELLO WORLD</div>
                    <div class="quiz__answer">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                    </div>
                </div>`;
            this.addNew = this.shadowRoot.querySelector('.quiz__side');
            this.addNew.insertBefore(html, this.addNew.children[upQuiz - 1]);
            this.ChooseQuiz();
        });
        this.ChooseQuiz();
        console.log(upQuiz);
    }

    ChooseQuiz(){
        this.quizsList = this.shadowRoot.querySelectorAll(".quiz__container");
        for(let i = 0; i < this.quizsList.length; i++){
            this.quizsList[i].onclick = ()=>{
                $(this.quizsList).css('background', 'rgba(0, 168, 255, 0)');
                $(this.quizsList[i]).css('background', 'rgba(0, 168, 255, .2)');
                // this.shadowRoot.querySelector('input').setAttribute('value', this.shadowRoot.querySelectorAll('.quiz__number')[i].textContent);
                // let valueInput = this.shadowRoot.querySelector('input').value;
                this._shadowRoot.getElementById('email').setAttribute('error', 'Please!!! Input Your Email');
                // console.log(valueInput);
                $(this).parent().attr('value', this.shadowRoot.querySelectorAll('.quiz__number')[i].textContent)
            }
        }
    }
}
window.customElements.define('add-quiz', AddQuiz);