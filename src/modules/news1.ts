import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class News1craper extends TokkiBase {
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

    const isPhotoView = /\/photos\/\d+/.test(new URL(url).pathname);
    const content = isPhotoView
      ? jsonData.props.pageProps.photoView
      : jsonData.props.pageProps.articleView;

    const postTitle = content.title;
    const mediaUrls = content.image_array;

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
