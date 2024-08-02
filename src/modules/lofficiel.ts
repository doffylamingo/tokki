import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class LOfficielScraper extends TokkiBase {
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
    const article = jsonData.props.pageProps.subscription.initialData.article;

    const postTitle = article.title;

    const mediaUrls: string[] = [];

    const extractImageUrls = (image: any) => {
      if (image && image.url) {
        mediaUrls.push(image.url.split("?")[0]);
      }
    };

    article.postCover.forEach((cover: any) => {
      extractImageUrls(cover.coverImage);
    });

    article.postBlocks.forEach((block: any) => {
      if (block.__typename === "ImageBoxRecord") {
        extractImageUrls(block.image);
      } else if (block.images) {
        block.images.forEach(extractImageUrls);
      }
    });

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
