import { Component } from '../../services/js/Component';
import { template } from '../../templates/main';
import { DateSelect } from '../../blocks/components/dateSelect/dateSelect';
import { Tools } from '../../services/js/Tools';
import { GuestsSelect } from '../../blocks/components/guestsSelect/guestsSelect';
import { PriceRange } from '../../blocks/components/priceRange/priceRange';
import { Facilities } from '../../blocks/components/facilities/facilities';
import { AdditionalFacilities } from '../../blocks/components/additionalFacilities/additionalFacilities';
import { Availabilities } from '../../blocks/components/availabilities/availabilities';
import { CheckboxButtons } from '../../blocks/components/checkboxButtons/checkboxButtons';
import { fakeData } from '../../services/js/fakeData';
import { Room } from '../../blocks/components/room/room';
import { Paginator } from '../../blocks/components/paginator/paginator';

const tools = new Tools();

class Search extends Component {
	constructor() {
		require('./search.sass');

		const state = {
			template: require('./search.pug'),
			filterTimeout: null,
			filterTimeoutInterval: 4000,
			filters: {
				arrival: tools.url.search.get('arrival')
					? new Date(tools.url.search.get('arrival'))
					: new Date(),
				leave: tools.url.search.get('leave')
					? new Date(tools.url.search.get('leave'))
					: new Date(),
				adult: tools.url.search.get('adult'),
				children: tools.url.search.get('children'),
				baby: tools.url.search.get('baby'),
				start: tools.url.search.get('start'),
				end: tools.url.search.get('end'),
				smoking: tools.url.search.get('smoking'),
				pets: tools.url.search.get('pets'),
				invitation: tools.url.search.get('invitation'),
				widecorridor: tools.url.search.get('widecorridor'),
				assistant: tools.url.search.get('assistant'),
				bedrooms: tools.url.search.get('bedrooms'),
				beds: tools.url.search.get('beds'),
				bathrooms: tools.url.search.get('bathrooms'),
				dinner: tools.url.search.get('dinner'),
				desk: tools.url.search.get('desk'),
				feedingchair: tools.url.search.get('feedingchair'),
				crib: tools.url.search.get('crib'),
				tv: tools.url.search.get('tv'),
				shampoo: tools.url.search.get('shampoo'),
				tv2: tools.url.search.get('tv2'),
				shampoo2: tools.url.search.get('shampoo2'),
			},
		};

		super(state);
	}
	render() {
		super.render();
		this.renderFilter();
		this.renderPaginator();
		this.renderResults();
	}
	renderFilter() {
		const filter = this.node.querySelector('.search-filter');

		const dateSelect = new DateSelect({
			className: 'search-dateSelect',
			single: true,
			arrival: this.state.filters.arrival,
			leave: this.state.filters.leave,
		});
		dateSelect.addObserver((state) => {
			this.state = {
				filters: {
					...this.state.filters,
					arrival: state.arrival,
					leave: state.leave,
				},
			};
		});

		const guestsSelect = new GuestsSelect({
			className: 'search-guestsSelect',
			adult: this.state.filters.adult,
			children: this.state.filters.children,
			baby: this.state.filters.baby,
		});
		guestsSelect.addObserver((state) => {
			this.state = {
				filters: {
					...this.state.filters,
					adult: state.adult,
					children: state.children,
					baby: state.baby,
				},
			};
		});

		const priceRange = new PriceRange({
			className: 'search-priceRange',
			start: this.state.filters.start,
			end: this.state.filters.end,
			max: fakeData.search.priceRange.max,
		});
		priceRange.addObserver((state) => {
			this.state = {
				filters: {
					...this.state.filters,
					start: state.start,
					end: state.end,
				},
			};
		});

		const checkboxButtons = new CheckboxButtons({
			className: 'search-checkboxes',
			smoking: this.state.filters.smoking,
			pets: this.state.filters.pets,
			invitation: this.state.filters.invitation,
		});
		checkboxButtons.addObserver((state) => {
			this.state = {
				filters: {
					...this.state.filters,
					smoking: state.smoking,
					pets: state.pets,
					invitation: state.invitation,
				},
			};
		});

		const availabilities = new Availabilities({
			className: 'search-availabilities',
			widecorridor: this.state.filters.widecorridor,
			assistant: this.state.filters.assistant,
		});
		availabilities.addObserver((state) => {
			this.state = {
				filters: {
					...this.state.filters,
					widecorridor: state.widecorridor,
					assistant: state.assistant,
				},
			};
		});

		const facilities = new Facilities({
			className: 'search-facilities',
			bedrooms: this.state.filters.bedrooms,
			beds: this.state.filters.beds,
			bathrooms: this.state.filters.bathrooms,
		});
		facilities.addObserver((state) => {
			this.state = {
				filters: {
					...this.state.filters,
					bedrooms: state.bedrooms,
					beds: state.beds,
					bathrooms: state.bathrooms,
				},
			};
		});

		const additionalFacilities = new AdditionalFacilities({
			className: 'search-additionalFacilities',
			dinner: this.state.filters.dinner,
			desk: this.state.filters.desk,
			feedingchair: this.state.filters.feedingchair,
			crib: this.state.filters.crib,
			tv: this.state.filters.tv,
			shampoo: this.state.filters.shampoo,
			tv2: this.state.filters.tv2,
			shampoo2: this.state.filters.shampoo2,
		});
		additionalFacilities.addObserver((state) => {
			this.state = {
				filters: {
					...this.state.filters,
					dinner: state.dinner,
					desk: state.desk,
					feedingchair: state.feedingchair,
					crib: state.crib,
					tv: state.tv,
					shampoo: state.shampoo,
					tv2: state.tv2,
					shampoo2: state.shampoo2,
				},
			};
		});

		filter.appendChild(dateSelect.node);
		filter.appendChild(guestsSelect.node);
		filter.appendChild(priceRange.node);
		filter.appendChild(checkboxButtons.node);
		filter.appendChild(availabilities.node);
		filter.appendChild(facilities.node);
		filter.appendChild(additionalFacilities.node);
	}
	renderPaginator() {
		const searchPaginator = this.node.querySelector('.search-paginator');
		this.paginator = new Paginator({
			className: 'search-paginator',
			results: fakeData.search.resultsAmount,
		});

		this.paginator.addObserver(() => {
			this.renderResults();
		});

		searchPaginator.replaceWith(this.paginator.node);
	}
	renderResults() {
		const results = this.node.querySelector('.search-results');
		const resultsData = this.getResultsData();

		results.innerHTML = '';

		resultsData.forEach((roomData) => {
			const room = new Room({
				...roomData,
				arrival: this.state.filters.arrival,
				leave: this.state.filters.leave,
				adult: this.state.filters.adult,
				children: this.state.filters.children,
				baby: this.state.filters.baby,
			});

			results.appendChild(room.node);
		});
	}
	getResultsData() {
		const filters = this.state.filters;
		const page = this.paginator.state.page;

		console.log(filters, page);

		return fakeData.search.results;
	}
}

const search = new Search();

search.addObserver((state) => {
	clearTimeout(state.filterTimeout);

	state.filterTimeout = setTimeout(() => {
		tools.url.search.set(state.filters);
		search.renderPaginator();
		search.renderResults();
	}, state.filterTimeoutInterval);
});

template.main.node.appendChild(search.node);
