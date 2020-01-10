import { form, Button } from '../../../blocks'

export class FormQuantity {
    constructor(options) {
        Object.assign(this, options)
        this.minValue = this.minValue || 0
        this.maxValue = this.maxValue || Infinity

        this.initElements()
        this.initControls()
        this.initTitle()  
    }
    initElements() {
        this.elements = new Elements()

        this.node.querySelectorAll('.form-quantity_element').forEach((elementObject) => {
            let element = new Element({
                node: elementObject,
                minValue: this.minValue,
                maxValue: this.maxValue
            })

            element.buttons.remove.onClick = () => {
                element.input.removeQuantity()
                if(!this.elements.hasValues() && this.controls.node) this.controls.buttons.clear.hide()
                if(this.title.node) this.title.update()
            }
            element.buttons.add.onClick = () => {
                element.input.addQuantity()
                if(this.elements.hasValues() && this.controls.node) this.controls.buttons.clear.show()
                if(this.title.node) this.title.update()                
            }
            element.input.onChange = () => {
                element.input.verifyRange()
                if(this.elements.hasValues() && this.controls.node) this.controls.buttons.clear.show()
                else if(this.controls.node) this.controls.buttons.clear.hide()
                if(this.title.node) this.title.update()
            }

            this.elements.nodeList.push(element)
        })   
    }
    initControls() {
        this.controls = new Controls({
            node: this.node.querySelector('.form-quantity_controls')
        })

        if(this.controls.node) {
            this.controls.buttons.clear.onClick = () => {
                this.elements.clearValues()
                this.controls.buttons.clear.hide()
                if(this.title.node) this.title.update()
            } 
            
            if(!this.elements.hasValues()) this.controls.buttons.clear.hide()
        }   
    }
    initTitle(title = this.title) {
        this.title = new Title(title)

        this.title.generate = () => {
            let newTitle = ''

            this.elements.nodeList.forEach((element) => {
                if(this.title.type === 'separated') {
                    if((newTitle.length + element.titleLength) <= this.title.maxLength) {
                        if(element.input.getValue() !== '0') {
                            if(newTitle) newTitle += ', '
                            newTitle += element.input.getValue() + ' ' + element.title.toLowerCase()
                        }
                    } else {
                        newTitle += '...'
                    }
                } else {
                    newTitle = newTitle || 0
                    newTitle += parseInt(element.input.getValue())
                }
            })

            if(this.title.type === 'summury' && newTitle) newTitle = newTitle + ' ' + this.title.getDeclension(newTitle, this.title.declensions)
            
            return newTitle || this.title.default
        }

        this.title.update = () => {
            this.title.setValue(this.title.generate())            
        }
        
        if(this.title.node) {
            this.title.update()
        }   
    }
}
class Elements {
    constructor() {
        this.nodeList = []
    }
    hasValues() {
        return this.nodeList.some((element) => element.input.getValue() != false)
    }
    clearValues() {
        this.nodeList.forEach((element) => element.input.clear())
    }
}
class Element {
    constructor(options) {
        Object.assign(this, options)
        
        this.input = new form.Input({
            node: this.node.querySelector('.form-quantity_input'),
            minValue: this.minValue,
            maxValue: this.maxValue,
            verifyRange() {
                if(this.node.value < this.minValue) this.setValue(this.minValue)
                else if(this.node.value > this.maxValue) this.setValue(this.maxValue)
            },
            addQuantity() {
                this.setValue(this.getValue() -(- 1))
                this.verifyRange()
            },
            removeQuantity() {
                this.setValue(this.getValue() - 1)
                this.verifyRange()
            }
        })

        this.buttons = {
            remove: new Button({
                node: this.node.querySelector('.form-quantity_button_remove')
            }),
            add: new Button({
                node: this.node.querySelector('.form-quantity_button_add')
            })
        }

        this.title = this.node.textContent
        this.titleLength = this.input.node.value.length + this.title.length
    }
}
class Controls {
    constructor(options) {
        Object.assign(this, options)
        if(this.node) {
            this.buttons = {
                clear: new Button({
                    node: this.node.querySelector('.form-quantity_button_clear'),
                    hide() {
                        this.node.classList.add('form-quantity_button_hidden')
                    },
                    show() {
                        this.node.classList.remove('form-quantity_button_hidden')
                    }
                }),
                confirm: new Button({
                    node: this.node.querySelector('.form-quantity_button_confirm')
                })
            }
        }
    }
}
class Title {
    constructor(options) {
        Object.assign(this, options)
        if(this.node) {
            this.type = this.type || 'separated'
            this.default = this.default || this.setDefault()
            this.maxLength = this.node.offsetWidth / 10.5 // approximate letter space
        }
    }
    getValue() {
        if(this.node.nodeName === 'INPUT') return this.node.value
        else return this.node.textContent
    }
    setValue(newValue) {
        if(this.node.nodeName === 'INPUT') this.node.value = newValue
        else this.node.insertHTML = newValue        
    }

    setDefault() {
        this.default = this.getValue()
        return this.default
    }
    insertTitle() {
        if(this.node.nodeName === 'INPUT') this.node.value = this.value
        else this.node.innerHTML = this.value
    }
    getDeclension(num, expressions) {
        let result;
        let count = num % 100;
        if (count >= 5 && count <= 20) {
            result = expressions[2];
        } else {
            count = count % 10;
            if (count == 1) {
                result = expressions[0];
            } else if (count >= 2 && count <= 4) {
                result = expressions[1];
            } else {
                result = expressions[2];
            }
        }
        return result;
    }
}