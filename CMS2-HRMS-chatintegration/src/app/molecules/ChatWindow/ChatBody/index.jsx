import React, { Fragment, useEffect } from 'react';
import { Card } from 'antd';
import Message from '../Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';

export default (props) => {

    const { messages, user } = props;

    return (
        <Card bordered={false} className="uni-card chat-body b-dark-gray">
          <ReactScrollToBottom className="scroller">
            <div className="scrol-pad">
              {messages.map((item, i) => (
                <Fragment key={i}>
                  <Message message={item} user={user} lastmessage={i > 0 ? messages[i - 1] : null} />
                </Fragment>
              ))}
            </div>
          </ReactScrollToBottom>
        </Card>
    )
}


// {item?.type == 'UserStatus' ?
// <div className="text-center">
//   <div className={`chat-info ${item?.userId !==  user.userId ? 'other-chat-info' : ''}`}>
//     {item?.userId ===  user.userId ? "You have Joined" : `${item.name} has Joined!`}
//   </div>
// </div>
// :
// <Message message={item} user={user} lastmessage={i > 0 ? messages[i - 1] : null} />
// }