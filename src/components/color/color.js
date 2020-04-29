import { Component } from '../../services/js/Component';

export class Color extends Component {
	constructor(state) {
		require('./color.sass');

		state = {
			template: require('./color.pug'),
			...state,
		};

		super(state);
	}
}
