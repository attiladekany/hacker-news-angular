export const DATE_PARAM = 'date';
export const DEFAULT_PAGE_SIZE = 15;
export class URLPaths {
  static getPagedItemsUrl(date: string, page: number, size: number): string {
    const HACKER_NEWS_API_BASE_PATH = 'https://deno-oak-test-project.deno.dev/api';
    // http://localhost:8000/api/items/2020-01-02?page=2&size=1
    return `${HACKER_NEWS_API_BASE_PATH}/items/${date}?page=${page}&size=${size}`;
  }
  public static readonly ASK_STORIES = 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty';
  public static readonly SHOW_STORIES = 'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty';
  public static readonly JOB_STORIES = 'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty';
}
