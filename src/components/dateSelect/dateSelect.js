import { Component } from '../../services/js/Component';
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
		this.setDropdownsText();
	}
	renderDropdowns() {
		const getDropdowns = () => {
			if (this.state.single) {
				return {
					single: new Dropdown({
						open: this.state.open,
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

		this.calendar.addObserver((state) => {
			const [arrival, leave] = state.values;

			Object.values(this.dropdowns).forEach((dropdown) => dropdown.close());

			this.state = { arrival, leave };

			this.setDropdownsText();
			arrivalInput.value = arrival;
			leaveInput.value = leave;
		});

		arrivalInput.value = arrivalDate;
		leaveInput.value = leaveDate;

		this.node.appendChild(this.calendar.node);
	}
	setDropdownsText() {
		const { arrival, leave, single } = this.state;

		if (single) {
			this.dropdowns.single.text = [arrival, leave]
				.filter((date) => date)
				.map((date) => {
					return date
						.toLocaleDateString('ru-RU', {
							day: 'numeric',
							month: 'short',
						})
						.slice(0, -1);
				})
				.join(' - ');
		} else {
			this.dropdowns.arrival.text = arrival
				? new Date(arrival).toLocaleDateString()
				: '';
			this.dropdowns.leave.text = leave
				? new Date(leave).toLocaleDateString()
				: '';
		}
	}
}
