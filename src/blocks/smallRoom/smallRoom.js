import { NewBlock } from '../../services/js/NewBlock';
import { ImageSlider } from '../_lib/imageSlider/imageSlider';
import { Rating } from '../rating/rating';

export class SmallRoom extends NewBlock {
	constructor(options = {}) {
		super();

		const { attr, images, number, isLuxury, price, rating, reviews } = options;

		require('./smallRoom.sass');

		this.node = this.createNode({
			template: require('./smallRoom.pug'),
			options: {
				attr,
				number,
				isLuxury,
				price,
				reviews,
			},
		});

		this.addSlider(images);
		this.addRating(rating);
	}
	addSlider(images) {
		const sliderNode = this.node.querySelector('.smallRoom-slider');
		const imageSlider = new ImageSlider({
			elements: images,
			width: 270,
		});

		sliderNode.appendChild(imageSlider.node);
	}
	addRating(rating) {
		const ratingNode = this.node.querySelector('.smallRoom-rating');
		const ratingBlock = new Rating({
			rating,
			changable: false,
		});

		ratingNode.appendChild(ratingBlock.node);
	}
}
