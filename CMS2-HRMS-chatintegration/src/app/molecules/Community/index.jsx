import React, { useState, useEffect, Fragment } from 'react';
import { Card, Typography, Row, Col, Tag, Space, Badge, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser, storeMessages, toggleChat } from '../ChatWindow/ducks/actions';
import { baseUrl } from '../../../configs/constants';

const { Title, Text } = Typography;
const { CheckableTag } = Tag;
const _ = require('lodash');

const communityFeed = {
    programs: [
      {
        label: 'Bachelor of Design (Hons) Professional Design (Visual Communication)',
        value:'LUCT-BDP',
      },
    ],
    modules: [
      {
        label: 'Design Principles',
        value:'LUCT-DP',
        messages: 15
      },
      {
        label: 'Visual Problem Solving',
        value:'LUCT-VPS',
        messages: 0
      },
      {
        label: 'Design Heritage',
        value:'LUCT-DH',
        messages: 0
      },
    ],
    individual: [
      {
        name: 'Lori Ramirez',
        id:'000123456',
        image: '',
        type: 'student',
        messages: 15
      },
      {
        name: 'Justin Graber',
        id:'000123457',
        image: '',
        type: 'student',
        messages: 0
      },
      {
        name: 'Emma Fox',
        id:'000123458',
        type: 'student',
        messages: 0
      },
    ],
    meet: [
      {
        title: 'Study Session #1',
        date: '2021-06-10',
        time: '10:30:00',
        location: 'Grafa Café & Restaurant',
        people: [
          {
            id: '00123',
            name: 'Lori Ramirez',
            image: '',
          },
          {
            id: '00124',
            name: 'Chad Murphy',
            image: '',
          },
          {
            id: '00125',
            name: 'Doris Boyd',
            image: '',
          },
          {
            id: '00126',
            name: 'Tyler Andrews',
            image: '',
          },
          {
            id: '00127',
            name: 'Carmen Sc...',
            image: '',
          },
          {
            id: '00128',
            name: 'Amanda Pie...',
            image: '',
          },
          {
            id: '00129',
            name: 'Alan James',
            image: '',
          },
          {
            id: '00130',
            name: 'Dorothy Haw...',
            image: '',
          },
          {
            id: '00131',
            name: 'Nick Palmer',
            image: '',
          },
          {
            id: '00132',
            name: 'Bruce Gomez',
            image: '',
          },
        ]
      }
    ],
    options: [
        { title: 'Registry', color: 'b-success'},
        { title: 'Visa & Passport', color: 'b-pending'},
        { title: 'Finance', color: 'b-pink'},
        { title: 'Accommodation', color: 'b-primary'},
        { title: 'Faculty', color: 'b-purple'},
        { title: 'Medical Assistance', color: 'b-error'},
    ]
  }


export default (props) => {
    
    // const { socket } = props;
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const users = useSelector(state => state.chat.users);

    const onChange = (tag, checked) => {
      // dispatch(toggleChat(checked))
        const nextSelectedTags = checked ? [tag] : [];
        setValue(nextSelectedTags);
    };

    const startChat = (user) => {
      dispatch(selectedUser(user));
      dispatch(storeMessages([]));
      // socket.emit("user messages", user);
      dispatch(toggleChat(true))
    }

    return (
      <>
        <Card bordered={false} className="transparent-card" style={{ height: 'calc(100vh - 220px)' }}>
          <Row gutter={[20,30]}>
            <Col span={24}>
              <Row gutter={[20,20]}>
                <Col span={24}>
                  <Title level={5} className='mb-0 c-gray caps'>Programme</Title>
                </Col>
                <Col span={24}>
                    <Space direction="vertical" size={10} className='w-100'>
                    {communityFeed.programs.map((x,i) => (
                        <CheckableTag
                            className='chattags'
                            key={x.value}
                            checked={value.indexOf(x.value) > -1}
                            onChange={checked => onChange(x.value, checked)}
                        >
                        {x.label}
                        </CheckableTag>
                    ))}
                    </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[20,20]}>
                <Col span={24}>
                  <Title level={5} className='mb-0 c-gray caps'>Modules</Title>
                    
                </Col>
                <Col span={24}>
                    <Space direction="vertical" size={10} className='w-100'>
                    {communityFeed.modules.map((x,i) => (
                        <CheckableTag
                            className='chattags'
                            key={x.value}
                            checked={value.indexOf(x.value) > -1}
                            onChange={checked => onChange(x.value, checked)}
                        >
                            <Row gutter={20}>
                                <Col flex={'auto'}>{x.label}</Col>
                                <Col flex={'0 1 40px'}>
                                {x.messages > 0 ? <Badge className="menu-badge" count={x.messages} /> : ''}</Col>
                            </Row>
                        
                        </CheckableTag>
                    ))}
                    </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row level={5} gutter={[20,20]}>
                <Col span={24}>
                  <Title level={5} className='mb-0 c-gray caps'>Messages</Title>
                </Col>
                <Col span={24}>
                  <Row gutter={[30,20]}>
                        {_.map(users, (x,i) => (
                    <Col span={8}>
                      <Space direction='vertical' size={10}>
                          <Fragment key={i}>
                            <Badge count={0}>
                              <Avatar className={`cursor-pointer ${x.connected ? "online" : "offline"}`} size={60} src={x.img ? `${baseUrl}${x.img}`: ''} onClick={() => startChat(x)} />
                            </Badge>
                            <div className='icon-text-wrap'>
                            <Text>{x.name}</Text>
                            </div>
                          </Fragment>
                        
                      </Space>
                    </Col>
                        ))}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[20,20]}>
                <Col span={24}>
                  <Title level={5} className='mb-0 c-gray caps'>Upcoming Meet Ups</Title>
                  
                </Col>
                <Col span={24}></Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[20,20]}>
                <Col span={24}>
                  <Title level={5} className='mb-0 c-gray caps'>Services</Title>
                </Col>
                <Col span={24}>
                    <Space direction="vertical" size={10} className='w-100'>
                    {communityFeed.options.map((x,i) => (
                    <CheckableTag
                        className='chattags'
                        key={x.value}
                        checked={value.indexOf(x.title) > -1}
                        onChange={checked => onChange(x.title, checked)}
                    >
                        <Row gutter={20} align='middle'>
                            <Col flex='26px'><Avatar className={x.color} size={26}>{x.title.charAt(0)}</Avatar></Col>
                            <Col flex='auto'>{x.title}</Col>
                        </Row>
                    
                    </CheckableTag>
                    ))}
                    </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        
        </>
    )
}