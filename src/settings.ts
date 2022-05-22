import moment from 'moment';
import config from '../config.json';

const webhook = config.webhook;
const pass32 = config.pass32;
const rateLimitTimeout = config.rateLimitTimeout;
const port = process.env.PORT || config.port;
const time = 'Today at: ' + moment().format('YYYY-MM-DD・HH:mm:ss');

export { webhook, pass32, rateLimitTimeout, port, time };