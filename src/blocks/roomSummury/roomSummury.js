import { Block2 } from '../../services/js/block2';
import { FormDateSelect } from '../formDateSelect/formDateSelect';
import { DropdownQuantity } from '../DropdownQuantity/DropdownQuantity';
import { SummuryPrice } from './summuryPrice';

export class RoomSummury extends Block2 {
	constructor(state) {
		super({ template: require('./roomSummury.pug') });

		require('./roomSummury.sass');

		const serviceFee = 2179;
		const additionalFeePerPerson = 100;

		this.dates = this.getDates(state.dates);
		this.guests = this.getGuests(state.guests);
		this.summuryPrice = this.getSummuryPrice({
			days: this.calcDays(state.dates),
			persons: this.calcPersons(state.guests),
			serviceFee,
			additionalFeePerPerson,
			...state,
		});

		this.state = {
			serviceFee,
			additionalFeePerPerson,
			...state,
		};
	}
	render() {
		super.render();

		this.node.querySelector('.dates').replaceWith(this.dates.node);
		this.node.querySelector('.guests').replaceWith(this.guests.node);
		this.node
			.querySelector('.summuryPrice')
			.replaceWith(this.summuryPrice.node);
	}
	getDates(state) {
		return new FormDateSelect({
			dates: {
				arrival: this.prepareCalendarDates(state.arrival),
				leave: this.prepareCalendarDates(state.leave),
			},
			onValuesChange: values => {
				this.state = { dates: values };
				this.summuryPrice.state = { days: this.calcDays(values) };
			},
		});
	}
	getGuests(state) {
		return new DropdownQuantity({
			title: 'Гости',
			placeholder: 'Выберите гостей',
			elements: [
				{
					group: [
						{
							content: 'Взрослые',
							name: 'adult',
							value: state.adult,
						},
						{
							content: 'Дети',
							name: 'children',
							value: state.children,
						},
					],
					declensions: ['гость', 'гостя', 'гостей'],
				},
				{
					content: 'Младенцы',
					name: 'baby',
					value: state.baby,
					declensions: ['младенец', 'младенца', 'младенцев'],
				},
			],
			onValuesChange: values => {
				this.state = { guests: values };
				this.summuryPrice.state = { persons: this.calcPersons(values) };
			},
		});
	}
	getSummuryPrice(state) {
		return new SummuryPrice({
			days: state.days,
			persons: state.persons,
			price: state.price,
			serviceFee: state.serviceFee,
			isServiceFeeFree: state.isServiceFeeFree,
			additionalFeePerPerson: state.additionalFeePerPerson,
		});
	}
	prepareCalendarDates = date => {
		if (!date) return null;

		return new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
	};
	calcDays({ arrival, leave }) {
		arrival = this.prepareCalendarDates(arrival);
		leave = this.prepareCalendarDates(leave);

		return Math.round((leave - arrival) / (1000 * 60 * 60 * 24));
	}
	calcPersons(guests = {}) {
		return Object.entries(guests).reduce((acc, [key, value]) => {
			if (value && key != 'baby') acc += +value;
			return acc;
		}, 0);
	}
}
