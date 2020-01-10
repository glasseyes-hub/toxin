export class Input {
    constructor(options) {
        Object.assign(this, options)
        require("./jquery.maskedinput.js")

        this.addEvents()
    }
    addEvents() {
        this.node.addEventListener('onChange', () => {
            this.onChange()
        })
    }
    onChange() {
        console.log('onChange:')
        console.log(this.node)
    }
    setValue(newValue) {
        this.node.value = newValue
    }
    getValue() {
        return this.node.value
    }
    check() {
        this.node.checked = true
    }
    uncheck() {
        this.node.checked = false
    }
    isChecked() {
        return this.node.checked
    }
    clear() {
        this.node.value = 0
    }
    setMask(mask) {
        $(this.node).mask(mask);
    }
}