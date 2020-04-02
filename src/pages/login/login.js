import { Component } from '../../services/js/Component';
import { template } from '../../templates/main';
import { Input } from '../../blocks/components/input/input';
import { Button } from '../../blocks/components/button/button';
import { Radio } from '../../blocks/components/radio/radio';
import { Toggle } from '../../blocks/components/toggle/toggle';

class Login extends Component {
	constructor() {
		require('./login.sass');

		const state = {
			template: require('./login.pug'),
		};

		super(state);
	}
	render() {
		super.render();
		this.renderForm();
		this.renderFooter();
	}
	renderForm() {
		const form = this.node.querySelector('.login-form');
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
			className: 'login-button',
			mod: ['filled', 'big', 'arrow'],
			text: 'Войти',
		});

		form.appendChild(email.node);
		form.appendChild(password.node);
		form.appendChild(loginButton.node);
	}
	renderFooter() {
		const footer = this.node.querySelector('.login-footer');

		const registrationButton = new Button({
			className: 'login-registration',
			mod: 'bordered',
			text: 'Создать',
		});

		footer.appendChild(registrationButton.node);
	}
}

const login = new Login();

template.main.node.appendChild(login.node);

console.log(login);
