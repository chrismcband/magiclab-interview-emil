import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Tweet from "../Tweet/Tweet";
import { Tweet as TweetProps } from "../Tweet/Type";
import {
  getTweets,
  getTweetsByID,
  getReset,
  getTweetsBeforeID
} from "../../api/apiMethods";
import InfiniteScroll from "react-infinite-scroller";

const Container = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 100vh;
`;

const TwitterFeed = () => {
  const [tweets, setTweets] = useState<Array<TweetProps>>([]);
  const containerRef = useRef();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const initTweets = useCallback(() => {
    getTweets()
      .then((res: Array<TweetProps>) => setTweets(res || []))
      .catch(() => initTweets());
  }, []);

  const tweetsAfterId = (id: number) => {
    !scrolled &&
      getTweetsByID(id)
        .then((res: Array<TweetProps>) => {
          // Slice to 50 tweets shown at the time and filter out the duplicates.
          const unique = res.concat(tweets);
          unique.filter(
            (tweet: TweetProps, index: number, tweets: Array<TweetProps>) =>
              tweets.findIndex(t => t.id === tweet.id) === index
          );

          setTweets(unique);
        })
        .catch(() => tweetsAfterId(id));
  };

  const tweetsBeforeId = (id: number) => {
    console.log(tweets);
    getTweetsBeforeID(id)
      .then((res: Array<TweetProps>) => {
        const unique = [...tweets, ...res].filter(
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

  const scrolling = () => {
    const top = containerRef.current.scrollTop;
    const height =
      containerRef.current.scrollHeight - containerRef.current.clientHeight;

    top !== 0 ? setScrolled(true) : setScrolled(false);

    if (top === height) {
      tweets.length > 0 && tweetsBeforeId(tweets[tweets.length - 1].id);
    }
  };

  useEffect(() => {
    initTweets();
  }, [initTweets]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!scrolled) {
        // if there's no tweets in the array, initiate first poll
        if (tweets.length === 0) return initTweets();
        // if latest id in tweets arrray id 10001 reset the tweets.
        tweets[0].id === 10001 ? resetTweets() : tweetsAfterId(tweets[0].id);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  });

  return (
    <Container onScroll={() => scrolling()} ref={containerRef}>
      {tweets.map((tweet: TweetProps, index: number) => (
        <Tweet {...tweet} key={index} />
      ))}
    </Container>
  );
};

export default TwitterFeed;
