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

		this.renderNavigation();
		this.state.user ? this.renderUserMenu() : this.renderAuthorization();
	}
	renderNavigation() {
		const navigationNode = this.node.querySelector('.header-navigation');

		const headerNavigation = new HeaderNavigation({
			menu: this.state.menu,
		});

		navigationNode.appendChild(headerNavigation.node);
	}
	renderUserMenu() {
		const userMenu = new UserMenu(this.state.user);

		this.node.appendChild(userMenu.node);
	}
	renderAuthorization() {
		const athorizationNode = document.createElement('div');
		athorizationNode.classList.add('header-authorization');

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

		athorizationNode.appendChild(loginButton.node);
		athorizationNode.appendChild(registrationButton.node);

		this.node.appendChild(athorizationNode);
	}
}
