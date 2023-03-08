import React from 'react';
import { Card, Row, Col, Typography, Space, Avatar, Button } from 'antd';
import { DocumentIcon, SearchIcon } from 'Atoms/CustomIcons';
import { baseUrl } from '../../../../configs/constants';
import { toggleChat, userLoggedIn } from '../ducks/actions';
import { CloseCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const { Title, Text } = Typography;

export default (props) => {

    const { user } = props;
    const dispatch = useDispatch();

    const closePanel = () => {
      dispatch(toggleChat(false));
      dispatch(userLoggedIn({}));
    }

    return (
        <Card bordered={false} className="uni-card no-radius b-gray2 chat-header">
          <Button type="link" className="right-card-link" onClick={() => closePanel()}
          icon={<CloseCircleFilled />}
        />
          {/* <Space direction='vertical' size={10} className='w-100'>
                            <Row gutter={[20,10]} wrap={false}>
                                <Col flex='auto'>
                                    <Title level={4} className='mb-0 c-default'>Bachelor of Design (Hons) Professional Design (Visual Communication)</Title>
                                </Col>
                                <Col flex='0 1 20px'><SearchIcon /></Col>
                                <Col flex='0 1 20px'><DocumentIcon /></Col>
                            </Row>
                            <Text className='c-gray'>122 Members</Text>
                        </Space> */}
          <Row gutter={10} wrap={false}>
            <Col flex="auto">
              <Space size={20}>
                <Avatar size={60} src={user.img ? `${baseUrl}${user.img}` : ''} />
                <Space direction="vertical" size={10}>
                  <Title level={4} className="mb-0 c-default">{user.name}</Title>
                  <Text className="c-gray">Bachelor of Design (Hons) in Transport Design</Text>
                  <Space size={10}>
                    <Avatar size={18} />
                    <Text className="c-gray">Malaysia</Text>
                  </Space>
                </Space>
              </Space>
            </Col>
            <Col flex="0 1 30px">
              <SearchIcon />
            </Col>
            <Col flex="0 1 30px">
              <DocumentIcon />
            </Col>
          </Row>
        </Card>
    )
}