import { Component } from '../../services/js/Component';

export class ImageSlider extends Component {
	constructor(state) {
		require('./imageSlider.sass');

		state = {
			template: require('./imageSlider.pug'),
			select: 0,
			...state,
		};

		super(state);
	}
	render() {
		super.render();
	}
	handlers() {
		const elements = this.node.querySelectorAll('.imageSlider-element');
		const buttons = this.node.querySelectorAll('.imageSlider-button');

		elements.forEach((element, index) => {
			index++;
			index = index > elements.length - 1 ? 0 : index;

			element.addEventListener('click', (event) => {
				event.preventDefault();
				this.select(index);
			});
		});

		buttons.forEach((button, index) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();
				this.select(index);
			});
		});
	}
	select(index) {
		this.list = this.list
			? this.list
			: this.node.querySelector('.imageSlider-list');
		this.buttons = this.buttons
			? this.buttons
			: this.node.querySelectorAll('.imageSlider-button');

		this.buttons[this.state.select].classList.remove(
			'imageSlider-button_selected'
		);
		this.buttons[index].classList.add('imageSlider-button_selected');

		this.list.scrollLeft = this.list.offsetWidth * index;

		this.state = { select: index };
	}
}
