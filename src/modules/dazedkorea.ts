import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

const BASE_URL = "http://www.dazedkorea.com";

export class DazedKoreaScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".article-header h1.title").text().trim();
    const mediaUrls = $(".embed-content img")
      .map((_, el) => {
        let src = $(el).attr("src");

        if (!src?.startsWith("/")) {
          src = "/" + src?.replace(/(\.\.\/)+/g, "");
        }

        return BASE_URL + src;
      })
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
