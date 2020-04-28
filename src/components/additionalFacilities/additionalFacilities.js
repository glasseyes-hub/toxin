import { Component } from '../../services/js/Component';
import { Dropdown } from '../dropdown/dropdown';
import { Checkbox } from '../checkbox/checkbox';

export class AdditionalFacilities extends Component {
	constructor(state) {
		require('./additionalFacilities.sass');

		state = {
			template: require('./additionalFacilities.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderDropdown();
		this.renderCheckbox();
	}
	renderDropdown() {
		this.dropdown = new Dropdown({
			title: 'Дополнительные удобства',
		});

		this.node.appendChild(this.dropdown.node);
	}
	renderCheckbox() {
		const checkbox = new Checkbox({
			className: 'additionalFacilities-checkbox',
			list: [
				{
					text: 'Завтрак',
					name: 'dinner',
					check: this.state.dinner || false,
				},
				{
					text: 'Письменный стол',
					name: 'desk',
					check: this.state.desk || false,
				},
				{
					text: 'Стул для кормления',
					name: 'feedingchair',
					check: this.state.feedingchair || false,
				},
				{
					text: 'Кроватка',
					name: 'crib',
					check: this.state.crib || false,
				},
				{
					text: 'Телевизор',
					name: 'tv',
					check: this.state.tv || false,
				},
				{
					text: 'Шампунь',
					name: 'shampoo',
					check: this.state.shampoo || false,
				},
				{
					text: 'Телевизор',
					name: 'tv2',
					check: this.state.tv2 || false,
				},
				{
					text: 'Шампунь',
					name: 'shampoo2',
					check: this.state.shampoo2 || false,
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

		this.dropdown.setTarget(checkbox.node);

		this.node.appendChild(checkbox.node);
	}
}
