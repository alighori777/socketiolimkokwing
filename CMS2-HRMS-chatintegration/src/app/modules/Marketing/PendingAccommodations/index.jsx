import React, { useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import Masonry from 'react-masonry-css';
import { getStepsListData } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import StatusCardTemp from '../../../atoms/StatusCardTemp';
import CardStepAccordian from '../../../molecules/CardStepAccordian';

export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.marketing.stepListData);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getStepsListData('Pending accomodation'));
  }, []);

  console.log('data', data);

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Pending Accommodations</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Pending Accommodations'} />
        </Col>
        <Col span={24}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {/* {data && data.map((item, index) => (
              <React.Fragment key={index}>
                <StudentStepCard 
                data={item}
                stage={3} 
                fullLink={true}
                link={`/marketing/applications/pending-accommodations/${item.name}`} 
                comp={
                  <StatusCardTemp 
                    title='Arrival Form' 
                    text='Please contact the applicant to fill up the form in the Student Application Portal' 
                    status='pending'
                    data={item.modified}
                    title2='Accommodation Form' 
                    text2='Please contact the applicant to fill up the form in the Student Application Portal' 
                    status2='pending'
                    data2={item.modified}
                  />
                } 
                type='app' 
                />
              </React.Fragment>
            ))} */}
            {data &&
              data?.rows?.length > 0 &&
              data?.rows?.map((item, index) => (
                <React.Fragment key={index}>
                  <StudentStepCard
                    data={item}
                    stage={3}
                    fullLink={true}
                    link={`/marketing/applications/pending-accommodations/${item.name}`}
                    comp={<CardStepAccordian data={item?.steps} />}
                    type="app"
                  />
                </React.Fragment>
              ))}
          </Masonry>
        </Col>
      </Row>
    </>
  );
};
