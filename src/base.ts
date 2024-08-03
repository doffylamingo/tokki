import ky from "ky";
import { ScraperType } from "./types";

export class TokkiBase {
  protected type: ScraperType;

  constructor(type: ScraperType) {
    this.type = type;
  }

  protected async getData<T>(
    url: string,
  ): Promise<{ status: number; data: string | T }> {
    try {
      const response = await ky.get(url, {
        retry: {
          limit: 2,
          methods: ["get"],
          backoffLimit: 3000,
        },
      });

      return this.type === "html"
        ? { status: response.status, data: await response.text() }
        : { status: response.status, data: await response.json() };
    } catch (_) {
      return { status: 500, data: "Error fetching data" };
    }
  }
}
