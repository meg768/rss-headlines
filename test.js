#!/usr/bin/env node

var Headlines = require('./rss-headlines.js');

class App {

	constructor() {
		let feeds = [
			{"name": "Aftonbladet", "url": "https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt"},
			{"name": "Dagens Industri", "url": "https://digital.di.se/rss"},
			{"name": "Google", "url": "https://news.google.com/rss?hl=sv&gl=SE&ceid=SE:sv"},
			{"name": "SvD", "url": "http://www.svd.se/?service=rss"},
			{"name": "Sveriges Radio", "url": "http://api.sr.se/api/rss/program/83?format=145"},
			{"name": "Expressen", "url": "https://feeds.expressen.se/nyheter"}
		];

		// Create new headlines. Poll every 60 seconds.
		this.headlines = new Headlines({feeds:feeds, interval:1000 * 60, debug:console.log, log:console.log});

		// Stop fetching after 30 minutes
		setTimeout(() => {
			console.log('Finished.');
			this.headlines.stop();
		}, 1000 * 60 * 60);

		let cache = {};

		// Display headline
		this.headlines.on('headline', (rss) => {
			let output = `${rss.date.toLocaleTimeString()}: ${rss.name} - ${rss.title}`;

			if (cache[output] != undefined)
				console.log('******************************', output);

			cache[output] = output;
			console.log(output);
		});
	}
}

new App();