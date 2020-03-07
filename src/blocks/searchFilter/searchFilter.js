import { Block } from '../../services/js/block';

export class SearchFilter extends Block {
	constructor(options = {}) {
		const { attr, filters } = options;
		const template = require('./searchFilter.pug');
		require('./searchFilter.sass');

		super({ template, attr });

		const content = [...filters];

		this.addContent(content);

		this.inputs = this.getInputs();
		this.currentParams = this.getParams();
		this.setEvents();
	}
	setEvents() {
		this.on('click', () => {
			const newParams = this.getParams();

			if (this.isChanged(this.currentParams, newParams)) {
				this.currentParams = newParams;
				this.updateURL();
			}
		});
	}
	getInputs() {
		return Array.prototype.slice
			.call(this.node.querySelectorAll('.input'))
			.filter(input => input.name);
	}
	updateURL() {
		const searchParams = new URLSearchParams();
		const url = window.location.toString();

		Object.entries(this.currentParams).forEach(([key, value]) => {
			searchParams.set(key, value);
		});

		const newSearch = url.split('?')[0] + '?' + searchParams.toString();

		window.history.pushState('', '', newSearch);
	}
	getParams() {
		return Object.assign(
			{},
			...this.inputs
				.filter(input => input.value || input.checked)
				.map(input => {
					return { [input.name]: input.value };
				})
		);
	}
	isChanged(obj1, obj2) {
		return Object.keys(obj1).length === Object.keys(obj2).length
			? !Object.entries(obj1).every(
					([key, value]) => obj2.hasOwnProperty(key) && obj2[key] === value
			  )
			: true;
	}
}
