import { Block } from '../../services/js/block';
import { Logo } from '../logo/logo';
import { Container } from '../_lib/container/container';

// export class Header {
// 	constructor(options) {
// 		Object.assign(this, options);

// 		this.authorization = {
// 			node: this.node.querySelector('.header_authorization'),
// 		};
// 		this.user = {
// 			isAuthorized: false,
// 			...this.user,
// 			node: this.node.querySelector('.header_user'),
// 		};

// 		this.user.isAuthorized && this.showUser();
// 	}
// 	showUser() {
// 		this.user.isAuthorized = true;
// 		this.authorization.node.classList.add('header_hidden');
// 		this.user.node.classList.remove('header_hidden');
// 	}
// 	showAuthorization() {
// 		this.user.isAuthorized = false;
// 		this.authorization.node.classList.remove('header_hidden');
// 		this.user.node.classList.add('header_hidden');
// 	}
// }

export class Header extends Block {
	constructor(options = {}) {
		const { attr } = options;
		const template = require('./header.pug');
		require('./header.sass');

		super({ template, attr });

		this.controls = new Container({
			attr: { class: 'header_controls' },
		});

		const content = [new Logo(), this.controls];

		this.addContent(content);
	}
}
