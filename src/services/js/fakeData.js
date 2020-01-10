export const fakeData = {
	menuList: [
		{ content: 'О нас' },
		{
			content: 'Услуги',
			submenu: {
				title: 'title1',
				content: [{ content: 'Трансфер' }, { content: 'Экскурсии' }],
			},
		},
		{ content: 'Вакансии' },
		{ content: 'Новости' },
		{
			content: 'Соглашеня',
			submenu: {
				title: 'title2',
				content: [{ content: 'Договор' }],
			},
		},
	],
};
