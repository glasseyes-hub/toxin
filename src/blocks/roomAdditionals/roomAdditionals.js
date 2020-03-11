import { Block2 } from '../../services/js/block2';

export class RoomAdditionals extends Block2 {
	constructor(state) {
		super({ template: require('./roomAdditionals.pug') });

		require('./roomAdditionals.sass');

		this.state = state;
	}
}
