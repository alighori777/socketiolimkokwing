import React, {useState, useEffect} from 'react';
import { Row, Col, Tabs, Typography, Breadcrumb } from 'antd';
import StudentStepCard from '../../../../atoms/StudentStepCard';
import { studentsStatus } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

export default (props) => {
    const dispatch = useDispatch()
    const callback = (e) => {}
    const pendingList = useSelector(state => state.students.pendingList);
    const [requests, setRequests] = useState([])
    

    useEffect(() => {
        dispatch(studentsStatus())
    }, [])

    useEffect(() => {
        console.log('checking', requests)
    }, [requests]);

    useEffect(() => {
        if(Object.keys(pendingList).length > 0) {
            setRequests(pendingList.pending_student_registration.enrollment_students);
        }
    }, [pendingList]);

    return (
        <>
            <Breadcrumb separator=">" className='mb-1'>
                        <Breadcrumb.Item href="/registry/students">Students</Breadcrumb.Item>
                        <Breadcrumb.Item>Pending Offer Letter Release</Breadcrumb.Item>
                </Breadcrumb>
            <Tabs defaultActiveKey="1" type='card' className='tab-bold' onChange={callback}>
                <TabPane tab="Pending Student Registration" key="1" forceRender={true}>
                    <div className='flexibleRow'>
                        {requests?.map((item, index) => (
                            <div className='requestPanel' key={index}>
                                <StudentStepCard data={item} stage={4} link={`/registry/applications/pending-enrolment/${item.name}`} type='app' />
                            </div>
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="Archives" key="2" forceRender={true}>
                    <div className='flexibleRow'>
                        {requests.map((item, index) => (
                            <div className='requestPanel' key={index}>
                                <StudentStepCard data={item} stage={4} link={`/registry/applications/pending-enrolment/${item.name}`} type='app' />
                            </div>
                        ))}
                    </div>
                </TabPane>
            </Tabs>
        </>
    )   
}