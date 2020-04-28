import { Component } from '../../services/js/Component';

export class RoomAdditionals extends Component {
	constructor(state) {
		require('./roomAdditionals.sass');

		state = {
			template: require('./roomAdditionals.pug'),
			...state,
		};

		super(state);
	}
}
