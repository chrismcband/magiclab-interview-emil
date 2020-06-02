import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Tweet from "../Tweet/Tweet";
import { Tweet as TweetProps } from "../Tweet/Type";
import { getTweets, getTweetsByID, getReset } from "../../api/apiMethods";

const Container = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 100vh;
`;

const TwitterFeed = () => {
  const [tweets, setTweets] = useState<Array<TweetProps>>([]);

  const initTweets = useCallback(() => {
    getTweets()
      .then((res: Array<TweetProps>) => setTweets(res || []))
      .catch(() => initTweets());
  }, []);

  const tweetsAfterId = (id: number) => {
    getTweetsByID(id)
      .then((res: Array<TweetProps>) => {
        // Slice to 50 tweets shown at the time and filter out the duplicates.
        const unique = res.concat(tweets).slice(0, 50);
        unique.filter(
          (tweet: TweetProps, index: number, tweets: Array<TweetProps>) =>
            tweets.findIndex(t => t.id === tweet.id) === index
        );

        setTweets(unique);
      })
      .catch(() => tweetsAfterId(id));
  };

  const resetTweets = () => {
    setTweets([]);
    getReset()
      .then((res: { success: boolean }) =>
        res.success ? initTweets() : resetTweets()
      )
      .catch(() => resetTweets());
  };

  useEffect(() => {
    initTweets();
  }, [initTweets]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // if there's no tweets in the array, initiate first poll
      if (tweets.length === 0) return initTweets();
      // if latest id in tweets arrray id 10001 reset the tweets.
      tweets[0].id === 10001 ? resetTweets() : tweetsAfterId(tweets[0].id);
    }, 2000);
    return () => clearTimeout(timeout);
  });

  return (
    <Container>
      {tweets.map((tweet: TweetProps, index: number) => (
        <Tweet {...tweet} key={index} />
      ))}
    </Container>
  );
};

export default TwitterFeed;
