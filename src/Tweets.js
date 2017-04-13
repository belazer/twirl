import React from 'react';
import Tweet from './Tweet';

function Tweets({ tweets }) {
  return (
    <div>
      <ul>
        {tweets.map(tweet => {
          return (
            <li key={tweet.id}>
              <Tweet tweet={tweet} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Tweets;
