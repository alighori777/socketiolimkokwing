import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { PhoneIcon, MailIcon } from 'Atoms/CustomIcons';
import { getStudentdetails, getAuditStudentdetails, emptyStudentApp, selectProgram, testApi } from '../ducks/actions';
import UpdateSection from 'Molecules/UpdateSection';
import { getComments, emptyComments, getProgramSemesters } from '../../../Application/ducks/actions';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { BreakingPoint } from '../../../../../configs/constantData';
import { baseUrl } from '../../../../../configs/constants';
import Documents from '../../../../molecules/Documents';
import RequestComponent from '../../../components/RequestComponent';
import { useLocation } from 'react-router-dom';
import { allowed } from '../../../../../routing/config/utils';
import AllRoles from '../../../../../routing/config/AllRoles';

export default (props) => {
  const { id, request, document } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const [alldocs, setAllDocs] = useState([]);

  const url = location.pathname.split('/')[2];
  const appData = useSelector((state) => state.students.studentAppData);
  const commentsApi = useSelector((state) => state.global.comments);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const selectProg = useSelector((state) => state.students.selected);

  const callApi = () => {
    if (url === 'auditor') {
      dispatch(getAuditStudentdetails(id));
      // dispatch(testApi(id));
    } else {
      dispatch(getStudentdetails(id));
    }
  };

  useEffect(() => {
    dispatch(getComments('Students', id));
    callApi();
    return () => {
      dispatch(emptyStudentApp());
      dispatch(emptyComments());
    };
  }, []);

  const changeProgram = (e) => {
    if (url !== 'auditor') {
      dispatch(selectProgram(e.target.value));
      dispatch(getProgramSemesters(e.target.value));
    }
  };

  useEffect(() => {
    if (Object.keys(appData).length > 0) {
      if (appData?.success == false) {
        message.error(appData.message);
      } else {
        if (appData?.students_programs.length > 0 && !selectProg) {
          dispatch(
            selectProgram(appData?.students_programs.find((x) => x.program.program_status == 'Active').program.program),
          );
        }
        setAllDocs(appData?.documents);
      }
    }
  }, [appData]);

  const sideData = [
    {
      type: 'image',
      url: appData?.profile_photo ? baseUrl + (appData?.profile_photo).replace(`${baseUrl}`, '') : '',
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: 'Student',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'mainTitle',
      title: appData?.applicant_name,
      subtitle: appData?.applicant_id,
      highlight: true,
    },
    {
      type: 'single',
      title: appData?.nationality,
      highlight: true,
      noLine: true,
    },
    {
      type: 'single',
      title: appData?.current_semester,
    },
    {
      type: 'titleValue',
      title: 'Faculty',
      value:
        appData && appData?.students_programs && appData?.students_programs.length > 0
          ? appData?.students_programs.map((x) => x.program.faculty_name).join(', ')
          : '',
    },
    {
      type: 'radios',
      title: 'Programme',
      value:
        appData && appData?.students_programs && appData?.students_programs.length > 0
          ? appData?.students_programs.map((x) => ({ label: x.program.program_name, value: x.program.program }))
          : '',
      current: selectProg,
      onChange: changeProgram,
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      icon: <PhoneIcon />,
      text: appData?.contact_no,
    },
    {
      icon: <MailIcon />,
      text: appData?.email,
    },
  ];

  const updateComment = () => {
    dispatch(getComments('Students', id));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href={`/${props.section}/students`}>Students</Breadcrumb.Item>
        <Breadcrumb.Item>Student Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Student Details" />
        </Col>
        <Col span={24}>
          <div className="twocol-3070">
            <div className="side-detail">
              {isHDScreen ? (
                <SideDetails data={sideData} type="info" bottom={bottomList} />
              ) : (
                <SideDetailResponsive data={sideData} type="info" bottom={bottomList} />
              )}
            </div>
            <div className="side-form">
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Row gutter={[20, 20]}>
                  {request == true && url !== 'auditor' && url !== 'internaloffice' ? (
                    <Col span={24}>
                      <RequestComponent id={id} type={'student'} />
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <Card bordered={false} className="uni-card">
                      {props.children}
                    </Card>
                  </Col>
                  {document == true ? (
                    <Col span={24}>
                      <Documents
                        docs={alldocs}
                        id={id}
                        updateApi={callApi}
                        doctype={url === 'auditor' ? 'Students Audit' : 'Students'}
                        permit={!allowed([AllRoles.STUDENT.AUDIT], 'write')}
                      />
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <UpdateSection
                      data={commentsApi}
                      code={appData.applicant_id}
                      module={'Students'}
                      updateComment={updateComment}
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
