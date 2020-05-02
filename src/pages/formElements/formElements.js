import { Component } from '../../services/js/Component';
import { Input } from '../../components/input/input';
import { Dropdown } from '../../components/dropdown/dropdown';
import { DateSelect } from '../../components/dateSelect/dateSelect';
import { Subscribe } from '../../components/subscribe/subscribe';
import { CheckboxButtons } from '../../components/checkboxButtons/checkboxButtons';
import { RadioButtons } from '../../components/radioButtons/radioButtons';
import { ToggleButtons } from '../../components/toggleButtons/toggleButtons';
import { LikeButtons } from '../../components/likeButtons/likeButtons';
import { RateButtons } from '../../components/rateButtons/rateButtons';
import { RangeSlider } from '../../components/rangeSlider/rangeSlider';
import { Buttons } from '../../components/buttons/buttons';
import { PaginationButtons } from '../../components/paginationButtons/paginationButtons';
import { GuestsSelect } from '../../components/guestsSelect/guestsSelect';
import { Facilities } from '../../components/facilities/facilities';
import { AdditionalFacilities } from '../../components/additionalFacilities/additionalFacilities';
import { Availabilities } from '../../components/availabilities/availabilities';
import { BulletList } from '../../components/bulletList/bulletList';
import { Info } from '../../components/info/info';
import { Reviewes } from '../../components/reviewes/reviewes';
import { Page } from '../../services/js/Page';

class FormElements extends Component {
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
		this.renderFourthGroup();
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

		const additionalFacilities = new AdditionalFacilities({
			title: 'Expandable checkbox list',
			desk: true,
			feedingchair: true,
			crib: true,
		});
		const additionalFacilitiesOpen = new AdditionalFacilities({
			title: 'Expandable checkbox list',
			desk: true,
			feedingchair: true,
			crib: true,
			open: true,
		});
		const richCheckbox = new Availabilities({
			title: 'Rich Checkbox Buttons',
		});
		const bulletList = new BulletList({
			title: 'Bullet list',
			list: [
				'Нельзя с питомцами',
				'Без вечеринок и мероприятий',
				'Время прибытия — после 13:00, а выезд до 12:00',
			],
		});

		firstColumn.appendChild(additionalFacilities.node);
		firstColumn.appendChild(additionalFacilitiesOpen.node);
		centralColumn.appendChild(richCheckbox.node);
		lastColumn.appendChild(bulletList.node);
	}
	renderFourthGroup() {
		const group = this.node.querySelector('.formElements-group_fourth');

		const firstColumn = group.querySelector('.formElements-column_first');
		const centralColumn = group.querySelector('.formElements-column_central');

		const info = new Info({ comfort: true, convenience: true });
		const reviewes = new Reviewes({
			list: [
				{
					name: 'Мурад Сарафанов',
					img: './img/foto1.png',
					date: '5 дней назад',
					likes: 12,
					isLiked: true,
					text:
						'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.',
				},
			],
		});

		firstColumn.appendChild(info.node);
		centralColumn.appendChild(reviewes.node);
	}
}

const formElements = new FormElements();
const page = new Page();

page.main.appendChild(formElements.node);
