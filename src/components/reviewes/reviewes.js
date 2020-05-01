import { Component } from '../../services/js/Component';
import { Like } from '../like/like';

export class Reviewes extends Component {
	constructor(state) {
		require('./reviewes.sass');

		state = {
			template: require('./reviewes.pug'),
			list: [],
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderSidebar();
	}
	renderSidebar() {
		const sidebars = this.node.querySelectorAll('.reviewes-sidebar');

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
