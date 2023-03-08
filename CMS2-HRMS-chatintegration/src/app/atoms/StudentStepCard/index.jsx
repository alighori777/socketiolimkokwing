import React from "react";
import { Row, Col, Card, Typography, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import StepsIcons from "../StepsIcons";
export const baseUrl = process.env.REACT_APP_BASE_URL;

const { Text, Title } = Typography;

export default (props) => {

    const { data, link, stage, type, comp, fullLink } = props;

    return (
        <Card className="uni-card main-card-hover link-cursor h-auto"
        bordered={false}>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Link to={{ pathname: `${link}`, state: {code: data.name}}}>
                    <Row gutter={[20,30]}>
                        <Col span={24}>
                            <Space size={20} className='w-100'>
                                <Avatar size={70} src={data?.user_image ? `${baseUrl}${data?.user_image}` : ''} />
                                <Space direction='vertical' className='w-100' size={5}>
                                    <Title level={4} className="mb-0 font-500">{data?.applicant_name}</Title>
                                    <Text className='c-gray'>{data?.name}</Text>
                                </Space>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <StepsIcons stage={stage} type={type} noTitle={true} />
                        </Col>
                        {comp && fullLink && <Col span={24}>{comp}</Col>}
                    </Row>
                    </Link>
                </Col>
                {comp && !fullLink && <Col span={24}>{comp}</Col>}
            </Row>
        </Card>
    );
};