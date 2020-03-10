import { cmd } from '../../services/js/pageTools';
import { Like } from '../like/like';

export class Reviewes {
	constructor(state) {
		require('./reviewes.sass');

		const block = cmd.createBlock({
			template: require('./reviewes.pug'),
			state,
		});

		Object.assign(this, {
			...block,
		});

		this.addLikes();
	}
	addLikes() {
		this.likes = [];

		[...this.node.querySelectorAll('.sidebar')].forEach((element, index) => {
			const { likes, isLiked } = this.state.list[index];

			const like = new Like({ likes, isLiked });

			element.appendChild(like.node);

			this.likes.push(like);
		});
	}
}
