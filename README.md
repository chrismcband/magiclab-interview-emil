# Notes for MagicLab Code

#### If I was not limited by the instructions of the task I would implement the following.

1. From a UX standpoint, having the feed continually updating causes difficulty for the user to keep up with reading the tweets. By making the following adjustments the users would be able to navigate the feed freely and read the tweets more easily.

2. I would pull the latest tweet by count one and subtract its ID with the latest pulled ID in the local state to be able to calculate the gap in-between the new tweet and the current tweet.

```tsx
const latestTweet = () =>
  getTweets(1).then(
    (res: Array<TweetProps>) => res && setNewTweets(res[0].id - tweets[0].id)
  );
```

3. In this case, the feed would not be moving every two seconds instead it would fetch in the background to make the above calculation displayed through a button e.g. ‘X new tweets’

```tsx
<Button type="primary" onClick={latestTweets()} block>
  {newTweets} new tweets
</Button>
```

4. To read previous tweets users would scroll down to the bottom of the feed and call the before ID API method with a helper tool, such as the one seen here https://www.npmjs.com/package/react-infinite-scroller

```tsx
<InfiniteScroll
  initialLoad={false}
  loadMore={() => tweetsBeforeId(tweets[tweets.length - 1].id)}
  useWindow={false}
>
```

5. The above points will help limit the consumption of bandwidth and will make the whole service run smoothly creating a better experience for the user.
