import { Component } from '../../services/js/Component';
import { Title } from '../title/title';
import { Toggle } from '../toggle/toggle';

export class ToggleButtons extends Component {
	constructor(state) {
		require('./toggleButtons.sass');

		state = {
			template: require('./toggleButtons.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderTitle();
		this.renderToggle();
	}
	renderTitle() {
		const title = new Title({
			className: 'toggleButtons-title',
			title: 'Toggle',
		});

		this.node.appendChild(title.node);
	}
	renderToggle() {
		const toggleChecked = new Toggle({
			text: 'Получать спецпредложения',
			check: true,
		});
		const toggle = new Toggle({
			text: 'Получать спецпредложения',
		});

		this.node.appendChild(toggleChecked.node);
		this.node.appendChild(toggle.node);
	}
}
