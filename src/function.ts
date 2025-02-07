import ky from "ky";
import { z } from "zod";

// const inputLanguageField =
// 	document.querySelector<HTMLInputElement>("#input-text");
// const inputThemeField =
// 	document.querySelector<HTMLInputElement>("#input-thema");
// const buttonLanguage =
// 	document.querySelector<HTMLButtonElement>("#button-sprache");
// const buttonTheme = document.querySelector<HTMLButtonElement>("#button-thema");

const outputSection = document.querySelector<HTMLDivElement>("#output-news");

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

//Typ der API:
// type NewsArticle = {
// 	status: string;
// 	totalResults: number;
// 	articles: ArticleDetails;
// };
const ArticleSchema = z.object({
	source: z.object({
		id: z.string().nullable(),
		name: z.string(),
	}),
	author: z.string().nullable(),
	title: z.string(),
	description: z.string(),
	url: z.string(),
	urlToImage: z.string(),
	publishedAt: z.string(),
	content: z.string(),
});

const NewsArticleSchema = z.object({
	status: z.string(),
	totalResults: z.number(),
	articles: z.array(ArticleSchema),
});

type NewsArticleObject = z.infer<typeof NewsArticleSchema>;

type ArticleObject = z.infer<typeof ArticleSchema>;

// type ArticleDetails = {
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
// };

async function getArticles() {
	try {
		const responseArticle = await ky
			.get(
				`https://newsapi.org/v2/everything?q=blumen&language=de&apiKey=${apiKey}`
			)
			.json();
		const parsedResponse = NewsArticleSchema.parse(responseArticle);

		renderArticle(parsedResponse.articles);

		return responseArticle;
	} catch (err) {
		console.log("hier ist was schief gegangen");

		console.log(err);
	}
}
getArticles();

function renderArticle(entry: ArticleObject[]) {
	if (outputSection) {
		entry.forEach((element) => {
			const newDivElement = document.createElement("div");
			outputSection.appendChild(newDivElement);

			const newTextElement = document.createElement("h2");
			newTextElement.textContent = `${element.title}`;
			newDivElement.appendChild(newTextElement);

			const newImgElement = document.createElement("img");
			newImgElement.src = `${element.urlToImage}`;
			newDivElement.appendChild(newImgElement);

			const newParagraphElement = document.createElement("p");
			newParagraphElement.textContent = `${element.description}`;
			newDivElement.appendChild(newParagraphElement);

			const newButtonElement = document.createElement("button");
			newButtonElement.textContent = `Hier geht es zum Article`;
			newDivElement.appendChild(newButtonElement);
		});
	}
}
