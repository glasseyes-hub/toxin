import { Component } from '../../services/js/Component';
import { Input } from '../../blocks/components/input/input';
import { Button } from '../../blocks/components/button/button';
import { Radio } from '../../blocks/components/radio/radio';
import { Toggle } from '../../blocks/components/toggle/toggle';
import { Tools } from '../../services/js/Tools';
import { Page } from '../../services/js/Page';
import { Header } from '../../blocks/components/header/header';
import { fakeData } from '../../services/js/fakeData';
import { Footer } from '../../blocks/components/footer/footer';
import { Copyright } from '../../blocks/components/copyright/copyright';

const tools = new Tools();

class Registration extends Component {
	constructor(state = {}) {
		require('./registration.sass');

		state = {
			template: require('./registration.pug'),
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
		const form = this.node.querySelector('.registration-form');
		const name = new Input({
			name: 'name',
			placeholder: 'Имя',
		});
		const surname = new Input({
			name: 'surname',
			placeholder: 'Фамилия',
		});
		const gender = new Radio({
			name: 'gender',
			list: { male: 'Мужчина', female: 'Женщина' },
			check: 0,
		});
		const birthday = new Input({
			className: 'registration-birthday',
			title: 'Дата рождения',
			name: 'birthday',
			placeholder: 'ДД.ММ.ГГГГ',
			mask: '99.99.9999',
		});
		const email = new Input({
			className: 'registration-authorization',
			title: 'Данные для входа в сервис',
			name: 'email',
			placeholder: 'Email',
			value: tools.url.search.get('email'),
		});
		const password = new Input({
			name: 'password',
			type: 'password',
			placeholder: 'Пароль',
		});
		const subscribe = new Toggle({
			name: 'sibscribe',
			text: 'Получать спецпредложения',
		});
		const paymentButton = new Button({
			className: 'registration-payment button_big button_filled button_arrow',
			text: 'Перейти к оплате',
		});

		form.appendChild(name.node);
		form.appendChild(surname.node);
		form.appendChild(gender.node);
		form.appendChild(birthday.node);
		form.appendChild(email.node);
		form.appendChild(password.node);
		form.appendChild(subscribe.node);
		form.appendChild(paymentButton.node);
	}
	renderFooter() {
		const footer = this.node.querySelector('.registration-footer');

		const loginButton = new Button({
			className: 'button_big button_bordered',
			text: 'Войти',
		});

		footer.appendChild(loginButton.node);
	}
}

const registration = new Registration();
const page = new Page();
const header = new Header({
	menu: fakeData.header.menu,
});
const footer = new Footer({
	menu: fakeData.footer.menu,
});
const copyright = new Copyright();

page.header.appendChild(header.node);
page.main.appendChild(registration.node);
page.footer.appendChild(footer.node);
page.body.appendChild(copyright.node);
