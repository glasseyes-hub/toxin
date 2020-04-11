import { Component } from '../../../services/js/Component';
import { Calendar } from '../calendar/calendar';
import { Dropdown } from '../dropdown/dropdown';

export class DateSelect extends Component {
	constructor(state) {
		require('./dateSelect.sass');

		state = {
			template: require('./dateSelect.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.renderDropdowns();
		this.renderCalendar();
	}
	renderDropdowns() {
		const getDropdowns = () => {
			if (this.state.single) {
				return {
					single: new Dropdown({
						open: this.state.open,
						open: true,
						type: 'input',
						className: 'dateSelect-dropdown dateSelect-dropdown_single',
						title: 'Даты пребывания в отеле',
						placeholder: 'Даты пребывания',
					}),
				};
			} else {
				return {
					arrival: new Dropdown({
						open: this.state.open,
						type: 'input',
						className: 'dateSelect-dropdown dateSelect-dropdown_arrival',
						title: 'Прибытие',
						placeholder: 'ДД.ММ.ГГГГ',
					}),
					leave: new Dropdown({
						open: this.state.open,
						type: 'input',
						className: 'dateSelect-dropdown dateSelect-dropdown_leave',
						title: 'Выезд',
						placeholder: 'ДД.ММ.ГГГГ',
					}),
				};
			}
		};
		const synchronizeDropdowns = () => {
			this.dropdowns.arrival.addObserver((state) => {
				state.open ? this.dropdowns.leave.open() : this.dropdowns.leave.close();
			});

			this.dropdowns.leave.addObserver((state) => {
				state.open
					? this.dropdowns.arrival.open()
					: this.dropdowns.arrival.close();
			});
		};

		this.dropdowns = getDropdowns();

		!this.state.single && synchronizeDropdowns();

		Object.values(this.dropdowns).forEach((dropdown) => {
			this.node.appendChild(dropdown.node);
		});
	}
	renderCalendar() {
		this.calendar = new Calendar({
			className: 'dateSelect-calendar',
			values: [this.state.arrival, this.state.leave],
		});

		Object.values(this.dropdowns).forEach((dropdown) =>
			dropdown.setTarget(this.calendar.node)
		);

		const [arrivalDate, leaveDate] = this.calendar.datepicker.selectedDates;
		const arrivalInput = this.node.querySelector('.dateSelect-arrival');
		const leaveInput = this.node.querySelector('.dateSelect-leave');

		this.calendar.addObserver(() => {
			this.setDropdownsText();
			arrivalInput.value = arrivalDate;
			leaveInput.value = leaveDate;
			Object.values(this.dropdowns).forEach((dropdown) => dropdown.close());
		});

		this.setDropdownsText();
		arrivalInput.value = arrivalDate;
		leaveInput.value = leaveDate;

		this.node.appendChild(this.calendar.node);
	}
	setDropdownsText() {
		if (this.state.single) {
			this.dropdowns.single.text = this.calendar.state.values
				.map((date) => {
					if (!date) return;

					return date
						.toLocaleDateString('ru-RU', {
							day: 'numeric',
							month: 'short',
						})
						.slice(0, -1);
				})
				.join(' - ');
		} else {
			let [arrivalDate = null, leaveDate = null] = this.calendar.state.values;

			this.dropdowns.arrival.text = arrivalDate
				? arrivalDate.toLocaleDateString()
				: '';
			this.dropdowns.leave.text = leaveDate
				? leaveDate.toLocaleDateString()
				: '';
		}
	}
}
