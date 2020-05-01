import { Component } from '../../services/js/Component';
import { Paginator } from '../paginator/paginator';
import { Title } from '../title/title';

export class PaginationButtons extends Component {
	constructor(state) {
		require('./paginationButtons.sass');

		state = {
			template: require('./paginationButtons.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderTitle();
		this.renderPagination();
	}
	renderTitle() {
		const title = new Title({
			className: 'paginationButtons-title',
			title: 'Pagination',
		});

		this.node.appendChild(title.node);
	}
	renderPagination() {
		const paginator = new Paginator({
			results: 176,
		});

		this.node.appendChild(paginator.node);
	}
}
