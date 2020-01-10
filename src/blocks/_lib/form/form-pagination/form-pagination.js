export const formPagination = {
    init(options) {
        new FormPagination(options)
    }
}

class FormPagination {
    constructor(options) {
        Object.assign(this, options)
        this.object = document.querySelector('.js_form-pagination')
        this.buttons = {
            dots: this.object.querySelectorAll('.form-pagination_button_dots'),
            prev: this.object.querySelector('.form-pagination_button_arrow_prev'),
            first: this.object.querySelector('.form-pagination_button_first'),
            current: this.object.querySelector('.form-pagination_button_current'),
            last: this.object.querySelector('.form-pagination_button_last'),
            next: this.object.querySelector('.form-pagination_button_arrow_next'),
        },
        this.title = {
            object: this.object.querySelector('.form-pagination_title'),
            showedContentStart: (this.currentPage - 1 ? this.currentPage - 1 : 1 / this.pageContent) * this.pageContent,
            showedContentEnd: this.currentPage * this.pageContent > this.allContent ? this.allContent : this.currentPage * this.pageContent,
        }
        this.title = {
            ...this.title,
            currentPages: `${this.title.showedContentStart} - ${this.title.showedContentEnd}`,
            allContent: `${this.allContent > 100 ? '100+' : this.allContent}`
        }

        this.updateButtons()
        this.udateTitle()
    }
    updateButtons(currentPage = this.currentPage) {
        this.updateButtonsValues(currentPage)
        this.hideUnusedButtons(currentPage)
    }
    udateTitle() {
        this.title.object.innerHTML =
            `${this.title.currentPages} из ${this.title.allContent} вариантов аренды`
    }
    hideUnusedButtons(currentPage) {
        this.hidePreviousButtons(currentPage)
        this.hideNextButtons(currentPage)
        if(this.pagesAmount <= 3) {
            this.hideSmallPaginationButtons(currentPage)   
        }
    }
    updateButtonsValues(currentPage) {
        this.buttons.current.previousSibling.previousSibling.innerHTML = currentPage - 2
        this.buttons.current.previousSibling.innerHTML = currentPage - 1
        this.buttons.current.innerHTML = currentPage
        this.buttons.current.nextSibling.innerHTML = currentPage + 1
        this.buttons.current.nextSibling.nextSibling.innerHTML = currentPage + 2
        this.buttons.last.innerHTML = this.pagesAmount
    }
    hidePreviousButtons(currentPage) {
        switch(currentPage) {
            case 1:
                this.buttons.prev.classList.add('form-pagination_button_hidden')
                this.buttons.current.previousSibling.classList.add('form-pagination_button_hidden')
            case 2:
                this.buttons.current.previousSibling.previousSibling.classList.add('form-pagination_button_hidden')
            case 3:
                this.buttons.first.classList.add('form-pagination_button_hidden')
            case 4:
                this.buttons.dots[0].classList.add('form-pagination_button_hidden')
                break
        }
    }
    hideNextButtons(currentPage) {
        switch(currentPage) {
            case this.pagesAmount:
                this.buttons.next.classList.add('form-pagination_button_hidden')
                this.buttons.current.nextSibling.classList.add('form-pagination_button_hidden')
            case this.pagesAmount - 1:     
                this.buttons.current.nextSibling.nextSibling.classList.add('form-pagination_button_hidden')        
            case this.pagesAmount - 2:
                this.buttons.last.classList.add('form-pagination_button_hidden')
            case this.pagesAmount - 3:
                this.buttons.dots[1].classList.add('form-pagination_button_hidden')
                break
        }
    }
    hideSmallPaginationButtons(currentPage) {        
        switch(currentPage) {
            case 3:
                this.buttons.current.nextSibling.classList.add('form-pagination_button_hidden')
                this.buttons.next.classList.add('form-pagination_button_hidden')
            case 2:
                this.buttons.last.classList.add('form-pagination_button_hidden')
            case 1:
                this.buttons.current.nextSibling.nextSibling.classList.add('form-pagination_button_hidden')
                this.buttons.dots[1].classList.add('form-pagination_button_hidden')
                break
        }
    }
}