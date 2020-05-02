import { Component } from '../../services/js/Component';
import { Input } from '../input/input';
import { Radio } from '../radio/radio';
import { Toggle } from '../toggle/toggle';
import { Button } from '../button/button';

export class RegistrationForm extends Component {
	constructor(state) {
		require('./registrationForm.sass');

		state = {
			template: require('./registrationForm.pug'),
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
		const form = this.node.querySelector('.registrationForm-form');

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
			className: 'registrationForm-birthday',
			title: 'Дата рождения',
			name: 'birthday',
			placeholder: 'ДД.ММ.ГГГГ',
			mask: '99.99.9999',
		});
		const email = new Input({
			className: 'registrationForm-authorization',
			title: 'Данные для входа в сервис',
			name: 'email',
			placeholder: 'Email',
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
			className:
				'registrationForm-paymentButton button_big button_filled button_arrow',
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
		const footer = this.node.querySelector('.registrationForm-footer');

		const loginButton = new Button({
			className: 'registrationForm-login button_bordered',
			text: 'Войти',
		});

		footer.appendChild(loginButton.node);
	}
}
