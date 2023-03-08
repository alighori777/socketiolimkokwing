import React, { Fragment } from 'react';
import { Card, Space, Typography} from 'antd';
import FigureChips from '../../atoms/FigureChips';
import { useHistory } from 'react-router-dom';


const { Title } = Typography;

export default (props) => {

    const history = useHistory();
    const {data} = props;

return (
    <Card bordered={false} className='uni-card'>
        <Space size={20} direction='vertical' className='w-100'>
            {data.icon}
            <Title level={4}>{data.title}</Title>
        
        {data.data.map((item, index) => 
        <Fragment key={index}>
            <FigureChips data={item} link={data.link} />
        </Fragment>)}
        </Space>
    </Card>
)
}