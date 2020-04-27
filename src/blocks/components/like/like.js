import { Component } from '../../../services/js/Component';

export class Like extends Component {
	constructor(state) {
		require('./like.sass');

		state = {
			template: require('./like.pug'),
			disabled: false,
			isLikes: false,
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.state.isLiked && this.node.classList.add('like_liked');
	}
	handlers() {
		if (!this.state.disabled) {
			this.node.addEventListener('click', () => {
				this.state.isLiked ? this.unlike() : this.like();
			});
		}
	}
	like() {
		if (this.state.isLiked) return false;

		this.state = { value: +this.state.value + 1, isLiked: true };

		this.render();
		this.handlers();
	}
	unlike() {
		if (!this.state.isLiked) return false;

		this.state = { value: +this.state.value - 1, isLiked: false };

		this.render();
		this.handlers();
	}
}
