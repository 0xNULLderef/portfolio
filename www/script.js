/*
 * ideas:
 * 	- fetch page, then transition to another one with swipe on full load
 * 	- the about page should be a big top thing
 */

// modify on page add
const pages = [
	{
		name: 'about',
		process: (data, section) => {
			console.warn('Stub!');
		}
	},
	{
		name: 'projects',
		process: (data, section) => {
			console.warn('Stub!');
		}
	},
	{
		name: 'contact',
		process: (data, section) => {
			console.warn('Stub!');
		}
	},
	{
		name: 'skills',
		process: (data, section) => {
			console.warn('Stub!');
		}
	},
];


const fetchPageData = async page => fetch('backend.php?endpoint=' + page).then(r => r.json());

const getPageSection = pageSection => document.querySelector('section[page=' + pageSection + ']');

/*const displayPage = async page => ({
	about: (data, section) => {
		//const container = document.create
		const img = document.createElement('img');
		img.src = data.image;
		section.append(img);
		const p = document.createElement('p');
		p.innerText = data.text;
		section.append(p);
	}
})[page](await fetchPageData(page), getPageSection(page));*/

window.addEventListener('load', async () => {
	/*document.querySelectorAll('.nav-item').forEach(item => {
		item.addEventListener('click', event => {
			event.preventDefault();
		});
	});*/

	pages.forEach(async page => page.process(await fetchPageData(page.name), getPageSection(page.name)));
});

