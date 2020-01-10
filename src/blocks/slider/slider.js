import { Button } from "../_lib/button/button"

export class Slider {
    constructor(options) {
        Object.assign(this, options)
        this.elements = {
            nodeList: this.node.querySelectorAll('.slider_container_elements > *'),
            container: {node: this.node.querySelector('.slider_container_elements')}
        }
        this.elements.container.width = this.elements.container.node.offsetWidth

        this.buttons = {
            container: {node: this.node.querySelector('.slider_container_buttons')},
            clearSelected: function(){
                this.container.node.querySelector('.slider_button_selected')
                    .classList.remove('slider_button_selected')
            },
            setSelected: function(button) {
                this.clearSelected()
                button.classList.add('slider_button_selected')
            }
        }

        this.addButtons()
    }
    addButtons() {
        this.elements.nodeList.forEach((element, index) => {
            let button = new Button({class: 'slider_button'})
            if(!index) button.node.classList.add('slider_button_selected')
            this.buttons.container.node.append(button.node)

            button.onClick(() => {
                this.elements.container.node.scrollLeft = this.elements.container.width * index 
                this.buttons.setSelected(button.node)
            })
        })

    }
}