import { Component } from '../../services/js/Component';
import { HeaderNavigation } from '../headerNavigation/headerNavigation';
import { Button } from '../button/button';
import { UserMenu } from '../userMenu/userMenu';

export class Header extends Component {
	constructor(state) {
		require('./header.sass');

		state = {
			template: require('./header.pug'),
			menu: [],
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderAuth();
	}
	renderAuth() {
		this.auth = this.node.querySelector('.header-auth');
		this.state.user ? this.renderUserMenu() : this.renderAuthorization();
	}
	renderUserMenu() {
		const userMenu = new UserMenu({
			className: 'header-userMenu',
			...this.state.user,
		});

		this.auth.appendChild(userMenu.node);
	}
	renderAuthorization() {
		const loginButton = new Button({
			className: 'header-button header-button_login button_big button_bordered',
			text: 'Войти',
			link: './login.html',
		});
		const registrationButton = new Button({
			className:
				'header-button header-button_registration button_big button_filled',
			text: 'Зарегистрироваться',
			link: './registration.html',
		});

		this.auth.appendChild(loginButton.node);
		this.auth.appendChild(registrationButton.node);
	}
	handlers() {
		const navigation = this.node.querySelector('.header-navigation');

		const showNavigationButton = this.node.querySelector(
			'.header-showNavigation'
		);
		const hideNavigationButton = this.node.querySelector(
			'.header-hideNavigation'
		);

		showNavigationButton.addEventListener('click', (event) => {
			event.preventDefault();
			navigation.style.right = '0px';
		});
		hideNavigationButton.addEventListener('click', (event) => {
			event.preventDefault();
			navigation.style.right = '-320px';
		});
	}
}
