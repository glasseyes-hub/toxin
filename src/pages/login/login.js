import { Component } from '../../services/js/Component';
import { Page } from '../../services/js/Page';
import { Header } from '../../components/header/header';
import { fakeData } from '../../services/js/fakeData';
import { Footer } from '../../components/footer/footer';
import { LoginForm } from '../../components/loginForm/loginForm';

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
		this.renderLoginForm();
	}
	renderLoginForm() {
		const content = this.node.querySelector('.login-content');

		const loginForm = new LoginForm({
			classList: 'login-loginForm',
		});

		content.appendChild(loginForm.node);
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

page.header.appendChild(header.node);
page.main.appendChild(login.node);
page.footer.appendChild(footer.node);
