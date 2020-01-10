import { Button } from "../../button/button"
import { Input } from "../input/input"
import { Title } from "../../title/title"


export class FormRadio {
    constructor(options) {
        Object.assign(this, options)

        this.title = new Title({
            node: this.node.querySelector('.form-radio_title')
        }) 
        this.input = new Input({
            node: this.node.querySelector('.form-radio_input')
        }) 
        this.button = new Button({
            node: this.node.querySelector('.form-radio_button')
        }) 

        this.button.onClick(() => {
            if(!this.input.checked) this.input.check()
        })
    }
}