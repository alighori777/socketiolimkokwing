import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Typography, Space, Tag, Card, Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import StatsCard from './components/Stats';
import JobRelatedAssessment from './components/JobRelatedAssessment';
import OtherSkills from './components/OtherSkills';
import { getSingleSkills } from '../../ducks/actions';

const { Title, Text } = Typography;

export default ({ id }) => {
  const dispatch = useDispatch();
  const figures = useSelector((state) => state.employeeProfile.singleSkillsData);

  useEffect(() => {
    updateApi();
  }, []);

  const updateApi = () => {
    dispatch(getSingleSkills(id));
  };

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <StatsCard mainHeading={true} percent={figures?.index_ratio || 0} jobRole={figures?.job_title} />
          </Col>
          {figures?.skills_match && figures?.skills_match.length > 0 && (
            <Col span={24}>
              <Space direction="vertical" size={30} className="w-100">
                <Title level={4} className="mb-0 c-default">
                  Other Job Opportunities
                </Title>
                <Row gutter={[20, 20]}>
                  {figures?.skills_match.map((value, index) => (
                    <>
                      {index < 4 ? (
                        <Fragment key={index}>
                          <Col flex="1 0 150px">
                            <StatsCard percent={parseInt(value?.job_fit)} jobRole={value.job_open} />
                          </Col>
                        </Fragment>
                      ) : null}
                    </>
                  ))}
                </Row>
              </Space>
            </Col>
          )}
        </Row>
      </Col>
      {/* <Col span={24}>
        <JobRelatedAssessment data={figures} updateApi={updateApi} id={id} />
      </Col> */}
      <Col span={24}>
        <OtherSkills data={figures} updateApi={updateApi} id={id} />
      </Col>
    </Row>
  );
};
