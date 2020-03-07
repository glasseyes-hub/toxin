import { Block } from '../../../services/js/block';
import { Container } from '../container/container';

export class ImageSlider extends Block {
	constructor(options = {}) {
		const { attr, elements = [], width = 300 } = options;
		const template = require('./imageSlider.pug');
		require('./imageSlider.sass');
		super({ template, attr });

		this.width = width;
		this.currentSlide = 0;

		this.node.style.width = this.width + 'px';

		this.imagesContainer = new Container({
			attr: { class: 'imageSlider-images' },
		});
		this.buttonsContainer = new Container({
			attr: { class: 'imageSlider-buttons' },
		});

		const { images, buttons } = elements.reduce(
			(acc, element, index) => {
				acc.images.push(this.createImage(element));
				acc.buttons.push(this.createButton(index));

				return acc;
			},
			{ images: [], buttons: [] }
		);

		this.imagesContainer.setContent(images);
		this.buttonsContainer.setContent(buttons);

		this.setContent([this.imagesContainer, this.buttonsContainer]);
		this.setEvents();
	}
	setEvents() {
		this.imagesContainer.on('click', () => {
			this.selectSlide(++this.currentSlide);
		});
	}
	createImage(src) {
		const image = document.createElement('img');
		image.classList.add('imageSlider-image');
		image.style.width = this.width + 'px';
		image.src = src;
		return { node: image };
	}
	createButton(index) {
		const button = document.createElement('button');
		button.classList.add('imageSlider-button');

		if (index === 0) button.classList.add('imageSlider-button_selected');

		button.addEventListener('click', () => this.selectSlide(index));

		return { node: button };
	}
	selectSlide(index) {
		if (index + 1 > this.imagesContainer.content.list.length) index = 0;

		this.slideTo(index);
		this.updateButtonsView(index);
	}
	slideTo(index) {
		this.imagesContainer.node.scrollLeft = this.width * index;
		this.currentSlide = index;
	}
	updateButtonsView(selectedButtonIndex) {
		this.buttonsContainer.content.list.forEach(button =>
			button.node.classList.remove('imageSlider-button_selected')
		);
		this.buttonsContainer.content.list[selectedButtonIndex].node.classList.add(
			'imageSlider-button_selected'
		);
	}
}
