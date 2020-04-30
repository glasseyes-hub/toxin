import { Component } from '../../services/js/Component';
import { Like } from '../like/like';
import { Title } from '../title/title';

export class LikeButtons extends Component {
	constructor(state) {
		require('./likeButtons.sass');

		state = {
			template: require('./likeButtons.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderTitle();
		this.renderLike();
	}
	renderTitle() {
		const title = new Title({
			className: 'likeButtons-title',
			title: 'Like button',
		});

		this.node.appendChild(title.node);
	}
	renderLike() {
		const like = new Like({
			value: 2,
		});
		const likeLiked = new Like({
			value: 12,
			isLiked: true,
		});

		this.node.appendChild(like.node);
		this.node.appendChild(likeLiked.node);
	}
}
