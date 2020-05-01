import { Component } from '../../services/js/Component';

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
}
