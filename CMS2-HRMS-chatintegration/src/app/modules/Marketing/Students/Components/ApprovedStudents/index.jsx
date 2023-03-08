import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Pagination } from 'antd';
import { getIncompleteDocumentsList } from '../../../ducks/actions';
import Masonry from 'react-masonry-css';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from 'Molecules/HeadingChip';
import TitlewithButton from 'Atoms/TitlewithButton';
import StudentStepCard from 'Atoms/StudentStepCard';

export default (props) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.marketing.incompleteRegistrationsData);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getIncompleteDocumentsList('Approved', page, limit));
  }, []);

  const onPageChange = (pgNo) => {
    console.log('pgNo', pgNo, page);
    setPage(pgNo);
    dispatch(getIncompleteDocumentsList('Approved', pgNo, limit));
  };

  console.log('data', data);

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Approved Students List</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Approved Students List'} />
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
                <React.Fragment key={index}>
                  <StudentStepCard
                    data={item}
                    stage={5}
                    link={`/marketing/applications/approved/${item?.name}`}
                    comp={
                      <TitlewithButton
                        btnTitle="Student Details"
                        title="Approved Students"
                        link={`/marketing/applications/approved/${item?.name}`}
                      />
                    }
                    type="app"
                  />
                </React.Fragment>
              ))}
          </Masonry>
        </Col>
        <Col span={24}>
          <Pagination
            pageSize={limit}
            current={page}
            hideOnSinglePage={true}
            showSizeChanger={false}
            onChange={onPageChange}
            total={data?.count}
          />
        </Col>
      </Row>
    </>
  );
};
