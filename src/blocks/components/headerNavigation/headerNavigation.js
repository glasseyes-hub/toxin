import { Component } from '../../../services/js/Component';

export class HeaderNavigation extends Component {
	constructor(state) {
		require('./headerNavigation.sass');

		state = {
			template: require('./headerNavigation.pug'),
			...state,
		};

		super(state);
	}
}
