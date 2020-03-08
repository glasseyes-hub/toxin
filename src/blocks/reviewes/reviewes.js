import { cmd } from '../../services/js/pageTools';

export class Reviewes {
	constructor(state) {
		require('./reviewes.sass');

		const block = cmd.createBlock({
			template: require('./reviewes.pug'),
			state,
		});

		Object.assign(this, {
			...block,
		});
	}
}
