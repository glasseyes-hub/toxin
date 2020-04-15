import { Component } from '../../../services/js/Component';
import { Dropdown } from '../dropdown/dropdown';
import { Counter } from '../counter/counter';

export class Facilities extends Component {
	constructor(state) {
		require('./facilities.sass');

		state = {
			template: require('./facilities.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.renderDropdown();
		this.renderCounter();
	}
	renderDropdown() {
		this.dropdown = new Dropdown({
			open: this.state.open,
			className: 'facilities-dropdown',
			type: 'input',
			title: 'Удобства номера',
			placeholder: 'Выберите удобства',
		});

		this.node.appendChild(this.dropdown.node);
	}
	renderCounter() {
		this.counter = new Counter({
			className: 'facilities-counter',
			list: [
				{ text: 'Спальни', name: 'bedrooms', value: this.state.bedrooms || 0 },
				{ text: 'Кровати', name: 'beds', value: this.state.beds || 0 },
				{
					text: 'Ванные комнаты',
					name: 'bathrooms',
					value: this.state.bathrooms || 0,
				},
			],
		});

		this.counter.addObserver((state) => {
			this.setDropdownText();
			this.controls && this.dropdown.close();

			const values = state.list.reduce((acc, elem) => {
				acc[elem.name] = elem.value;
				return acc;
			}, {});

			this.state = { ...values };
		});

		this.setDropdownText();

		this.dropdown.setTarget(this.counter.node);

		this.node.appendChild(this.counter.node);
	}
	setDropdownText() {
		let groups = [
			{
				declension: ['спальня', 'спальни', 'спален'],
				text: ['Спальни'],
				value: 0,
			},
			{
				declension: ['кровать', 'кровати', 'кроватей'],
				text: ['Кровати'],
				value: 0,
			},
			{
				declension: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
				text: ['Ванные комнаты'],
				value: 0,
			},
		];

		groups = groups.map((element) => {
			element.text.forEach((text) => {
				this.counter.state.list.forEach((counterElement) => {
					if (counterElement.text === text)
						element.value += +counterElement.value;
				});
			});

			return element;
		});

		const text = groups.reduce((acc, group) => {
			if (!group.value) return acc;
			if (acc) acc += ', ';

			acc +=
				group.value + ' ' + this.getDeclension(group.value, group.declension);

			return acc;
		}, '');

		this.dropdown.text = this.prepareTextByLength(text);
	}
	prepareTextByLength(text) {
		const maxLength = 30;

		return text.split(', ').reduce((acc, word) => {
			if (!acc) return word;
			if ((acc + ', ' + word).length > maxLength) return acc + '...';

			return acc + ', ' + word;
		});
	}
	getDeclension(value, declension) {
		let result;
		let count = value % 100;
		if (count >= 5 && count <= 20) {
			result = declension[2];
		} else {
			count = count % 10;
			if (count == 1) {
				result = declension[0];
			} else if (count >= 2 && count <= 4) {
				result = declension[1];
			} else {
				result = declension[2];
			}
		}
		return result;
	}
}
