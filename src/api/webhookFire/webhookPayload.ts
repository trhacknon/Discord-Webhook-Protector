import fetch from 'node-fetch';
import type { webhookPayloadType } from '../../types/types.js';

const webhookPayload = async ({ hook, payload }: webhookPayloadType): Promise<void> => {
  try {
    const res = await fetch(hook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'User-Agent':
          "Rdimo's webhook protector || https://github.com/Rdimo/Discord-Webhook-Protector",
        'Content-Type': 'application/json',
      },
    });
    if (res.status == 429) {
      //if we get ratelimited we just try to send again after the ratelimit
      const data: any = await res.json();
      const waitUntil = data.retry_after;
      setTimeout(() => webhookPayload({ hook, payload }), waitUntil);
    } else if (res.status !== (204 || 200)) {
      throw new Error(
        `Error sending webhook: ${res.status} status code. Response: ${await res.text()}`,
      );
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default webhookPayload;
