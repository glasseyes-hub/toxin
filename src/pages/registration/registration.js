import { Component } from '../../services/js/Component';
import { Page } from '../../services/js/Page';
import { Header } from '../../components/header/header';
import { fakeData } from '../../services/js/fakeData';
import { Footer } from '../../components/footer/footer';
import { RegistrationForm } from '../../components/registrationForm/registrationForm';

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
		this.renderRegistrationForm();
	}
	renderRegistrationForm() {
		const content = this.node.querySelector('.registration-content');

		const registrationForm = new RegistrationForm({
			className: 'registration-registrationForm',
		});

		content.appendChild(registrationForm.node);
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

page.header.appendChild(header.node);
page.main.appendChild(registration.node);
page.footer.appendChild(footer.node);
