import { Component } from '../../services/js/Component';
import { Dropdown } from '../dropdown/dropdown';
import { Checkbox } from '../checkbox/checkbox';

export class AdditionalFacilities extends Component {
	constructor(state) {
		require('./additionalFacilities.sass');

		state = {
			template: require('./additionalFacilities.pug'),
			title: 'Дополнительные удобства',
			dinner: false,
			desk: false,
			feedingchair: false,
			crib: false,
			tv: false,
			shampoo: false,
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
			title: this.state.title,
			subtitle: this.state.subtitle,
			open: this.state.open,
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
					check: this.state.dinner,
				},
				{
					text: 'Письменный стол',
					name: 'desk',
					check: this.state.desk,
				},
				{
					text: 'Стул для кормления',
					name: 'feedingchair',
					check: this.state.feedingchair,
				},
				{
					text: 'Кроватка',
					name: 'crib',
					check: this.state.crib,
				},
				{
					text: 'Телевизор',
					name: 'tv',
					check: this.state.tv,
				},
				{
					text: 'Шампунь',
					name: 'shampoo',
					check: this.state.shampoo,
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
