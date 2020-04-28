import { Component } from '../../services/js/Component';
import { Input } from '../input/input';
import { Button } from '../button/button';

export class Dropdown extends Component {
	_targetNode = undefined;

	constructor(state) {
		require('./dropdown.sass');

		state = {
			template: require('./dropdown.pug'),
			open: false,
			text: '',
			...state,
		};

		super(state);
	}
	set text(text) {
		this.state.type === 'input'
			? (this.input.value = text)
			: (this.title.text = text);
	}

	setTarget(node) {
		this._targetNode = node;

		this._targetNode.classList.add('dropdown-target');

		!this.state.open && this._targetNode.classList.add('-hidden-');
	}
	render() {
		super.render();

		this.state.type === 'input' ? this.renderInput() : this.renderTitle();

		this.state.open ? this.node.classList.add('dropdown_open') : '';
	}
	renderInput() {
		this.input = new Input({
			className: 'dropdown-input',
			title: this.state.title,
			value: this.state.text,
			placeholder: this.state.placeholder,
			disabled: true,
			button: {
				className: 'dropdown-button',
			},
		});

		this.node.appendChild(this.input.node);
	}
	renderTitle() {
		const title = document.createElement('div');
		title.classList.add('dropdown-title');

		const header = document.createElement('h3');
		header.classList.add('dropdown-header');
		header.innerHTML = this.state.title;

		const button = new Button({
			className: 'dropdown-button',
		});

		title.appendChild(header);
		title.appendChild(button.node);

		this.node.appendChild(title);
	}
	handlers() {
		this.node.addEventListener('click', (event) => {
			event.preventDefault();

			this.state.open ? this.close() : this.open();
		});
	}
	close() {
		try {
			if (this.state.open) {
				this.state = { open: false };
				this.node.classList.remove('dropdown_open');
				this._targetNode.classList.add('-hidden-');
			}
		} catch (e) {
			console.error(`Для Dropdown не указан 'targetNode1' (${e})`);
		}
	}
	open() {
		try {
			if (!this.state.open) {
				this.state = { open: true };
				this.node.classList.add('dropdown_open');
				this._targetNode.classList.remove('-hidden-');
			}
		} catch (e) {
			console.error(`Для Dropdown не указан 'targetNode' (${e})`);
		}
	}
}
