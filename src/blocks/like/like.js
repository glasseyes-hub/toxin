import { Block2 } from '../../services/js/block2';

export class Like extends Block2 {
	constructor({ likes = 0, isLiked = false }) {
		super({ template: require('./like.pug') });

		require('./like.sass');

		this.state = { likes, isLiked };
	}
	render() {
		super.render();
		this.state.isLiked && this.node.classList.add('liked');
	}
	handles() {
		super.handles();
		this.node.addEventListener('click', () => {
			this.state.isLiked ? this.unlike() : this.like();
		});
	}
	like() {
		if (this.state.isLiked) return false;

		this.state = { likes: this.state.likes + 1, isLiked: true };
	}
	unlike() {
		if (!this.state.isLiked) return false;

		this.state = { likes: this.state.likes - 1, isLiked: false };
	}
}
