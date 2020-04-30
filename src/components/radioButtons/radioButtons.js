import { Component } from '../../services/js/Component';
import { Title } from '../title/title';
import { Radio } from '../radio/radio';

export class RadioButtons extends Component {
	constructor(state) {
		require('./radioButtons.sass');

		state = {
			template: require('./radioButtons.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderTitle();
		this.renderRadio();
	}
	renderTitle() {
		const title = new Title({
			className: 'radioButtons-title',
			title: 'Radio Buttons',
		});

		this.node.appendChild(title.node);
	}
	renderRadio() {
		const radio = new Radio({
			check: 0,
			list: ['Мужчина', 'Женщина'],
		});

		this.node.appendChild(radio.node);
	}
}
