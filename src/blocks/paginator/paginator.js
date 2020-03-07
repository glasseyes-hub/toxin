import { NewBlock } from '../../services/js/NewBlock';
import { state } from '../../services/js/state';

export class Paginator extends NewBlock {
	constructor({ onStateChange, ...options }) {
		super(onStateChange);

		require('./paginator.sass');
		this.template = require('./paginator.pug');

		const total = this.getTotal(options);

		options.page = parseInt(options.page) || 1;

		this.setState({
			page: options.page,
			capacity: options.capacity,
			amount: options.amount,
			total,
			range: this.getRange(options),
		});
	}
	events() {
		super.events();

		const buttons = this.node.querySelectorAll('.paginator-button');

		buttons.forEach(button => {
			if (button.classList.contains('dots')) return true;
			if (button.classList.contains('current')) return true;

			const buttonText = button.innerText;

			button.addEventListener('click', () => {
				let page;

				if (button.classList.contains('previuos')) page = this.state.page - 1;
				else if (button.classList.contains('next')) page = this.state.page + 1;
				else page = parseInt(buttonText);

				page = page > this.state.total ? this.state.total : page;
				page = page < 1 ? 1 : page;

				this.selectPage(page);
			});
		});
	}
	getTotal({ amount, capacity }) {
		return Math.ceil(amount / capacity);
	}
	getRange({ page, amount, capacity }) {
		const pageLastElement = page * capacity;

		const start = 1 + pageLastElement - capacity;
		const end = pageLastElement < amount ? pageLastElement : amount;

		return `${start} - ${end} из ${amount}`;
	}
	selectPage(page) {
		this.setState({
			page,
			range: this.getRange({
				page,
				amount: this.state.amount,
				capacity: this.state.capacity,
			}),
		});
	}
}
