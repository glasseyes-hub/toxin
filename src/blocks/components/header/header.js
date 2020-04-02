import { Block2 } from '../../../services/js/block2';
import { Button2 } from '../../_lib/button2/button2';

export class Header extends Block2 {
	constructor(state) {
		super({ template: require('./header.pug') });

		require('./header.sass');

		this.loginButton = new Button2({
			type: 'bordered',
			text: 'Войти',
			width: 87,
			height: 34,
			border: 2,
		});

		this.registrationButton = new Button2({
			type: 'filled',
			text: 'Зарегистрироваться',
			width: 196,
			height: 34,
		});

		this.state = state;
	}
	render() {
		super.render();

		this.node
			.querySelector('.header-button_login')
			.appendChild(this.loginButton.node);
		this.node
			.querySelector('.header-button_registration')
			.appendChild(this.registrationButton.node);
	}
}
