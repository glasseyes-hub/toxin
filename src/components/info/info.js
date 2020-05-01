import { Component } from '../../services/js/Component';

export class Info extends Component {
	constructor(state) {
		require('./info.sass');

		state = {
			template: require('./info.pug'),
			comfort: false,
			convenience: false,
			cosiness: false,
			...state,
		};

		super(state);
	}
}
