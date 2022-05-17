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
    this.ip = ip;
    this.limit = new Set();
    if (this.ip === "127.0.0.1" || this.ip === "::1") return;
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
     * ratelimit ip and remove ratelimit after 12 seconds
     *
     * @returns {void}
     */
    //ratelimit ip and remove ratelimit after 12 seconds
    this.limit.add(this.ip);
    console.log(`ratelimited ${this.ip}`);
    setTimeout(() => {
      this.limit.delete(this.ip);
    }, rateLimitTimeout || 12000);
  }
}
