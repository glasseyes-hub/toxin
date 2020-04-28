import { Component } from '../../services/js/Component';

export class Paginator extends Component {
	constructor(state) {
		require('./paginator.sass');

		state = {
			template: require('./paginator.pug'),
			page: 1,
			results: 0,
			capacity: 12,
			...state,
		};

		state.pages = Math.ceil(state.results / state.capacity);

		super(state);
	}
	handlers() {
		const buttons = this.node.querySelectorAll('.paginator-button');

		buttons.forEach((button) => {
			let page;

			if (button.classList.contains('paginator-button_previous'))
				page = +this.state.page - 1;
			else if (button.classList.contains('paginator-button_next'))
				page = +this.state.page + 1;
			else page = +button.innerHTML;

			button.addEventListener('click', (event) => {
				event.preventDefault();

				this.state = { page };

				this.render();
				this.handlers();
			});
		});
	}
}
