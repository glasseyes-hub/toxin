import { template } from '../templates/main';
import { Content } from '../blocks/content/content';
import { Container } from '../blocks/_lib/container/container';
import { FormDateSelect } from '../blocks/formDateSelect/formDateSelect';
import { DropdownQuantity } from '../blocks/DropdownQuantity/DropdownQuantity';
import { FormSlider } from '../blocks/_lib/form/form-slider/form-slider';
import { FormCheckbox } from '../blocks/_lib/form/form-checkbox/form-checkbox';
import { DropdownCheckbox } from '../blocks/dropdownCheckbox/dropdownCheckbox';
import { urlSearchTools, state } from '../services/js/Page';
import { SmallRoom } from '../blocks/smallRoom/smallRoom';
import { fakeData } from '../services/js/fakeData';
import { Title } from '../blocks/_lib/title/title';
import { Paginator } from '../blocks/paginator/paginator';

template.content.node.classList.add('page-content_search');

urlSearchTools.handler(state => {
	state.urlSearch = state;
	updateContent();
});

let CONTENT_UPDATE_TIMEOUT;

const updateContent = () => {
	clearTimeout(CONTENT_UPDATE_TIMEOUT);

	CONTENT_UPDATE_TIMEOUT = setTimeout(() => {
		const data = getData();

		loadContent(data);
	}, 3000);
};

const loadContent = data => {
	const rooms = data.rooms.map(room => new SmallRoom(room));
	results.node.innerHTML = '';
	results.setContent(rooms);

	console.log('Results update');
};
const getData = () => {
	// getting results from DB using state.urlSearch
	const data = { rooms: fakeData.rooms, results: 176 };

	return data;
};
const prepareCalendarDates = date => {
	if (!date) return null;

	return new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
};

const content = new Content({
	attr: { class: 'content_search' },
});
const title = new Container({
	attr: { class: 'content_search_title' },
});
const results = new Container({
	attr: { class: 'content_search_results' },
});
const filters = new Container({
	attr: { class: 'content_search_filters' },
});
const pagination = new Container({
	attr: { class: 'content_search_pagination' },
});

const selectDates = new FormDateSelect({
		singleView: true,
		dates: {
			arrival: prepareCalendarDates(state.urlSearch.arrival),
			leave: prepareCalendarDates(state.urlSearch.leave),
		},
		onValuesChange: values => {
			urlSearchTools.update(values);
		},
	}),
	selectGuests = new DropdownQuantity({
		title: 'Гости',
		placeholder: 'Выберите гостей',
		elements: [
			{
				group: [
					{
						content: 'Взрослые',
						name: 'adult',
						value: state.urlSearch.adult,
					},
					{
						content: 'Дети',
						name: 'children',
						value: state.urlSearch.children,
					},
				],
				declensions: ['гость', 'гостя', 'гостей'],
			},
			{
				content: 'Младенцы',
				name: 'baby',
				value: state.urlSearch.baby,
				declensions: ['младенец', 'младенца', 'младенцев'],
			},
		],
		onValuesChange: values => {
			urlSearchTools.update(values);
		},
	}),
	priceSlider = new FormSlider({
		max: 15000,
		values: {
			startPrice: state.urlSearch.startPrice,
			endPrice: state.urlSearch.endPrice,
		},
		onValuesChange: values => {
			urlSearchTools.update(values);
		},
	}),
	additionalWishes = new FormCheckbox({
		title: 'Checkbox Buttons',
		list: [
			{
				text: 'Можно курить',
				name: 'smoking',
				isChecked: state.urlSearch.smoking,
			},
			{
				text: 'Можно с питомцами',
				name: 'pets',
				isChecked: state.urlSearch.pets,
			},
			{
				text: 'Можно пригласить гостей (до 10 человек)',
				name: 'invitation',
				isChecked: state.urlSearch.invitation,
			},
		],
		onValuesChange: values => {
			urlSearchTools.update(values);
		},
	}),
	availabilities = new FormCheckbox({
		title: 'Доступность',
		list: [
			{
				text: 'Широкий коридор',
				subtext: 'Ширина коридоров в номере не менее 91 см.',
				name: 'widecorridor',
				isChecked: state.urlSearch.widecorridor,
			},
			{
				text: 'Помощник для инвалидов',
				subtext: 'На 1 этаже вас встретит специалист и проводит до номера.',
				name: 'assistant',
				isChecked: state.urlSearch.assistant,
			},
		],
		onValuesChange: values => {
			urlSearchTools.update(values);
		},
	}),
	facilities = new DropdownQuantity({
		title: 'Удобства номера',
		placeholder: 'Выберите удобства',
		elements: [
			{
				content: 'Спальни',
				name: 'bedrooms',
				value: state.urlSearch.bedrooms,
				declensions: ['спальня', 'спальни', 'спален'],
			},
			{
				content: 'Кровати',
				name: 'beds',
				value: state.urlSearch.beds,
				declensions: ['кровать', 'кровати', 'кроватей'],
			},
			{
				content: 'Ванные комнаты',
				name: 'bathrooms',
				value: state.urlSearch.bathrooms,
				declensions: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
			},
		],
		onValuesChange: values => {
			urlSearchTools.update(values);
		},
	}),
	additionalFacilities = new DropdownCheckbox({
		title: 'Дополнительные удобства',
		list: [
			{
				text: 'Завтрак',
				name: 'dinner',
				isChecked: state.urlSearch.dinner,
			},
			{
				text: 'Письменный стол',
				name: 'desk',
				isChecked: state.urlSearch.desk,
			},
			{
				text: 'Стул для кормления',
				name: 'feedingchair',
				isChecked: state.urlSearch.feedingchair,
			},
			{
				text: 'Кроватка',
				name: 'crib',
				isChecked: state.urlSearch.crib,
			},
			{
				text: 'Телевизор',
				name: 'tv',
				isChecked: state.urlSearch.tv,
			},
			{
				text: 'Шампунь',
				name: 'shampoo',
				isChecked: state.urlSearch.shampoo,
			},
			{
				text: 'Телевизор',
				name: 'tv',
				isChecked: state.urlSearch.tv,
			},
			{
				text: 'Шампунь',
				name: 'shampoo',
				isChecked: state.urlSearch.shampoo,
			},
		],
		onValuesChange: values => {
			urlSearchTools.update(values);
		},
	});

filters.setContent([
	selectDates,
	selectGuests,
	priceSlider,
	additionalWishes,
	availabilities,
	facilities,
	additionalFacilities,
]);

title.setContent(
	new Title({
		text: {
			tag: 'h1',
			content: 'Номера, которые мы для вас подобрали',
		},
	})
);

const paginator = new Paginator({
	page: state.urlSearch.page,
	capacity: 12,
	amount: 176,
	onStateChange: state => {
		urlSearchTools.update({ page: state.page });
	},
});

pagination.setContent(paginator);

content.setContent([filters, title, results, pagination]);

template.content.node.appendChild(content.node);
