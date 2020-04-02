import { Component } from '../../../services/js/Component';

export class Button extends Component {
	constructor(state) {
		require('./button.sass');

		state = {
			template: require('./button.pug'),
			mod: [],
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.setMods();
	}
	setMods() {
		this.state.mod = Array.isArray(this.state.mod)
			? this.state.mod
			: [this.state.mod];

		this.state.mod.forEach(mod => {
			this.node.classList.add(`button_${mod}`);
		});
	}
}
