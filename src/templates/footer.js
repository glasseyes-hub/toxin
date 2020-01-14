import { Footer } from '../blocks/footer/footer';
import { fakeData } from '../services/js/fakeData';
import { Logo } from '../blocks/logo/logo';
import { Container } from '../blocks/_lib/container/container';
import { Menu } from '../blocks/menu/menu';
import { Title } from '../blocks/_lib/title/title';
import { Form } from '../blocks/_lib/form/form';
import { FormInput } from '../blocks/_lib/form/form-input/form-input';

export { footer };

const footer = new Footer();

const about = [
	new Logo(),
	new Container({
		attr: { class: 'footer_description' },
		content:
			'Бронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»',
	}),
];
const menu = fakeData.footer.menu.map(({ content }) => {
	return new Menu({
		attr: { class: 'menu_column' },
		direction: 'column',
		content,
	});
});

const subscribe = [
	new Title({
		attr: {
			class: 'footer_title',
		},
		text: {
			content: 'Подписка',
		},
	}),
	new Container({
		attr: { class: 'footer_description' },
		content: 'Получайте специальные предложения и новости сервиса',
	}),
	new Form({
		attr: { class: 'footer_form' },
		content: new FormInput({
			input: {
				attr: { placeholder: 'Email' },
			},
		}),
	}),
];

footer.about.setContent(about);
footer.menu.setContent(menu);
footer.subscribe.setContent(subscribe);
