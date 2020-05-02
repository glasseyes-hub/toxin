import { Component } from '../../services/js/Component';
import { Input } from '../input/input';
import { Button } from '../button/button';

export class LoginForm extends Component {
	constructor(state) {
		require('./loginForm.sass');

		state = {
			template: require('./loginForm.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderForm();
		this.renderFooter();
	}
	renderForm() {
		const form = this.node.querySelector('.loginForm-form');
		const email = new Input({
			name: 'email',
			placeholder: 'Email',
		});
		const password = new Input({
			name: 'password',
			type: 'password',
			placeholder: 'Пароль',
		});
		const loginButton = new Button({
			className: 'loginForm-button button_big button_filled button_arrow',
			text: 'Войти',
		});

		form.appendChild(email.node);
		form.appendChild(password.node);
		form.appendChild(loginButton.node);
	}
	renderFooter() {
		const footer = this.node.querySelector('.loginForm-footer');

		const registrationButton = new Button({
			className: 'loginForm-registration button_bordered',
			text: 'Создать',
		});

		footer.appendChild(registrationButton.node);
	}
}
