import { Component } from '../../services/js/Component';
import { Title } from '../title/title';

export class Checkbox extends Component {
	constructor(state) {
		require('./checkbox.sass');

		state = {
			template: require('./checkbox.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.state.title && this.renderTitle();
	}
	renderTitle() {
		const title = new Title({
			className: 'checkbox-title',
			title: this.state.title,
			subtitle: this.state.subtitle,
		});

		this.node.prepend(title.node);
	}
	handlers() {
		const elements = this.node.querySelectorAll('.checkbox-element');
		const list = this.state.list;

		elements.forEach((element, index) => {
			const input = element.querySelector('.checkbox-input');
			const button = element.querySelector('.checkbox-button');

			element.addEventListener('click', (event) => {
				event.preventDefault();

				if (list[index].check) {
					input.checked = false;
					button.classList.remove('checkbox-button_checked');
				} else {
					input.checked = true;
					button.classList.add('checkbox-button_checked');
				}

				list[index].check = !list[index].check;

				this.state = { list };
			});
		});
	}
}
