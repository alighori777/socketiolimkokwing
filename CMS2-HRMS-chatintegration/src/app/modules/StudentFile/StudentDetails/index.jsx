import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb, message, Typography, Descriptions } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { BreakingPoint } from '../../../../configs/constantData';
import { apiMethod, apiresource, baseUrl } from '../../../../configs/constants';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { allowed } from '../../../../routing/config/utils';
import AllRoles from '../../../../routing/config/AllRoles';
import { getStudentdetails, getAuditStudentdetails, emptyStudentApp } from '../../Registry/Students/ducks/actions';
import { Popup } from 'Atoms/Popup';
import axios from '../../../../services/axiosInterceptor';
import { getSignedURL, uniquiFileName } from '../../../../features/utility';
import UploadDocuments from '../../Registry/Students/components/UploadDocuments';
import DocumentLinks from '../DocumentLinks';

const { Title, Text } = Typography;

const documentation = [
  {
    title: 'STUDENT INFORMATION',
    docs: [
      { title: 'Student File', docname: 'Student File' },
      { title: 'Student Profile', docname: 'Student Profile' },
      { title: 'Application Form', docname: 'Application Form' },
      // {title: 'Passport Photo with White Background', docname: 'Passport Photo with White Background'},
      // {title: '6 Passport Size photograph with blue background (3.5cmx5cm)', docname: '6 Passport Size photograph with blue background (3.5cmx5cm)'},
      // {title: 'IC/Passport (Scanned)', docname: 'IC/Passport (Scanned)'},
      { title: 'Offer Letter', docname: 'Offer Letter' },
      { title: 'Acceptance of Offer Letter', docname: 'Acceptance of Offer Letter' },
      { title: 'Scholarship Letter', docname: 'Scholarship Letter' },
      // {title: 'Scholarship Letter from Sponsor',docname: 'Scholarship Letter from Sponsor'},
      { title: 'Tuition Fee Receipt', docname: 'Tuition Fee Receipt' },
      { title: 'Programme Approval Letter (KPT & MQA)', docname: 'Programme Approval Letter (KPT & MQA)' },
      { title: 'Financial Evidence', docname: 'Financial Evidence' },
      // {title: 'Financial Statement (Bank Statement', docname: 'Financial Statement (Bank Statement'},
    ],
  },
  {
    title: 'PASSPORT & STUDENT PASS INFORMATION',
    docs: [
      // {title: '2 Passport Copies including all blank pages', docname: '2 Passport Copies including all blank pages'},
      { title: 'Passport Page with Certified Copy', docname: 'Passport Pages with certified true copy' },
      { title: 'IM14 Form', docname: 'IM14 Form' },
      { title: 'Visa Approval Letter (VAL)', docname: 'Visa Approval Letter (VAL)' },
      { title: 'Personal Bond', docname: 'Personal Bond' },
      { title: 'Visa Sticker Endorsement Receipt', docname: 'Visa Sticker Endorsement Receipt' },
      { title: 'Visa Sticker', docname: 'Visa Sticker' },
      { title: 'IM55 Form', docname: 'IM55 Form' },
      // { title: 'Email Reminder (if any)', docname: 'Email Reminder' },
      // { title: 'Cancellation Documents (if any)', docname: 'Cancellation Documents (if any)' },
      // { title: '- Police Report', docname: 'Police Report', noindex: true },
      // { title: '- JIM Cancellation', docname: 'JIM Cancellation', noindex: true },
      // { title: '- JIM Tracking', docname: 'JIM Tracking', noindex: true },
      // { title: '- Embassy Email', docname: 'Embassy Email', noindex: true },
      // { title: '- Communication Reach', docname: 'Communication Reach', noindex: true },
    ],
  },
  {
    title: 'Cancellation Documents (if any)',
    docs: [
      { title: 'Police Report', docname: 'Police Report' },
      { title: 'JIM Cancellation', docname: 'JIM Cancellation' },
      { title: 'JIM Tracking', docname: 'JIM Tracking' },
      { title: 'Embassy Email', docname: 'Embassy Email' },
      { title: 'Communication Reach', docname: 'Communication Reach' },
    ],
  },
  {
    title: 'ACADEMIC INFORMATION',
    docs: [
      { title: 'Academic Calendar', docname: 'Academic Calendar' },
      { title: 'Attendance Report (Every Semester)', docname: 'Attendance' },
      { title: 'Class Time Table', docname: 'Class Time Table' },
      { title: 'Academic Transcript (Every Semester)', docname: 'Academic Transcript' },
      { title: 'Course Advising Form (Every Semester)', docname: 'Course Advising Form' },
      { title: 'Academic Qualification', docname: 'Academic Qualification' },
      { title: 'Completion Letter', docname: 'Completion Letter' },
      { title: 'Official Academic Transcript', docname: 'Official Academic Transcript' },
      { title: 'Certificate', docname: 'Certificate' },
      { title: 'Academic Appeal (if any)', docname: 'Academic Appeal' },
      { title: 'Deferment Form (if any)', docname: 'Deferment Form' },
      { title: 'Termination Letter (if any)', docname: 'Termination Letter' },
      // {title: 'Student Consent for Progression', docname: 'Student Consent for Progression'},
      // {title: 'Certified copies of High School result (original & translated)', docname: 'Certified copies of High School result (original & translated)'},
      // {title: 'CertifiedCertified true copy of Higher Education result & certificate (original & translated)', docname: 'CertifiedCertified true copy of Higher Education result & certificate (original & translated)'},
      // {title: 'Proof of English Language Proficiency (IELTS/TOEFL)', docname: 'Proof of English Language Proficiency (IELTS/TOEFL)'},
    ],
  },
  {
    title: 'MEDICAL REPORT AND INSURANCE',
    docs: [
      { title: 'Copy of Insurance Policy', docname: 'Copy of Insurance Policy' },
      // {title: 'Copy of Insurance Cover Note/Medical Card', docname: 'Copy of Insurance Cover Note/Medical Card'},
      // {title: 'Medical Check-up', docname: 'Medical Check-up'},
      { title: 'Pre Medical Report', docname: 'Pre Medical Report' },
    ],
  },
  {
    title: 'OTHERS',
    docs: [
      { title: 'Release Letter (if any)', docname: 'Release Letter' },
      { title: 'Orientation Program', docname: 'Orientation Program' },
      {
        title: 'Personal Data Protection Acts (PDPA) - Acceptance',
        docname: 'Personal Data Protection Acts (PDPA) - Acceptance',
      },
      { title: 'Student Manual Book & Refund Policy', docname: 'Student Manual Book & Refund Policy' },
      { title: 'Warning Letter', docname: 'Warning Letter' },
      { title: 'Barred Letter', docname: 'Barred Letter' },
      {
        title: 'Leave Application (Medical certificate/ Emergency and etc)',
        docname: 'Leave Application (Medical certificate/ Emergency and etc)',
      },
      { title: 'Student Counselling Report', docname: 'Student Counselling Report' },
      // {title: 'Affidavit Letter', docname: 'Affidavit Letter'},
      // {title: 'CV', docname: 'CV'},
      // {title: 'Undertaking Letter', docname: 'Undertaking Letter'},
      // {title: 'Portfolio', docname: 'Portfolio'},
      // {title: 'Other related documents', docname: 'Other related documents'},
    ],
  },
];

export default (props) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [alldocs, setAllDocs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  let count = 0;

  const url = location.pathname.split('/')[2];
  const appData = useSelector((state) => state.students.studentAppData);

  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const callApi = () => {
    props.setLoading(true);
    if (url === 'auditor') {
      dispatch(getAuditStudentdetails(id, props.setLoading));
    } else {
      dispatch(getStudentdetails(id, props.setLoading));
    }
  };

  useEffect(() => {
    callApi();
    return () => {
      dispatch(emptyStudentApp());
    };
  }, []);

  useEffect(async () => {
    if (Object.keys(appData).length > 0) {
      if (appData?.success == false) {
        message.error(appData.message);
      } else {
        let temp = [];
        await Promise.all(
          appData?.documents.map(async (item, i) => {
            if (item.document_name == 'Passport Photo with White Background') {
              let yz = '';
              await axios
                .get(
                  `${apiMethod}/registry.api.fetch_files_from_awss3?student_id=${
                    appData.applicant_id
                  }&key=${encodeURIComponent(item.document_name)}&filename=${encodeURIComponent(item.document)}`,
                )
                .then((res) => {
                  yz = res.data.message;
                })
                .catch((err) => {
                  console.log('something went worng');
                });
              if (yz) {
                temp.push({ ...item, s3url: yz });
              }
            } else {
              temp.push(item);
            }
          }),
        );
        setAllDocs(temp);
      }
    }
  }, [appData]);

  const sideData = [
    {
      type: 'image',
      url: alldocs.find((x) => x.document_name == 'Passport Photo with White Background')
        ? alldocs.find((x) => x.document_name == 'Passport Photo with White Background')
          ? alldocs.find((x) => x.document_name == 'Passport Photo with White Background').s3url
          : baseUrl + appData?.documents.find((x) => x.document_name == 'Passport Photo with White Background').document
        : '',
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: appData?.status,
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
      type: 'titleValue',
      title: 'IC / Passport',
      value: appData?.icpassport,
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
      title:
        appData && appData?.students_programs && appData?.students_programs.length > 0
          ? appData?.students_programs.map((x) => x.program.program_name).join(', ')
          : '',
    },
    {
      type: 'titleValue',
      title: 'Intake Date',
      value:
        appData && appData?.students_programs && appData?.students_programs.length > 0
          ? appData?.students_programs.find((x) => x.program.program_status == 'Active')?.program.program_intake_date ||
            appData?.students_programs[0].program.program_intake_date
          : '',
    },
    {
      type: 'titleValue',
      title: 'Expected to Graduate',
      value: '',
      noDivider: true,
    },
  ];

  const onUploadDocs = async (val) => {
    setLoad(true);
    let docArray = [];
    // alldocs.map((x) => {
    //   x.document &&
    //     docArray.push({ item: x.document_name, attached_document: x.document, document_date: x.document_date });
    // });

    let doctype = url === 'auditor' ? 'Students Audit' : 'Students';

    await Promise.all(
      val.documents.map(async (x) => {
        if (x?.document) {
          let modifiedName = uniquiFileName(x?.document?.file?.originFileObj.name);
          let surl = await getSignedURL(modifiedName, x.type.value, x?.document?.file?.originFileObj);
          docArray.push({
            item: x.type.value,
            file_url: surl?.filepath,
            document_date: x.document_date,
          });
        }
      }),
    );

    const body = {
      doctype: doctype,
      student_id: id,
      files: docArray,
    };

    let upurl = `${apiMethod}/registry.api.save_uploaded_documents`;

    try {
      await axios.post(upurl, body);
      setLoad(false);
      message.success('Document Uploaded Successfully');
      setTimeout(() => {
        callApi();
        setVisible(false);
      }, 1000);
    } catch (e) {
      const { response } = e;
      console.log('response', response);
      message.error(response?.data?.status?.message ?? 'Something went wrong');
      setLoad(false);
    }
  };

  const deleteDoc = async (val) => {
    props.setLoading(true);
    let body = {
      student_id: id,
      document_id: val,
    };

    let delurl = `${apiMethod}/registry.api.delete_audited_student_doc`;

    try {
      await axios.put(delurl, body);
      props.setLoading(false);
      message.success('Document Deleted Successfully');
      setTimeout(() => {
        callApi();
      }, 1000);
    } catch (e) {
      const { response } = e;
      console.log('response', response);
      message.error(response?.data?.status?.message ?? 'Something went wrong');
      props.setLoading(false);
    }
  };

  const popup = {
    closable: false,
    visibility: visible,
    content: <UploadDocuments onClose={() => setVisible(false)} onSubmit={onUploadDocs} load={load} />,
    width: 900,
    onCancel: () => setVisible(false),
  };

  const bottomList = [
    {
      title: 'Upload Documents',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item className="cursor-pointer" onClick={() => history.goBack()}>
          Students
        </Breadcrumb.Item>
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
                <SideDetails
                  data={sideData}
                  type="button"
                  bottom={allowed([AllRoles.STUDENT.AUDIT], 'write') ? bottomList : []}
                />
              ) : (
                <SideDetailResponsive
                  data={sideData}
                  type="button"
                  bottom={allowed([AllRoles.STUDENT.AUDIT], 'write') ? bottomList : []}
                />
              )}
            </div>
            <div className="side-form">
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <Card bordered={false} className={`uni-card`}>
                      <Row gutter={[20, 30]}>
                        <Col span={24}>
                          <Title level={4} className={`c-default mb-0`}>
                            Documents
                          </Title>
                        </Col>
                        {documentation.map((x) => {
                          return (
                            <Col span={24}>
                              <Descriptions
                                title={
                                  <Title level={4} className="mb-0">
                                    {x.title}
                                  </Title>
                                }
                                column={1}
                                layout="vertical"
                                bordered
                              >
                                {x.docs.map((y, i) => (
                                  <Descriptions.Item
                                    label={`${y.noindex != true ? `${count + (i + 1)}.` : ''} ${y.title}`}
                                  >
                                    <DocumentLinks
                                      docname={y.docname}
                                      appData={appData}
                                      updateApi={callApi}
                                      alldocs={alldocs}
                                      deleteDoc={deleteDoc}
                                      setLoading={props.setLoading}
                                    />
                                  </Descriptions.Item>
                                ))}
                              </Descriptions>
                              {console.log(
                                '======',
                                (count +=
                                  x.docs.length -
                                  (x.docs.filter((x) => x.noindex == true).length > 0
                                    ? x.docs.filter((x) => x.noindex == true).length
                                    : 0)),
                              )}
                            </Col>
                          );
                        })}
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
