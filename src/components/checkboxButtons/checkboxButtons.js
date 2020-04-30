import { Component } from '../../services/js/Component';
import { Checkbox } from '../checkbox/checkbox';
import { Title } from '../title/title';

export class CheckboxButtons extends Component {
	constructor(state) {
		require('./checkboxButtons.sass');

		state = {
			template: require('./checkboxButtons.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderTitle();
		this.renderCheckbox();
	}
	renderTitle() {
		const title = new Title({
			title: 'Checkbox buttons',
		});

		this.node.appendChild(title.node);
	}
	renderCheckbox() {
		const checkbox = new Checkbox({
			list: [
				{
					text: 'Можно курить',
					name: 'smoking',
					check: this.state.smoking || false,
				},
				{
					text: 'Можно с питомцами',
					name: 'pets',
					check: this.state.pets || false,
				},
				{
					text: 'Можно пригласить гостей (до 10 человек)',
					name: 'invitation',
					check: this.state.invitation || false,
				},
			],
		});

		checkbox.addObserver((state) => {
			const checks = state.list.reduce((acc, elem) => {
				acc[elem.name] = elem.check;
				return acc;
			}, {});

			this.state = { ...checks };
		});

		this.node.appendChild(checkbox.node);
	}
}
