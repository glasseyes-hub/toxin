import { Component } from '../../services/js/Component';

export class Copyright extends Component {
	constructor(state) {
		require('./copyright.sass');

		state = {
			template: require('./copyright.pug'),
			...state,
		};

		super(state);
	}
}
