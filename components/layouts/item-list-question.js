const style = `
    .item{
        width: 200px;
        height: 300px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 15px;
        box-shadow: 0 0 5px black;
        border-radius: 10px;
        cursor: pointer;
    }

    .item div{
        margin: 20px 0;
    }

    .test{
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
    }
`;

const itemListQuestion = `
`;

async function getManyDoc(){
    const res = await firebase.firestore().collection('cauhoi').get();
    const users = getDataFromDocs(res.docs);
    const arr = [];
    function getInfo(){
        let arrInfo = [];
        for(let i = 0; i < users.length; i++){
            arrInfo.push(res.docs[i].id);
        }
        return arrInfo;
    }
    arr.push(users, getInfo())
    // console.log(Object.entries(users[0])[0][1].answers[0]);
    // console.log(users[0].Q1.answers[0])
    return arr;
    // console.log(res.docs[0].id)
}

function getDataFromDoc(doc){
    const data = doc.data();
    return data;
}

function getDataFromDocs(docs){
    return docs.map(getDataFromDoc);
}

class ItemListQuestion extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
        this.addItem();
    }

    async addItem(){
        const item = await getManyDoc();
        // console.log(item[1]);
        let html = '';
        let index = -1;
        for(let i of item[0]){
            index++;
            html += `<div class="item" id="${item[1][index]}">
                        <div class="title">Category: <b>${i.topic}</b></div>
                        <div class="number__question">Questions: <b>${Object.values(item[0][index]).length-2}</b></div>
                        <div class="author">Author: <b>${i.author}</b></div>
                    </div>`;
        }


        // for(let i = 0; i < item.length; i++){
        //     // console.log(i);
        //     // function test(a,b,c){
        //         html += 
        //         `<div class="item">
        //             <div class="title">Category: <b></b></div>
        //             <div class="number__question">Questions: <b></b></div>
        //             <div class="author">Author: <b></b></div>
        //         </div>`;
        //     // }

        //     for (let property in item[i]){
        //         // test(item[i][property].topic, Object.values(item[i]).length, item[i][property].author);
        //         index += item[i][property].topic;
        //     }
        // }
        
        // -------------------------------------------------------------------------------------


        // for (let property in item[0]) {
        //     html += 
        //     `<div class="item">
        //     <div class="title">Category: <b>${item[0][property].topic}</b></div>
        //     <div class="number__question">Questions: <b>${Object.values(item[0]).length}</b></div>
        //     <div class="author">Author: <b>${item[0][property].author}</b></div>
        // </div>`
        // }
        // -------------------------------------------------------------------------------------------
        
        this._shadowRoot.innerHTML = `
                <style>${style}</style>
                <div class="test">${html}</div>
            `;
        
        this.item = this.shadowRoot.querySelectorAll('.item');
        let idQuestion = '';
        // for(let i = 0; i < this.item.length; i++){
        //     this.item[i].onclick = function(){
        //         idQuestion = $(this).attr('id');

        //         const data = {
        //             idRoom: '',
        //             idQuestion: idQuestion,
        //             question: 1,
        //             players: {},
        //         }

        //         firebase.firestore().collection('room').add(data)
        //         .then(docRef => {
        //             firebase.firestore().collection('room').doc(docRef.id).update({idRoom: docRef.id});
        //         });
        //     }
        // }
    }
}


window.customElements.define('item-list-question', ItemListQuestion);