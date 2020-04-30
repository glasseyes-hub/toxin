import { Component } from '../../services/js/Component';

export class Title extends Component {
	constructor(state) {
		require('./title.sass');

		state = {
			template: require('./title.pug'),
			...state,
		};

		super(state);
	}
}
