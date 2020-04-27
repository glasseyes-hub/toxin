import { Component } from '../../../services/js/Component';

export class RoomInfo extends Component {
	constructor(state) {
		require('./roomInfo.sass');

		state = {
			template: require('./roomInfo.pug'),
			...state,
		};

		super(state);
	}
}
