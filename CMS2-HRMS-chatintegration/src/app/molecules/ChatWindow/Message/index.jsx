import React, { useEffect } from "react";
import { Typography, Space, Avatar, Row, Col } from "antd";
import { baseUrl } from "../../../../configs/constants";

const { Text } = Typography;

export default ({ message, lastmessage, user }) => {

    useEffect(() => {
        console.log('chekcing', message)
    }, []);

    return (
        <div className={`message-box ${message?.userId == user.userId ? 'incoming' : ''} ${message?.userId == lastmessage?.userId ? 'sameuser' : ''}`}>
        <Row gutter={20} wrap={false}>
        {/* <Col flex='0 1 62px' order={message?.userId == user.userId ? 1 : 0}>
            {message?.userId != lastmessage?.userId ? <Avatar src={`${baseUrl}${message.img}`} size={42} /> : lastmessage?.type != 'message' ? <Avatar src={`${baseUrl}${message.img}`} size={42} /> : <div className="empty-space"></div>}</Col> */}
            <Col flex='auto'><div className="message-tag">
                <Space direction='vertical' size={10}>
                    {/* {message?.userId != lastmessage?.userId && message?.userId != user.userId && <Text className='c-white'>{message?.name}</Text>} */}
                    <Text>{message?.message}</Text>
                </Space>
            </div>
            </Col>
        </Row>
        </div>
    )
}

