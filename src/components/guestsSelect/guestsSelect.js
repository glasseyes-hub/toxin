import { Component } from '../../services/js/Component';
import { Dropdown } from '../dropdown/dropdown';
import { Counter } from '../counter/counter';

export class GuestsSelect extends Component {
	constructor(state) {
		require('./guestsSelect.sass');

		state = {
			template: require('./guestsSelect.pug'),
			title: 'Гости',
			adult: 0,
			children: 0,
			baby: 0,
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
			className: 'guestsSelect-dropdown',
			type: 'input',
			title: this.state.title,
			subtitle: this.state.subtitle,
			placeholder: 'Сколько гостей',
		});

		this.node.appendChild(this.dropdown.node);
	}
	renderCounter() {
		this.counter = new Counter({
			className: 'guestsSelect-counter',
			list: [
				{ text: 'Взрослые', name: 'adult', value: this.state.adult },
				{ text: 'Дети', name: 'children', value: this.state.children },
				{ text: 'Младенцы', name: 'baby', value: this.state.baby },
			],
			controls: true,
		});

		this.counter.addObserver((state) => {
			this.setDropdownText();
			this.counter.controls && this.dropdown.close();

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
				declension: ['гость', 'гостя', 'гостей'],
				text: ['Взрослые', 'Дети'],
				value: 0,
			},
			{
				declension: ['младенец', 'младенца', 'младенцев'],
				text: ['Младенцы'],
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
