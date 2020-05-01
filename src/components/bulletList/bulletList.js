import { Component } from '../../services/js/Component';
import { Title } from '../title/title';

export class BulletList extends Component {
	constructor(state) {
		require('./bulletList.sass');

		state = {
			template: require('./bulletList.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();

		this.renderTitle();
	}
	renderTitle() {
		const title = new Title({
			className: 'bulletList-title',
			title: this.state.title,
			subtitle: this.state.subtitle,
		});

		this.node.prepend(title.node);
	}
}
