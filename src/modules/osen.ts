import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class OsenScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".view-info_title").text().trim();

    const selector = url.includes("article")
      ? ".view_photo"
      : ".bottom-area img";

    const mediaUrls = $(selector)
      .map((_, el) => {
        const src = $(el).attr("src");
        return url.includes("article")
          ? src
          : src
              ?.replace("article_thumb", "article")
              .replace("_120x100", "_1024x");
      })
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
