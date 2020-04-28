import { Component } from '../../services/js/Component';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Page } from '../../services/js/Page';
import { Header } from '../../components/header/header';
import { fakeData } from '../../services/js/fakeData';
import { Footer } from '../../components/footer/footer';
import { Copyright } from '../../components/copyright/copyright';

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
			className: 'login-button button_big button_filled button_arrow',
			text: 'Войти',
		});

		form.appendChild(email.node);
		form.appendChild(password.node);
		form.appendChild(loginButton.node);
	}
	renderFooter() {
		const footer = this.node.querySelector('.login-footer');

		const registrationButton = new Button({
			className: 'login-registration button_big button_bordered',
			text: 'Создать',
		});

		footer.appendChild(registrationButton.node);
	}
}

const login = new Login();
const page = new Page();
const header = new Header({
	menu: fakeData.header.menu,
});
const footer = new Footer({
	menu: fakeData.footer.menu,
});
const copyright = new Copyright();

page.header.appendChild(header.node);
page.main.appendChild(login.node);
page.footer.appendChild(footer.node);
page.body.appendChild(copyright.node);
