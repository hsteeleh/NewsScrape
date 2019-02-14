
var request = require("request");
var cheerio = require("cheerio");

console.log("___ENTER app.js___");
request("https://www.univision.com/noticias", function(error, response, html) {
    if (error) {
        console.log("ERROR: " + error);

    } else {
        var $ = cheerio.load(html);
        var numArticles = 0;
        var scrapeResults = [];

        $("article.summary").each(function(i, element) {
            var title = $(this).find("header").find("a").attr("title");
            var url = "theonion.com" + $(this).find("a").attr("href");
            var date = $(this).find("a").attr("data-pubdate");
            var img = $(this).find("noscript").children("img").attr("src");
            var description = $(this).find("div.desc").text().trim();

            var articleData = {
                "index": i,
                "title": title,
                "description": description,
                "url": url,
                "date": date,
                "img": img
            };

            scrapeResults.push(articleData);
        });

        console.log(scrapeResults);
    }
});
