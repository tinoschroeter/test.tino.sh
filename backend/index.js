const express = require("express");
const app = express();

const createUrl = (p = 0) => {
  const now = new Date();
  const days = 24 * 60 * 60 * 1000 * p;
  const date = new Date(now.getTime() - days);

  const currentYear = date.getFullYear().toString();
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = date.getDate().toString().padStart(2, "0");

  return `https://de.wikipedia.org/api/rest_v1/feed/featured/${currentYear}/${currentMonth}/${currentDay}`;
};

app.get("/", (req, res) => res.redirect("/api/rest_v1/0"));
app.get("/api/rest_v1/:page?", (req, res) => {
  let page = req.params.page;

  const num = parseInt(page);
  if (isNaN(num)) {
    page = 0;
  }
  const url = createUrl(page);

  const fetchWiki = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const array = data.mostread.articles.filter((item) => item.originalimage);
      const result = array.map((item) => {
        const obj = {};
        obj.title = item.normalizedtitle;
        obj.image = item.originalimage.source;
        obj.description = item.description;
        obj.url = item.content_urls.desktop.page;
        obj.txt = item.extract;

        return obj;
      });
      
      res.send(JSON.stringify(result.slice(0, 5)));
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  };
  fetchWiki();
});

app.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`);
});
