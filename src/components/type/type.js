import { Component } from '../../services/js/Component';

export class Type extends Component {
	constructor(state) {
		require('./type.sass');

		state = {
			template: require('./type.pug'),
			...state,
		};

		super(state);
	}
}
