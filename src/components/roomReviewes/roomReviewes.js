import { Component } from '../../services/js/Component';
import { Like } from '../like/like';

export class RoomReviewes extends Component {
	constructor(state) {
		require('./roomReviewes.sass');

		state = {
			template: require('./roomReviewes.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderLikes();
	}
	renderLikes() {
		const sidebars = this.node.querySelectorAll('.roomReviewes-sidebar');

		sidebars.forEach((sidebar, index) => {
			const like = new Like({
				value: this.state.list[index].likes,
				disabled: true,
				isLiked: this.state.list[index].isLiked,
			});

			sidebar.appendChild(like.node);
		});
	}
}
