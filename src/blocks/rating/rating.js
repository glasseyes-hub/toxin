import { NewBlock } from '../../services/js/NewBlock';

export class Rating extends NewBlock {
	constructor({ rating, changable = true }) {
		super();

		require('./rating.sass');

		this.node = this.createNode({ template: require('./rating.pug') });
		this.buttons = this.node.querySelectorAll('.rating-button');

		this.setRating(rating);

		changable && this.setEvents();
	}
	setEvents() {
		this.buttons.forEach((button, index) => {
			button.addEventListener('click', () => {
				this.setRating(index + 1);
			});
		});
	}
	setRating(rating) {
		this.rating = rating;
		this.updateButtonsView(rating);
	}
	updateButtonsView(rating) {
		this.buttons.forEach((button, index) => {
			if (index < rating) button.classList.add('rating-button_selected');
			else button.classList.remove('rating-button_selected');
		});
	}
}
