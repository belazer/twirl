import React, { Component } from 'react';
import TwitterAPI from 'twitter';
import { takeRight } from 'lodash';
import Tweets from './Tweets';

// open -a Google\ Chrome --args --disable-web-security --user-data-dir
const client = new TwitterAPI({
  consumer_key: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET,
});

class Twitter extends Component {
  state = {
    tweets: [],
  };
  componentDidMount() {
    const { numberOfTweets = 10 } = this.props;
    this.stream = client.stream('statuses/filter', { track: 'twitter' });
    this.stream.on('data', tweet => {
      const tweets = [...this.state.tweets, tweet];
      const maxTweets = takeRight(tweets, numberOfTweets);
      this.setState({
        tweets: maxTweets,
      });
    });
    this.stream.on('error', function(error) {
      throw error;
    });
  }
  componentWillUnmount() {
    this.stream.destroy();
  }

  render() {
    return (
      <div className="Twitter">
        <Tweets tweets={this.state.tweets} />
      </div>
    );
  }
}
export default Twitter;
