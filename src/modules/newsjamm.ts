import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class NewsJammScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const jsonData = JSON.parse($("script#__NEXT_DATA__").text());
    const content = jsonData.props.pageProps.contents;

    const postTitle = content.title;

    const $$ = cheerio.load(content.body);
    const mediaUrls = $$("figure.image img")
      .map((_, el) => $$(el).attr("src"))
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
