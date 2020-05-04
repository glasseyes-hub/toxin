import { Component } from '../../services/js/Component';

export class UserMenu extends Component {
	constructor(state) {
		require('./userMenu.sass');

		state = {
			template: require('./userMenu.pug'),
			...state,
		};

		super(state);
	}
}
