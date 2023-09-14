/*
 * ideas:
 * 	- fetch page, then transition to another one with swipe on full load
 * 	- the about page should be a big top thing
 */

// modify on page add

const setInnerText = (element, value) => {
	element.innerText = value;
};

const setSrc = (element, value) => {
	element.src = value;
};

const set = {
	H1: setInnerText,
	P: setInnerText,
	IMG: setSrc
};

const processGeneric = (data, section) => {
	Object.entries(data).forEach(([property, value]) => {
		const element = section.querySelector(`[property=${property}]`);
		set[element.tagName](element, value);
	});
};

const clearChildren = element => { while(element.firstChild) element.removeChild(element.lastChild); };

const pages = [
	{
		name: 'about',
		process: processGeneric
	},
	{
		name: 'projects',
		process: (data, section) => {
			clearChildren(section);
			data.forEach(project => {
				const row = document.createElement('div');
				row.classList.add('project', 'row', 'my-2');
				section.appendChild(row);
				const col = document.createElement('div');
				col.classList.add('col-12', 'p-5', 'd-flex', 'align-items-center', 'bg-body-secondary');
				row.appendChild(col);
				const container = document.createElement('div');
				container.classList.add('container');
				col.appendChild(container);
				const a = document.createElement('a');
				a.classList.add('portfolio-highlight', 'text-decoration-none');
				a.href = project.url;
				container.appendChild(a);
				const h1 = document.createElement('h1');
				h1.appendChild(document.createTextNode(project.name));
				a.appendChild(h1);
				const p = document.createElement('p');
				p.appendChild(document.createTextNode(project.description));
				container.appendChild(p);
			});
		}
	},
	{
		name: 'skills',
		process: (data, section) => {
			clearChildren(section);
			data.forEach(skill => {
				const row = document.createElement('div');
				row.classList.add('skill', 'row', 'my-2');
				section.appendChild(row);
				const col = document.createElement('div');
				col.classList.add('col-12', 'p-5', 'd-flex', 'bg-body-tertiary');
				row.appendChild(col);
				const container = document.createElement('div');
				container.classList.add('container');
				col.appendChild(container);
				const h3 = document.createElement('h3');
				h3.appendChild(document.createTextNode(skill.name));
				container.appendChild(h3);
				const progress = document.createElement('div');
				progress.classList.add('progress');
				progress.setAttribute('role', 'progressbar');
				container.appendChild(progress);
				const bar = document.createElement('div');
				bar.classList.add('progress-bar', 'portfolio-highlight-background');
				bar.style = `width: ${skill.percentage}%`;
				bar.appendChild(document.createTextNode(`${skill.percentage}%`));
				progress.appendChild(bar);
			});
		}
	},
];

const fetchBackend = async (endpoint, params) => fetch('backend.php?endpoint=' + endpoint, params ?? null).then(r => r.json());

const getPageSection = pageSection => document.querySelector('[section=' + pageSection + ']');

pages.forEach(async page => page.process(await fetchBackend(page.name), getPageSection(page.name)));

const allowEdit = () => document.body.setAttribute("edit", "true");

fetchBackend('status').then(response => {
	if(response.authorized) {
		allowEdit();
	}
});

document.getElementById('login-form').addEventListener('submit', async function(event) {
	event.preventDefault();

	const response = await fetchBackend(
		'login',
		{
			method: 'POST',
			body: new FormData(this)
		}
	);
	if(response.success) {
	}
});

document.getElementById('add-skill-form').addEventListener('submit', async function(event) {
	event.preventDefault();

	const response = await fetchBackend(
		'skills',
		{
			method: 'POST',
			body: new FormData(this)
		}
	);
});

document.getElementById('add-project-form').addEventListener('submit', async function(event) {
	event.preventDefault();

	const response = await fetchBackend(
		'projects',
		{
			method: 'POST',
			body: new FormData(this)
		}
	);
});

