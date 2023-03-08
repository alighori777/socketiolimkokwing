import React, { useEffect, Fragment } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { getStepsListData } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import AssessmentCard from '../../../atoms/AssessmentCard';
import Masonry from 'react-masonry-css';

export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.marketing.stepListData);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getStepsListData('Eligibility assessment'));
  }, []);

  const onNotify = (name) => {};

  console.log('data?.rows', data?.rows);

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Eligibility Assessments</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Eligibility Assessments'} />
        </Col>
        <Col span={24}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data &&
              data?.rows?.length > 0 &&
              data?.rows?.map((item, index) => (
                <Fragment key={index}>
                  <StudentStepCard
                    data={item}
                    stage={1}
                    link={`/marketing/applications/eligibility-assessments/${item.name}`}
                    comp={
                      <AssessmentCard
                        status={'pending'}
                        data={item}
                        btnTitle="Notify Department"
                        title="Eligibility Assessments"
                        title2={'Applicant Academic Assessment'}
                        type='card'
                      />
                    }
                    type="app"
                  />
                </Fragment>
              ))}
          </Masonry>
        </Col>
      </Row>
    </>
  );
};
