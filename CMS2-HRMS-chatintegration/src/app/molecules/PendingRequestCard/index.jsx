import React from 'react';
import { Card, Space, Typography, List, Avatar } from 'antd';
import FigureChips from 'Atoms/FigureChips';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../configs/constants';

const { Title, Text } = Typography;

export default (props) => {
  const { data, title, count, link, label, status, innerlink, level, spacing, reverse, idKey, nameKey, titleClass, titleIcon, listClass, linkAdd } = props;
  const countStatus = {
    value: count,
    title: <span style={{textTransform:'capitalize'}}>{label + ' Issues'}</span>,
    status: status,
  };

  return (
    <Card bordered={false} className={`uni-card dashboard-card main-card-hover ${status ? '' : 'no-listspace'}`}>
      <Space size={spacing ? spacing : 20} direction="vertical" className="w-100">
        {title && (
          <Title level={level ? level : 5} className="c-default mb-0" style={{textTransform:'capitalize'}}>
            {title}
          </Title>
        )}
        {label && <FigureChips data={countStatus} link={data && data?.length > 0 && `${linkAdd ? `${linkAdd}${link}` : link}`} />}
        <List
          itemLayout="horizontal"
          className={`icon-list ${listClass} ${!label ? 'withoutFigure' : ''}`}
          dataSource={data && data}
          renderItem={(item) => (
            <List.Item key={item[idKey]} className="w-100">
              <Link className="w-100" to={innerlink != '' && `${linkAdd ? `${linkAdd}${innerlink}/${item[idKey]}` : innerlink + item[idKey]}`}>
                <Space size={17} className="w-100">
                  <Avatar size={40} src={(item?.user_image || item?.image) && `${baseUrl}${item?.user_image || item?.image}`} />
                  <Space size={0} direction="vertical">
                    <Text className={reverse ? 'titlename' : 'c-gray'}>{item[nameKey]}</Text>
                    <Text className={`${reverse ? 'c-gray' : 'titlename'} ${titleClass}`}>{item[idKey]}</Text>
                  </Space>
                  {titleIcon && <Avatar shape="square" size={40} icon={titleIcon} />}
                </Space>
              </Link>
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
};
