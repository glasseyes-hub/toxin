import { Block } from '../../../services/js/block';

// export class Title {
//     constructor(options) {
//         Object.assign(this, options)

//         this.text = this.node.querySelector('.title-text')
//         this.subtext = this.node.querySelector('.title-subtext')
//     }
//     setText(newText = this.text) {
//         this.text = newText
//         this.node.innerHTML = this.text
//     }
//     setSubtext(newSubtext = this.subtext) {
//         this.subtext = newSubtext
//         this.node.innerHTML = this.subtext
//     }
// }

export class Title extends Block {
	constructor(options = {}) {
		const { attr, text, subtext } = options;
		const template = require('./title.pug');
		require('./title.sass');

		super({ template, attr });

		const content = [
			text.content &&
				new Block({
					template: require('./title-text/title-text.pug'),
					tag: 'span',
					...text,
				}),
			subtext.content &&
				new Block({
					template: require('./title-subtext/title-subtext.pug'),
					tag: 'span',
					...subtext,
				}),
		];

		this.addContent(content);
	}
}
