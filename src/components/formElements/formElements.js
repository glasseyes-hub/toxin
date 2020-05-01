import { Component } from '../../services/js/Component';
import { Input } from '../input/input';
import { Dropdown } from '../dropdown/dropdown';
import { DateSelect } from '../dateSelect/dateSelect';
import { Subscribe } from '../subscribe/subscribe';
import { CheckboxButtons } from '../checkboxButtons/checkboxButtons';
import { RadioButtons } from '../radioButtons/radioButtons';
import { ToggleButtons } from '../toggleButtons/toggleButtons';
import { LikeButtons } from '../likeButtons/likeButtons';
import { RateButtons } from '../rateButtons/rateButtons';
import { Slider } from '../slider/slider';
import { RangeSlider } from '../rangeSlider/rangeSlider';
import { Buttons } from '../buttons/buttons';
import { PaginationButtons } from '../paginationButtons/paginationButtons';
import { GuestsSelect } from '../guestsSelect/guestsSelect';
import { Facilities } from '../facilities/facilities';

export class FormElements extends Component {
	constructor(state) {
		require('./formElements.sass');

		state = {
			template: require('./formElements.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderFirstGroup();
		this.renderSecondGroup();
		this.renderThirdGroup();
	}
	renderFirstGroup() {
		const group = this.node.querySelector('.formElements-group_first');

		const firstColumn = group.querySelector('.formElements-column_first');
		const centralColumn = group.querySelector('.formElements-column_central');
		const lastColumn = group.querySelector('.formElements-column_last');

		const defaultInput = new Input({
			title: 'Text field',
			subtitle: 'Default',
			placeholder: 'Email',
		});
		const hoverInput = new Input({
			className: 'input_hovered',
			title: 'Text field',
			subtitle: 'Hover / Focus',
			placeholder: 'Some text',
			value: 'This is pretty awesome',
		});
		const defaultDropdown = new Dropdown({
			type: 'input',
			title: 'Dropdown',
			subtitle: 'Default',
			placeholder: 'Сколько гостей',
		});
		const maskedInput = new Input({
			className: 'formElements-input formElements-input_masked',
			title: 'Masked text field',
			subtitle: 'Default',
			placeholder: 'ДД.ММ.ГГГГ',
			mask: '99.99.9999',
		});
		const dateDropdown = new DateSelect({
			className: 'formElements-dateDropdown',
			arrivalTitle: 'Date Dropdown',
			leaveTitle: 'Date Dropdown',
			leave: new Date(2019, 7, 19),
		});
		const filterDateDropdown = new DateSelect({
			className: 'formElements-filterDateDropdown',
			single: true,
			title: 'Filter date dropdown',
			arrival: new Date(2019, 7, 19),
			leave: new Date(2019, 7, 23),
		});
		const subscribe = new Subscribe({
			className: 'formElements-subscribe',
			title: 'Subscription text field',
		});

		const checkboxButtons = new CheckboxButtons({
			pets: true,
			invitation: true,
		});
		const radioButtons = new RadioButtons({
			className: 'formElements-radioButtons',
		});
		const toggleButtons = new ToggleButtons({
			className: 'formElements-toggleButtons',
		});
		const likeButtons = new LikeButtons({
			className: 'formElements-likeButtons',
		});
		const rateButtons = new RateButtons({
			className: 'formElements-rateButtons',
		});
		const rangeSlider = new RangeSlider({
			className: 'formElements-rangeSlider',
			max: 15000,
			start: 5000,
			end: 10000,
		});
		const buttons = new Buttons({
			className: 'formElements-buttons',
		});
		const paginationButtons = new PaginationButtons({
			className: 'formElements-paginationButtons',
		});

		firstColumn.appendChild(defaultInput.node);
		firstColumn.appendChild(hoverInput.node);
		firstColumn.appendChild(defaultDropdown.node);
		firstColumn.appendChild(maskedInput.node);
		firstColumn.appendChild(dateDropdown.node);
		firstColumn.appendChild(filterDateDropdown.node);
		firstColumn.appendChild(subscribe.node);
		centralColumn.appendChild(checkboxButtons.node);
		centralColumn.appendChild(radioButtons.node);
		centralColumn.appendChild(toggleButtons.node);
		centralColumn.appendChild(likeButtons.node);
		centralColumn.appendChild(rateButtons.node);
		lastColumn.appendChild(rangeSlider.node);
		lastColumn.appendChild(buttons.node);
		lastColumn.appendChild(paginationButtons.node);
	}
	renderSecondGroup() {
		const group = this.node.querySelector('.formElements-group_second');

		const firstColumn = group.querySelector('.formElements-column_first');
		const centralColumn = group.querySelector('.formElements-column_central');
		const lastColumn = group.querySelector('.formElements-column_last');

		const facilities = new Facilities({
			title: 'Dropdown',
			subtitle: 'Default',
			bedrooms: 2,
			beds: 2,
		});

		const facilitiesOpen = new Facilities({
			title: 'Dropdown',
			subtitle: 'Expanded',
			bedrooms: 2,
			beds: 2,
			open: true,
		});

		const guestsSelect = new GuestsSelect({
			title: 'Dropdown',
			open: true,
		});
		const guestsSelectFilled = new GuestsSelect({
			title: 'Dropdown',
			adult: 2,
			children: 1,
			open: true,
		});

		firstColumn.appendChild(facilities.node);
		firstColumn.appendChild(facilitiesOpen.node);
		centralColumn.appendChild(guestsSelect.node);
		lastColumn.appendChild(guestsSelectFilled.node);
	}
	renderThirdGroup() {
		const group = this.node.querySelector('.formElements-group_third');

		const firstColumn = group.querySelector('.formElements-column_first');
		const centralColumn = group.querySelector('.formElements-column_central');
		const lastColumn = group.querySelector('.formElements-column_last');
	}
}
