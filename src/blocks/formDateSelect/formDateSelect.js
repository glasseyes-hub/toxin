import { Block } from '../../services/js/block';
import { FormDropdown } from '../_lib/form/form-dropdown/form-dropdown';
import { Calendar } from '../calendar/calendar';
import { Container } from '../_lib/container/container';
import { Button } from '../_lib/button/button';
import { Dropdown } from '../_lib/dropdown/dropdown';
import { Input } from '../_lib/form/input/input';
import { FormInput } from '../_lib/form/form-input/form-input';
import { Title } from '../_lib/title/title';

export class FormDateSelect extends Block {
	constructor(options = {}) {
		const { attr, singleView = false, dates = null, onValuesChange } = options;

		const template = require('./formDateSelect.pug');
		require('./formDateSelect.sass');

		super({ template, attr });

		const headerClass =
			'formDateSelect_header' +
			(singleView ? ' formDateSelect_header_single' : '');

		this.header = new Container({
			attr: { class: headerClass },
		});
		this.body = new Container({
			attr: { class: 'formDateSelect_body -hidden-' },
		});

		if (singleView) {
			const dropdown = {
				attr: {
					placeholder: 'Даты пребывания',
					readonly: '',
				},
			};

			this.titles = this.getTitles(['Даты пребывания в отеле']);
			this.dropdowns = this.getDropdowns([dropdown]);
		} else {
			const dropdown = {
				attr: {
					placeholder: 'ДД.ММ.ГГГГ',
					readonly: '',
				},
				mask: '99.99.9999',
			};

			this.titles = this.getTitles(['Прибытие', 'Выезд']);
			this.dropdowns = this.getDropdowns([dropdown, dropdown]);
		}

		this.calendar = new Calendar({
			dates,
		});

		this.controls = new Container({
			attr: { class: 'formDateSelect_controls' },
		});
		this.controls.clear = new Button({
			attr: { class: 'button_clear' },
			content: 'Очистить',
		});
		this.controls.confirm = new Button({
			attr: { class: 'button_confirm' },
			content: 'Применить',
		});

		this.controls.setContent([this.controls.clear, this.controls.confirm]);
		this.header.setContent([...this.titles, ...this.dropdowns]);
		this.body.setContent([this.calendar, this.controls]);

		const content = [this.header, this.body];

		this.setContent(content);
		this.setEvents();

		this.updateHeader();
		this.onValuesChange = () => {
			onValuesChange && onValuesChange(this.values);
		};

		this.values = this.calendar.api.selectedDates;
	}
	set values([arrivalDate, leaveDate]) {
		this._values = {
			arrival: arrivalDate ? arrivalDate.toLocaleDateString() : '',
			leave: leaveDate ? leaveDate.toLocaleDateString() : '',
		};

		this.onValuesChange();
	}
	get values() {
		return this._values;
	}
	setEvents() {
		this.controls.clear.onClick(() => {
			this.calendar.api.clear();

			this.updateHeader();
			this.dropdowns.forEach(dropdown => dropdown.close());
			this.values = this.calendar.api.selectedDates;
		});

		this.controls.confirm.onClick(() => {
			this.updateHeader();
			this.dropdowns.forEach(dropdown => dropdown.close());
			this.values = this.calendar.api.selectedDates;
		});
	}
	getTitles(titles) {
		return titles.map(content => {
			return new Title({
				text: { tag: 'h3', content },
			});
		});
	}
	getDropdowns(inputs) {
		return inputs.map(input => {
			return new Dropdown({
				header: new Input({
					...input,
				}),
				body: this.body,
			});
		});
	}
	updateHeader() {
		if (this.calendar.api.selectedDates.length) {
			const [arrivalDropdown, leaveDropdown] = this.dropdowns;
			const [arrivalDate, leaveDate] = this.calendar.api.selectedDates;

			if (leaveDropdown) {
				arrivalDropdown.header.value = arrivalDate.toLocaleDateString();
				leaveDropdown.header.value = leaveDate.toLocaleDateString();
			}
			arrivalDropdown.header.value = this.getSingleDateString([
				arrivalDate,
				leaveDate,
			]);
		} else {
			this.dropdowns.forEach(dropdown => {
				dropdown.header.value = '';
			});
		}
	}
	getSingleDateString(dates) {
		return dates
			.map(date => {
				return date
					.toLocaleDateString('ru-RU', {
						day: 'numeric',
						month: 'short',
					})
					.slice(0, -1);
			})
			.join(' - ');
	}
}
