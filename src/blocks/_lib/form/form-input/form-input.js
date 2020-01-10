import { form } from "../form"

export class FormInput {
    constructor(options) {
        Object.assign(this, options)
        this.input = new form.Input({
            node: this.node.querySelector('.form-input_input')
        })
    }
}