export const formSlider = {
    init(formSliderClass) {
        document.querySelectorAll(formSliderClass).forEach(function(formSlider) {
            new FormSlider(formSlider)
        })
    }
}

class FormSlider {
    constructor(formSlider) {
        this.object = formSlider
        this.class = this.object.className
        this.width = this.object.offsetWidth
        this.container = {
            class: '.form-slider_container'
        }
        this.buttons = {
            class: '.form-slider_button'                
        }
        this.inputs = {
            class: '.form-slider_input'               
        }
        this.trace = {
            class: '.form-slider_trace'
        }   
        this.title = {
            class: '.form-slider_title > .title-subtext'
        }
        this.container.object = this.object.querySelector(this.container.class)
        this.buttons.list = this.object.querySelectorAll(this.buttons.class),
        this.buttons.buttonHalfWidth = this.buttons.list[0].offsetWidth / 2
        this.inputs.list = this.object.querySelectorAll(this.inputs.class)
        this.inputs.width = this.inputs.list[0].max - this.inputs.list[0].min
        this.inputs.scale = this.inputs.width / this.width
        this.trace.object = this.object.querySelector(this.trace.class)
        this.title.object = this.object.querySelector(this.title.class)

        this.init()
    }
    init() {                
        let _this = this

        for(let key in this.buttons.list) {
            if(this.buttons.list[key].style) this.buttons.list[key].style.left = (this.inputs.list[key].value / this.inputs.scale) - this.buttons.buttonHalfWidth + 'px'   
        }

        this.buttons.list.forEach(function(formSlider_button) {
            formSlider_button.addEventListener('mousedown', function() {
                _this.mouseDown(this)

                function formSlider_mouseMove(event) {
                    _this.mouseMove(event)
                }

                function formSlider_mouseUp() {
                    _this.mouseUp()

                    _this.container.object.removeEventListener('mousemove', formSlider_mouseMove)
                    document.removeEventListener('mouseup', formSlider_mouseUp)   
                }

                _this.container.object.addEventListener('mousemove', formSlider_mouseMove)
                document.addEventListener('mouseup', formSlider_mouseUp)
            })
        })

        this.updateTitle()
        this.updateTrace()
    }
    setCurrents(currentButton) {
        this.setCurrentObjects(currentButton).setCurrentIndexes().setCurrentSiblings().setCurrentPositions()
    }
    setCurrentObjects(currentButton) {
        this.buttons.current = {
            object: currentButton,
            name: currentButton.getAttribute('name')
        }            
        this.inputs.current = {
            object: this.object.querySelector(this.inputs.class + '[name=' + this.buttons.current.name + ']'),
            name: this.buttons.current.name
        } 
        return this           
    }
    setCurrentIndexes() {
        let _this = this
        this.buttons.list.forEach((formSlider_button, key) => {
            if(formSlider_button.getAttribute('name') === _this.buttons.current.name) {
                _this.buttons.current.index = key
                _this.inputs.current.index = key
            }
        })
        return this
    }
    setCurrentSiblings() {
        this.buttons.current.siblings = {
            previous: this.buttons.list[this.buttons.current.index - 1]?this.buttons.list[this.buttons.current.index - 1]:{value:null},
            next: this.buttons.list[this.buttons.current.index + 1]?this.buttons.list[this.buttons.current.index + 1]:{value:Infinity},
        }

        this.inputs.current.siblings = {
            previous: this.inputs.list[this.inputs.current.index - 1]?this.inputs.list[this.inputs.current.index - 1]:{value:null},
            next: this.inputs.list[this.inputs.current.index + 1]?this.inputs.list[this.inputs.current.index + 1]:{value:Infinity},
        }
        return this
    }
    setCurrentPositions() {
        this.inputs.current.position = this.inputs.current.object.value
        this.buttons.current.position =  this.inputs.current.position / this.inputs.scale - this.buttons.buttonHalfWidth
    }
    updateTitle() {
        let titleText = ''
        this.inputs.list.forEach((input, key) => {
            if(key) titleText += ' - '
            titleText += input.value + input.getAttribute('postfix')
        })
        this.title.object.textContent = titleText
        return this
    }
    updateTrace() {
        this.updateTracePosition()
        this.updateTraceStyle()
    }
    updateTracePosition() {
        let _this = this

        this.trace.start = this.width
        this.trace.end = 0

        this.inputs.list.forEach(formSlider_input => {
            if(formSlider_input.value / _this.inputs.scale < _this.trace.start) {
                _this.trace.start = formSlider_input.value / _this.inputs.scale
            }
            if(formSlider_input.value / _this.inputs.scale > _this.trace.end) {
                _this.trace.end = formSlider_input.value / _this.inputs.scale
            }
        })    
    }
    updateTraceStyle() {
        this.trace.object.style.left = this.trace.start + 'px'
        this.trace.object.style.width = this.width - this.trace.start - (this.width -  this.trace.end) + 'px'
    }
    mouseDown(currentButton) {   
        this.buttons.list.forEach((formSlider_button) => formSlider_button.style.zIndex = -1)
        this.setCurrents(currentButton)
    }
    mouseUp() {
        this.buttons.list.forEach((formSlider_button) => formSlider_button.style.zIndex = 0)

        this.buttons.current = {}
        this.inputs.current = {}
    }
    mouseMove(event) {           
        let isMaxValue = (this.width / event.offsetX < 1.01)?true:false
        this.inputs.current.position = isMaxValue?this.inputs.list[0].max:(event.offsetX * this.inputs.scale)
        this.buttons.current.position = event.offsetX - this.buttons.buttonHalfWidth

        this.inputs.current.object.value = this.inputs.current.position
        this.buttons.current.object.style.left = this.buttons.current.position + 'px'                 

        if(this.inputs.current.position < this.inputs.current.siblings.previous.value) {
            this.setCurrents(this.buttons.current.siblings.previous)
        } else if(this.inputs.current.position > this.inputs.current.siblings.next.value) {
            this.setCurrents(this.buttons.current.siblings.next)
        }

        this.updateTitle()
        this.updateTrace()
    }
}