import ky from "ky";

//Typ der API:
type NewsArticle = {
	status: string;
	totalResults: number;
	articles: ArticleDetails;
	// Array<{
	// 	source: {
	// 		id?: string;
	// 		name: string;
	// 	};
	// 	author?: string;
	// 	title: string;
	// 	description: string;
	// 	url: string;
	// 	urlToImage: string;
	// 	publishedAt: string;
	// 	content: string;
	// }>;
};

type ArticleDetails = {
	source: {
		id?: string;
		name: string;
	};
	author?: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	content: string;
};

const inputLanguageField =
	document.querySelector<HTMLInputElement>("#input-text");
const inputThemeField =
	document.querySelector<HTMLInputElement>("#input-thema");
const buttonLanguage =
	document.querySelector<HTMLButtonElement>("#button-sprache");
const buttonTheme = document.querySelector<HTMLButtonElement>("#button-thema");

const outputSection = document.querySelector<HTMLDivElement>("#output-news");

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

async function getArticles() {
	const newsArticles = await ky
		.get<NewsArticle[]>(
			`https://newsapi.org/v2/everything?q=blumen&language=de&apiKey=${apiKey}`
		)
		.json();
	console.log(newsArticles);

	renderArticle(newsArticles);

	return newsArticles;
}
getArticles();

function renderArticle(entry: NewsArticle[]) {
	if (outputSection) {
		entry.forEach((element) => {
			const newDivElement = document.createElement("div");
			outputSection.appendChild(newDivElement);

			const newTextElement = document.createElement("h2");
			newTextElement.textContent = `${element.articles.title}`;
			newDivElement.appendChild(newTextElement);

			const newImgElement = document.createElement("img");
			newImgElement.src = `${element.articles.urlToImage}`;
			newDivElement.appendChild(newImgElement);

			const newParagraphElement = document.createElement("p");
			newParagraphElement.textContent = `${element.articles.description}`;
			newDivElement.appendChild(newParagraphElement);

			const newButtonElement = document.createElement("button");
			newButtonElement.textContent = `Hier geht es zum Article`;
			newDivElement.appendChild(newButtonElement);
		});
	}
}
