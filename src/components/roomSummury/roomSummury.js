import { Component } from '../../services/js/Component';
import { DateSelect } from '../dateSelect/dateSelect';
import { GuestsSelect } from '../guestsSelect/guestsSelect';
import { Button } from '../button/button';

export class RoomSummury extends Component {
	constructor(state) {
		require('./roomSummury.sass');

		state = {
			template: require('./roomSummury.pug'),
			additionalFeePerGuest: 100,
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderDateSelect();
		this.renderGuestsSelect();
		this.renderSummury();
		this.renderButton();
	}
	renderDateSelect() {
		const dateSelectNode = this.node.querySelector('.roomSummury-dateSelect');
		const dateSelect = new DateSelect({
			arrival: this.state.dates.arrival,
			leave: this.state.dates.leave,
		});

		dateSelect.addObserver((state) => {
			const { arrival, leave } = state;

			this.state = {
				dates: {
					arrival: arrival,
					leave: leave,
				},
			};

			this.renderSummury();
		});

		dateSelectNode.replaceWith(dateSelect.node);
	}
	renderGuestsSelect() {
		const guestsSelectNode = this.node.querySelector(
			'.roomSummury-guestsSelect'
		);

		const guestsSelect = new GuestsSelect({
			adult: this.state.guests.adult,
			children: this.state.guests.children,
			baby: this.state.guests.baby,
		});

		guestsSelect.addObserver((state) => {
			const { adult, children, baby } = state;

			this.state = {
				guests: {
					adult,
					children,
					baby,
				},
			};

			this.renderSummury();
		});

		guestsSelectNode.replaceWith(guestsSelect.node);
	}
	renderSummury() {
		const summuryNodes = summuryNodes
			? summuryNodes
			: {
					rent: {
						name: this.node.querySelector('.roomSummury-name_rent'),
						value: this.node.querySelector('.roomSummury-value_rent'),
					},
					serviceValue: this.node.querySelector('.roomSummury-value_service'),
					additionalValue: this.node.querySelector(
						'.roomSummury-value_additional'
					),
					totalValue: this.node.querySelector('.roomSummury-value_total'),
			  };

		const days = this.calcDays(this.state.dates) || 0;
		const guests = this.calcGuests(this.state.guests) || 0;

		const rentPrice = this.state.price * days;
		const serviceFee = this.state.serviceFee - this.state.serviceFeeDiscount;
		const additionalFee = this.state.additionalFeePerGuest * guests;
		const totalPrice = rentPrice + serviceFee + additionalFee;

		summuryNodes.rent.name.innerHTML = `${this.state.price}₽ x ${days} суток`;
		summuryNodes.rent.value.innerHTML = `${rentPrice}₽`;
		summuryNodes.serviceValue.innerHTML = `${serviceFee}₽`;
		summuryNodes.additionalValue.innerHTML = `${additionalFee}₽`;
		summuryNodes.totalValue.innerHTML = `${!days || !guests ? 0 : totalPrice}₽`;
	}
	calcDays({ arrival, leave }) {
		const msPerDay = 1000 * 60 * 60 * 24;
		return Math.round((new Date(leave) - new Date(arrival)) / msPerDay);
	}
	calcGuests(guests = {}) {
		return Object.entries(guests).reduce((acc, [key, value]) => {
			if (value && key != 'baby') acc += +value;
			return acc;
		}, 0);
	}
	renderButton() {
		const form = this.node.querySelector('.roomSummury-form');
		const button = new Button({
			className: 'roomSummury-button button_arrow button_filled button_big',
			text: 'Забронировать',
		});

		form.appendChild(button.node);
	}
}
