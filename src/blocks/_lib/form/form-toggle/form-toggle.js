import { Input } from "../input/input"
import { Title } from "../../title/title"
import { Button } from "../../button/button"

export class FormToggle {
    constructor(options) {
        Object.assign(this, options)

        this.input = new Input({
            node: this.node.querySelector('.form-toggle_input')
        }) 
        this.title = new Title({
            node: this.node.querySelector('.form-toggle_title')
        })
        this.button = new Button({
            node: this.node.querySelector('.form-toggle_button')
        })

        this.button.onClick(() => {
            if(!this.input.checked) this.input.check()
            else this.input.uncheck()
        })
    }
}
