import { Block2 } from '../../services/js/block2';

export class SummuryPrice extends Block2 {
	constructor({
		price,
		days = 0,
		persons = 0,
		serviceFee,
		isServiceFeeFree = false,
		additionalFeePerPerson,
	}) {
		super({ template: require('./summuryPrice.pug') });

		require('./summuryPrice.sass');

		this.state = {
			price,
			days,
			persons,
			serviceFee,
			isServiceFeeFree,
			additionalFeePerPerson,
		};
	}
}
