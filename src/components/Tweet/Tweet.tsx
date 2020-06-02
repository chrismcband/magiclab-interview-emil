import React from "react";
import { Card, Avatar } from "antd";
import "antd/dist/antd.css";
import { Tweet as TweetProps } from "./Type";

const Tweet = (props: TweetProps) => {
  const { image, text, username } = props;
  const { Meta } = Card;
  return (
    <Card style={{ width: "100%", marginTop: 16 }}>
      <Meta
        avatar={<Avatar src={image} />}
        title={username}
        description={text}
      />
    </Card>
  );
};

export default Tweet;
