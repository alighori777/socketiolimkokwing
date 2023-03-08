import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import StaffDetails from '../../components/StaffDetails';
import Employment from './components/Employment';
import Management from './components/Managment';
import { emptyStaffDetails, getAdvancementdetails } from '../Advancement/dcuks/actions';
import { getEmployeeProfile, getEmployeeDocuments } from './ducks/actions';
import Personal from './components/Personal';
import { getRequestDetails, emptyRequestDetails } from '../Requests/ducks/actions';
import Request from '../Requests/components/Request';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const employeeProfileData = useSelector((state) => state.employeeProfile.employeeProfileData);
  const employeeDocuments = useSelector((state) => state.employeeProfile.employeeDocuments);
  const dataRequest = useSelector((state) => state.hrmsrequests.requestData);
  const [requests, setRequests] = useState({});

  useEffect(() => {
    dispatch(getEmployeeProfile(id));
    dispatch(getAdvancementdetails(id));
    dispatch(getRequestDetails(id, id));
    dispatch(getEmployeeDocuments(id));
    return () => {
      dispatch(emptyStaffDetails());
      dispatch(emptyRequestDetails());
    };
  }, []);

  useEffect(() => {
    if (dataRequest.length > 0) {
      setRequests({
        pending: dataRequest.filter((value) => value.status == 'Pending' && value.requester_id != id),
        yourrequests: dataRequest.filter((value) => value.status == 'Pending' && value.requester_id == id),
        archive: dataRequest.filter((value) => value.status != 'Pending'),
      });
    } else {
      setRequests({});
    }
  }, [dataRequest]);

  console.log('requests', requests);

  const updateReqApi = () => {
    dispatch(getRequestDetails(id, id));
  };

  return (
    <StaffDetails
      id={id}
      section="Employee"
      title={'Profile'}
      employeeDocuments={employeeDocuments}
      myProfile={false}
      doctype={true}
    >
      <Row gutter={[20, 20]}>
        {dataRequest?.length > 0 && (
          <Col span={24}>
            <Card bordered={false} className="uni-card">
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Title level={4} className="mb-0 c-default">
                    Requests
                  </Title>
                </Col>
                <Col span={24}>
                  <Request
                    id={id}
                    updateReqApi={updateReqApi}
                    data={requests}
                    selectedTab={'yourrequests'}
                    selectedPanel={''}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        )}
        <Col span={24}>
          <Card bordered={false} className="uni-card h-auto w-100">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
                  <TabPane tab="Employment" key="1">
                    <Employment id={id} data={employeeProfileData} />
                  </TabPane>
                  <TabPane tab="Personal" key="2">
                    <Personal data={employeeProfileData} />
                  </TabPane>
                  <TabPane tab="Fit Index" key="3">
                    <Management id={id} />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </StaffDetails>
  );
};
