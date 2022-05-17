import { rateLimitTimeout } from "../settings";
import type { rateLimit } from "../types/types";

export default class RateLimit implements rateLimit {
  /**
   * Ratelimits unauthorized ip's
   * @access public
   **/
  ip: string;
  limit: Set<string>;
  constructor(ip: string) {
    this.ip = ip === "::1" ? "127.0.0.1" : ip;
    this.limit = new Set();
  }
  public exist() {
    /**
     * if ip is already ratelimited
     *
     * @returns {boolean}
     */
    if (this.limit.has(this.ip)) return true;
    return false;
  }
  public timeout() {
    /**
     * sets a rateLimitTimeout or 30 sec ratelimit on the ip
     *
     * @returns {void}
     */
    this.limit.add(this.ip);
    console.log(`ratelimited ${this.ip}`);
    setTimeout(() => {
      this.limit.delete(this.ip);
    }, rateLimitTimeout || 30000);
  }
}
