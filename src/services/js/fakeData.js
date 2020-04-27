export const fakeData = {
	// user: {
	// 	name: 'Cosmin Negoita',
	// },
	header: {
		menu: [
			{ button: 'О нас' },
			{
				dropdown: {
					title: 'Услуги',
					content: [{ button: 'Трансфер' }, { button: 'Экскурсии' }],
				},
			},
			{ button: 'Вакансии' },
			{ button: 'Новости' },
			{
				dropdown: {
					title: 'Соглашения',
					content: [{ button: 'Договор' }],
				},
			},
		],
	},
	footer: {
		menu: [
			{
				content: [
					{ title: 'Навигация' },
					{ button: 'О нас' },
					{ button: 'Новости' },
					{ button: 'Служба поддержки' },
					{ button: 'Услуги' },
				],
			},
			{
				content: [
					{ title: 'О нас' },
					{ button: 'О сервисе' },
					{ button: 'Наша команда' },
					{ button: 'Вакансии' },
					{ button: 'Инвесторы' },
				],
			},
			{
				content: [
					{ title: 'Служба поддержки' },
					{ button: 'Соглашения' },
					{ button: 'Сообщества' },
					{ button: 'Связь с нами' },
				],
			},
		],
	},
	room: {
		number: 888,
		isLuxury: true,
		price: 9990,
		serviceFee: 2179,
		serviceFeeDiscount: 2179,
		images: ['./img/room1.png', './img/room2.png', './img/room3.png'],
		comfort: true,
		convenience: true,
		cosiness: true,
		diagram: [130, 65, 65, 90],
		noPets: true,
		noParty: true,
		arrivalTime: '13:00',
		leaveTime: '12:00',
		cancelable: true,
		reviewes: [
			{
				name: 'Мурад Сарафанов',
				icon: './img/foto1.png',
				date: '5 дней назад',
				likes: 12,
				isLiked: true,
				text:
					'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.',
			},
			{
				name: 'Патрисия Стёклышкова',
				icon: './img/foto2.png',
				date: 'Неделю назад',
				likes: 2,
				text:
					'Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент',
			},
		],
	},
	search: {
		priceRange: {
			max: 15000,
		},
		resultsAmount: 86,
		results: [
			{
				id: 1,
				number: 888,
				isLuxury: true,
				price: 9900,
				rating: 5,
				reviews: 145,
				images: [
					'img/rooms/image-1.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 2,
				number: 840,
				isLuxury: false,
				price: 9900,
				rating: 4,
				reviews: 65,
				images: [
					'img/rooms/image-22.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 3,
				number: 980,
				isLuxury: true,
				price: 8500,
				rating: 3,
				reviews: 35,
				images: [
					'img/rooms/image-2.png',
					'img/rooms/image-5.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 4,
				number: 856,
				isLuxury: false,
				price: 7300,
				rating: 5,
				reviews: 19,
				images: [
					'img/rooms/image-3.png',
					'img/rooms/image-2.png',
					'img/rooms/image-5.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 5,
				number: 740,
				isLuxury: false,
				price: 6000,
				rating: 4,
				reviews: 44,
				images: [
					'img/rooms/image-4.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-5.png',
				],
			},
			{
				id: 6,
				number: 982,
				isLuxury: false,
				price: 5800,
				rating: 3,
				reviews: 56,
				images: [
					'img/rooms/image-5.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 7,
				number: 678,
				isLuxury: false,
				price: 5500,
				rating: 5,
				reviews: 45,
				images: [
					'img/rooms/image-6.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 8,
				number: 450,
				isLuxury: false,
				price: 5300,
				rating: 4,
				reviews: 39,
				images: [
					'img/rooms/image-7.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 9,
				number: 350,
				isLuxury: false,
				price: 5000,
				rating: 3,
				reviews: 77,
				images: [
					'img/rooms/image-8.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 10,
				number: 666,
				isLuxury: false,
				price: 5000,
				rating: 5,
				reviews: 25,
				images: [
					'img/rooms/image-9.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			{
				id: 11,
				number: 444,
				isLuxury: true,
				price: 5000,
				rating: 3,
				reviews: 15,
				images: [
					'img/rooms/image-10.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
			,
			{
				id: 12,
				number: 352,
				isLuxury: true,
				price: 5000,
				rating: 3,
				reviews: 55,
				images: [
					'img/rooms/image-11.png',
					'img/rooms/image-2.png',
					'img/rooms/image-3.png',
					'img/rooms/image-4.png',
				],
			},
		],
	},
};
