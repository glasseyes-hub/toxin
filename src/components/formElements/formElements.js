import { Component } from '../../services/js/Component';
import { Input } from '../input/input';
import { Dropdown } from '../dropdown/dropdown';
import { DateSelect } from '../dateSelect/dateSelect';
import { Subscribe } from '../subscribe/subscribe';

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
	}
	renderFirstGroup() {
		const firstColumn = this.node.querySelector(
			'.formElements-group_first .formElements-column_first'
		);

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

		firstColumn.appendChild(defaultInput.node);
		firstColumn.appendChild(hoverInput.node);
		firstColumn.appendChild(defaultDropdown.node);
		firstColumn.appendChild(maskedInput.node);
		firstColumn.appendChild(dateDropdown.node);
		firstColumn.appendChild(filterDateDropdown.node);
		firstColumn.appendChild(subscribe.node);
	}
}
