import { page } from '../templates/main';
import { Content } from '../blocks/content/content';
import { Container } from '../blocks/_lib/container/container';
import { FormDateSelect } from '../blocks/formDateSelect/formDateSelect';
import { FormGuestsSelect } from '../blocks/formGuestsSelect/formGuestsSelect';
import { FormSlider } from '../blocks/_lib/form/form-slider/form-slider';

page.content.node.classList.add('page-content_search');

const prepareDate = date =>
	new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));

const urlParams = new URLSearchParams(window.location.search);

const guests = {
	adult: urlParams.get('adult'),
	children: urlParams.get('children'),
	baby: urlParams.get('baby'),
};

const content = new Content({
	attr: { class: 'content_search' },
});

const filters = new Container({
	attr: { class: 'content_search_filters' },
});
const results = new Container({
	attr: { class: 'content_search_results' },
});
const pagination = new Container({
	attr: { class: 'content_search_pagination' },
});

filters.setContent([
	new FormDateSelect({
		attr: { class: 'formDateSelect_single' },
		type: 'single',
		dates: [
			prepareDate(urlParams.get('arrival')),
			prepareDate(urlParams.get('leave')),
		],
	}),
	new FormGuestsSelect({ guests }),
	new FormSlider({
		max: 15000,
		values: [5000, 10000],
	}),
]);

content.setContent([filters, results, pagination]);

page.content.node.appendChild(content.node);
