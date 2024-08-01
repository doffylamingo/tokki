import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

const BASE_URL = "https://www.esquirekorea.co.kr";

export class EsquireScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".tit_article").text().trim();
    const headerMediaPC = $("div.atc_header_img picture img").attr("src");
    const headerMediaMobile = $("div.atc_header_img picture source").attr(
      "srcset",
    );
    const mediaUrls = $(".atc_body_cont img")
      .map((_, el) => `${BASE_URL}${$(el).attr("src")}`)
      .get();

    if (headerMediaMobile) mediaUrls.push(BASE_URL + headerMediaMobile);
    if (headerMediaPC) mediaUrls.push(BASE_URL + headerMediaPC);

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
