import { cmd } from '../../services/js/pageTools';

export class RoomInfo {
	constructor(state) {
		require('./roomInfo.sass');

		const block = cmd.createBlock({
			template: require('./roomInfo.pug'),
			state,
		});

		Object.assign(this, {
			...block,
		});
	}
}
