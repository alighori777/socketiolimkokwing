import React from 'react';
import { Card, Row, Col, Space, Typography } from 'antd';
import { calculateDays } from '../../modules/AQA/utils/dateCalc';
import { ClockIcon, PendingIcon, TickIcon, UploadDoneIcon } from '../CustomIcons';

const { Text, Title } = Typography;

export default (props) => {

    const { status, title, text1, text2, date, extraClass, page, index, open, numb } = props;

    return (
        <Card bordered={false} className={`uni-card-small ${extraClass ? extraClass : ''} ${status == 0 ? 'b-pending' : status == 1 ? 'b-black' : page ? 'b-dark-gray' : 'b-black' }`}>
            <Row gutter={page ? [20,30] : [20,10]}>
                <Col span={24}>
                    <Row gutter={[20,30]}>
                        <Col flex='auto'>
                            <Space direction='vertical' size={20} className={`w-100 ${page ? 'text-center' : ''}`}>
                                {page && numb > 1 && <span className={`sole-icon ${status == 1 ? 'b-dark-gray' : 'b-black'}`}>{index}</span>}
                                <Title level={page ? 4 : 5} className={`mb-0 ${page ? 'text-center' : ''} ${status == 2 ? 'c-gray' : ''}`}>{title}</Title>
                                {page && (status != 2 || numb < 3) && open == 'true' && <Title level={5} className={`m-0 text-center ${status == 0 ? 'op-8' : 'c-gray'}`}>{status == 1 ? text2 : text1}</Title>}
                            </Space>
                        </Col>
                        
                        {page ? 
                        <Col span={24} className='text-center'>{open == 'false' ? status == 1 ? <span className='sole-icon b-success'><TickIcon /></span> : <ClockIcon className={`fontSize40 ${status == 0 ? 'c-white' : 'c-gray'}`} /> : status == 1 ? <UploadDoneIcon /> : status == 2 && numb > 2 ? <ClockIcon className='c-gray fontSize40' /> : <PendingIcon />}</Col>
                        :
                        <>
                        {status != 2 && <Col><span className={status ==  1 ? 'sole-icon-small b-success': ''}>{status ==  1 ? <TickIcon />: <ClockIcon className='c-white' />}</span></Col>}
                        </>}
                    </Row>
                </Col>
                {page ? <>
                    {(status != 2 || numb < 3) && open == 'true' &&
                    <Col span={24}>
                        <Title level={3} className={`mb-0 text-center ${status == 2 ? 'c-gray' : ''}`}>{status == 1 ? 'Completed' : `${date ? date : 0} days`}</Title>
                    </Col>}
                </>
                :
                <>
                    {status == 0 && <Col span={24}><Title level={3} className='mb-0'>{date ? date : 0} days</Title></Col>}
                </>}
            </Row>
        </Card>
    )
}