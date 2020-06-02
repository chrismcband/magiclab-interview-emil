import { fetch } from "../utils/axios";

const url = `https://magiclab-twitter-interview.herokuapp.com/emil-fjellstrom`;

export const getTweets = () =>
  fetch(`${url}/api`, "GET", undefined, {
    params: { count: 10 }
  }).then(res => res.data);

export const getTweetsByID = (after: number) =>
  fetch(`${url}/api`, "GET", undefined, {
    params: { afterId: after, count: 10 }
  }).then(res => res.data);

export const getReset = () =>
  fetch(`${url}/reset`, "GET", undefined, undefined).then(res => res.data);
