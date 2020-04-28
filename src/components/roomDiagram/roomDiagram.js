import { Component } from '../../services/js/Component';
import Chart from 'chart.js';

export class RoomDiagram extends Component {
	constructor(state) {
		require('./roomDiagram.sass');

		state = {
			template: require('./roomDiagram.pug'),
			data: [0, 0, 0, 0],
			colors: [
				['#FFE39C', '#FFBA9C'],
				['#6FCF97', '#66D2EA'],
				['#BC9CFF', '#8BA4F9'],
				['#919191', '#3D4975'],
			],
			...state,
		};
		state.summury = state.data.reduce((ac, val) => {
			return (ac += val);
		}, 0);

		super(state);
	}
	render() {
		super.render();

		this.renderChart();
	}
	renderChart() {
		const canvas = this.node.querySelector('.roomDiagram-canvas');

		const context = canvas.getContext('2d'),
			gradient1 = context.createLinearGradient(0, 0, 0, 100),
			gradient2 = context.createLinearGradient(0, 0, 0, 100),
			gradient3 = context.createLinearGradient(0, 0, 0, 100),
			gradient4 = context.createLinearGradient(0, 0, 0, 100);

		gradient1.addColorStop(0, this.state.colors[0][0]);
		gradient1.addColorStop(1, this.state.colors[0][1]);
		gradient2.addColorStop(0, this.state.colors[1][0]);
		gradient2.addColorStop(1, this.state.colors[1][1]);
		gradient3.addColorStop(0, this.state.colors[2][0]);
		gradient3.addColorStop(1, this.state.colors[2][1]);
		gradient4.addColorStop(0, this.state.colors[3][0]);
		gradient4.addColorStop(1, this.state.colors[3][1]);

		const chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: ['Великолепно', 'Хорошо', 'Удовлетворительно', 'Разочарован'],
				datasets: [
					{
						label: '# of Votes',
						data: this.state.data,
						backgroundColor: [gradient1, gradient2, gradient3, gradient4],
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				cutoutPercentage: 90,
				rotation: Math.PI * 0.5,
				legend: {
					position: 'right',
					align: 'end',
					labels: {
						boxWidth: 9,
						fontSize: 14,
						fontFamily: 'Montserrat',
						usePointStyle: true,
					},
				},
				layout: {
					padding: {
						top: -2,
						left: -12,
						right: 27,
					},
				},
			},
		});

		chart.canvas.parentNode.style.height = '124px';
	}
}
