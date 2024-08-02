import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

const BASE_URL = "https://www.korean-vibe.com";

export class KoreanVibeScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".viewTitle h1").text().trim();

    const mediaSelectors = [".sliderkit-panel img", "img.__se_object"];
    const mediaUrls: string[] = [];

    mediaSelectors.forEach((selector) => {
      $(selector).each((_, el) => {
        const src = $(el).attr("src");
        if (src) {
          mediaUrls.push(BASE_URL + src.replace("_thum", ""));
        }
      });
    });

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
