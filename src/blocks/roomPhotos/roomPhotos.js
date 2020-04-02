import { Block2 } from '../../services/js/block2';

export class RoomPhotos extends Block2 {
	constructor(state) {
		super({ template: require('./roomPhotos.pug') });

		require('./roomPhotos.sass');

		this.state = state;
	}
}
