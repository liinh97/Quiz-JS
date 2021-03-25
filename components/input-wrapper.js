class InputWrapper extends HTMLElement{
    
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode: 'open'})
        this.type = this.getAttribute('type')
        this.placeholder = this.getAttribute('placeholder')
        this.error = this.getAttribute('error')
        this._shadowDom.innerHTML = `
        <div>
            <input type="${this.type}" placeholder="${this.placeholder}">
            <div class="error"></div>
            </div>
        `
    }

    static get observedAttributes(){
        return ['error']
    }
    attributeChangedCallback(name, oldValue, newValue){
        if (name === 'error'){
            this._shadowDom.querySelector('.error').innerText = newValue
        }
    }

    getValue(){
        return this._shadowDom.querySelector('input').value
    }

    get value(){
        return this._shadowDom.querySelector('input').value
    }
}
window.customElements.define('input-wrapper', InputWrapper)