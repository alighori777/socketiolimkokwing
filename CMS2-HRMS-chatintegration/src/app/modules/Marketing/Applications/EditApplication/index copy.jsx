import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, message, Menu, Breadcrumb, Space, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import { useForm, Controller } from 'react-hook-form';
import { PhoneIcon, MailIcon } from '../../../../atoms/CustomIcons';
import Information from '../AddApplication/Information';
import { getApplicationDetial, getStepsDetailData } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ClockCircleFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { apiMethod, apiresource, baseUrl } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { useHistory, useLocation } from 'react-router-dom';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { useMediaQuery } from 'react-responsive';
import ApplicationStatus from '../../../../molecules/ApplicationStatus';
import AssessmentCard from '../../../../atoms/AssessmentCard';
import NotifyDeartment from '../../../../molecules/NotifyDeartment';
import { Popup } from '../../../../atoms/Popup';
import StatusCardTemp from '../../../../atoms/StatusCardTemp';
import CardStepAccordian from '../../../../molecules/CardStepAccordian';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';

const { Title, Text } = Typography;

export default (props) => {
  const { id } = useParams();
  let location = useLocation();
  const url = location.pathname;
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const {
    control: controlIn,
    errors: errorsIn,
    setValue: setValueIn,
    handleSubmit,
    clearErrors,
    setError,
    getValues: getValuesIn,
  } = useForm();
  const [tags, setTags] = useState([]);
  const appDetalData = useSelector((state) => state.marketing.appDetailData);
  const stepDetailData = useSelector((state) => state.marketing.stepDetailData);
  const i18n = useTranslate();
  const { t } = i18n;
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  let name = url.split('/')[3];
  let disabledField = false;

  const movetoEarly = async () => {
    props.setLoading(true);
    const payload = {
      doc_status: '',
      eligibility_status: '',
      registration_status: '',
      accommodations_status: '',
      enrolment_status: '',
      workflow_state: 'Incomplete document',
      application_eligibility_status: [],
      application_registration_status: [],
      application_accommodation_status: [],
      application_enrolment_status: [],
      eligibility: 0,
      registration_fee: 0,
      offer_letter_release: 0,
      student_offer_letter_acceptance: 0,
      visa_acceptance: 0,
      arrival_form: 0,
      accomodation: 0,
      medical_checkup: 0,
      visa_delivery_to_university: 0,
      visa_approval: 0,
      visa_collection: 0,
      tution_fee: 0,
      module_registration: 0,
    };

    try {
      const url = `${apiresource}/Application/${id}`;
      await axios.put(url, payload);
      props.setLoading(false);
      message.success('Application Successfully Moved To Incomplete');
      setTimeout(() => history.push('/marketing/applications'), 1000);
    } catch (e) {
      const { response } = e;
      props.setLoading(false);
      message.error(response);
    }
  };

  const movetoArchive = async () => {
    props.setLoading(true);
    const payload = {
      status: 'Archive',
    };

    try {
      const url = `${apiresource}/Application/${id}`;
      await axios.put(url, payload);
      props.setLoading(false);
      message.success('Application Successfully Moved To Archive');
      setTimeout(() => history.push('/marketing/applications'), 1000);
    } catch (e) {
      const { response } = e;
      props.setLoading(false);
      message.error(response);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Space size={4}>
          <Button onClick={() => movetoEarly()}>
            <ClockCircleFilled />
            <Text>Move to earlier stage</Text>
          </Button>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space size={4}>
          <Button onClick={() => movetoArchive()}>
            <ClockCircleFilled />
            <Text>Archive application</Text>
          </Button>
        </Space>
      </Menu.Item>
    </Menu>
  );

  const sideData = [
    {
      type: 'image',
      url:
        appDetalData.documents && appDetalData.documents.length > 0
          ? baseUrl + appDetalData.documents[0].attached_document
          : '',
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: 'Application',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'mainTitle',
      title: appDetalData?.applicant_name,
      subtitle: appDetalData?.name,
      highlight: true,
    },
    {
      type: 'single',
      title: appDetalData?.nationality,
      highlight: true,
      noLine: true,
    },
    {
      type: 'titleValue',
      title: 'Counselor',
      value: appDetalData?.counsellor,
    },
    {
      type: 'titleValue',
      title: 'Application Date',
      value: appDetalData?.creation ? moment(appDetalData?.creation).format('Do MMMM YYYY') : '',
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      icon: <PhoneIcon />,
      text: appDetalData?.contact_no,
    },
    {
      icon: <MailIcon />,
      text: appDetalData?.email,
    },
  ];

  useEffect(() => {
    dispatch(getApplicationDetial(id));
    dispatch(getStepsDetailData(id));
  }, []);

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <NotifyDeartment title="Notify Department" x onClose={() => setVisible(false)} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  useEffect(() => {
    if (Object.keys(appDetalData).length > 0) {
      console.log('appDetalData', appDetalData);
      setValueIn('applicant_name', appDetalData.applicant_name);
      setValueIn('applicant_name', appDetalData.applicant_name);
      setValueIn('icpassport', appDetalData.icpassport);
      setValueIn('contact_no', appDetalData.contact_no);
      setValueIn('email', appDetalData.email);
      setValueIn('emergency_contact_name', appDetalData.emergency_contact_name);
      setValueIn('emergency_contact_email', appDetalData.emergency_contact_email);
      setValueIn('emergency_contact_number', appDetalData.emergency_contact_number);
      setValueIn('score', appDetalData.score);
      setValueIn('place_of_birth', appDetalData?.place_of_birth);

      setValueIn('current_address_1', appDetalData?.address[0]?.current_address_1);
      setValueIn('current_city', appDetalData?.address[0]?.current_city);
      setValueIn('current_post_code', appDetalData?.address[0]?.current_post_code);
      setValueIn('permanent_state', appDetalData?.address[0]?.permanent_state);

      setValueIn('current_address_2', appDetalData?.address[1]?.current_address_1);
      setValueIn('current_city2', appDetalData?.address[1]?.current_city);
      setValueIn('current_post_code2', appDetalData?.address[1]?.current_post_code);
      setValueIn('permanent_state2', appDetalData?.address[1]?.permanent_state);

      if (appDetalData?.date_of_birth) {
        setValueIn('date_of_birth', moment(appDetalData?.date_of_birth, 'DD-MM-YYYY'));
      }
      if (appDetalData?.passport_expiry) {
        setValueIn('passport_expiry', moment(appDetalData?.passport_expiry, 'DD-MM-YYYY'));
      }

      if (appDetalData?.english_language_qualification) {
        setValueIn('english_language_qualification', {
          value: appDetalData?.english_language_qualification,
          label: appDetalData?.english_language_qualification,
        });
      }

      if (appDetalData?.type) {
        setValueIn('type', {
          value: appDetalData?.type,
          label: appDetalData?.type,
        });
      }

      if (appDetalData?.third_pref) {
        setValueIn('third_pref', {
          value: appDetalData?.third_pref,
          label: appDetalData?.third_pref,
        });
      }

      if (appDetalData?.second_pref) {
        setValueIn('second_pref', {
          value: appDetalData?.second_pref,
          label: appDetalData?.second_pref,
        });
      }

      if (appDetalData?.first_pref) {
        setValueIn('first_pref', {
          value: appDetalData?.first_pref,
          label: appDetalData?.first_pref,
        });
      }

      if (appDetalData?.race) {
        setValueIn('race', {
          value: appDetalData?.race,
          label: appDetalData?.race,
        });
      }

      if (appDetalData?.nationality) {
        setValueIn('nationality', {
          value: appDetalData?.nationality,
          label: appDetalData?.nationality,
        });
      }

      if (appDetalData?.issuing_country) {
        setValueIn('issuing_country', {
          value: appDetalData?.issuing_country,
          label: appDetalData?.issuing_country,
        });
      }

      if (appDetalData?.gender) {
        setValueIn('gender', {
          value: appDetalData?.gender,
          label: appDetalData?.gender,
        });
      }

      if (appDetalData?.marital_satus) {
        setValueIn('marital_satus', {
          value: appDetalData?.marital_satus,
          label: appDetalData?.marital_satus,
        });
      }

      if (appDetalData?.education) {
        setValueIn('education', appDetalData?.education);
      }

      // if (appDetalData?.address[0]?.current_country) {
      //   setValue('current_country', {
      //     value: appDetalData?.address[0]?.current_country,
      //     label: appDetalData?.address[0]?.current_country,
      //   });
      // }

      // if (appDetalData?.address[1]?.current_country) {
      //   setValue('current_country2', {
      //     value: appDetalData?.address[1]?.current_country,
      //     label: appDetalData?.address[1]?.current_country,
      //   });
      // }
      // tags.length < 1 && setTags([...Array(appDetalData?.education.length).keys()].slice(1));

      if (appDetalData?.documents?.length > 0 && appDetalData?.documents[0]?.attached_document) {
        setValueIn('attached_document_bg', {
          fileList: [
            {
              name: appDetalData?.documents[0]?.attached_document,
            },
          ],
        });
        clearErrors('attached_document_bg');
      }

      if (appDetalData?.documents?.length > 1 && appDetalData?.documents[1]?.attached_document) {
        setValueIn('attached_document_scanned', {
          fileList: [
            {
              name: appDetalData?.documents[1]?.attached_document,
            },
          ],
        });
        clearErrors('attached_document_scanned');
      }

      if (appDetalData?.certificate) {
        setValueIn('certificate', {
          fileList: [
            {
              name: appDetalData?.certificate,
            },
          ],
        });
        clearErrors('certificate');
      }
    }
  }, [appDetalData]);

  const getFile = async (value, appName) => {
    let modifiedName = uniquiFileName(value?.file?.originFileObj.name);
    try {
      let res = await getSingleUpload(modifiedName, 'image', value?.file?.originFileObj, 'Application', appName);
      return res?.file_url;
    } catch (e) {
      return value?.fileList[0]?.name;
    }
  };
  const getEducation = async (value, appName) => {
    const data = await Promise.all(
      value.education.map(async (index) => {
        let file1 = '';
        let file2 = '';
        if (index.academic_certificate.file) {
          file1 = await getFile(index.academic_certificate, appName);
        }
        if (index.academic_transcript.file) {
          file2 = await getFile(index.academic_transcript, appName);
        }
        return {
          academic_certificate: file1,
          academic_transcript: file2,
          country: index?.country?.value,
          education_name: index?.education_name?.value,
        };
      }),
    );
    return data;
  };

  const onFinish = async (value) => {
    props.setLoading(true);
    const appName = appDetalData?.name;

    let certificateIMG = '';
    let AcademicTranscript = '';
    let AcademicCertificate = '';
    let passportbg = '';
    let passportscanned = '';

    if (value.certificate && value.certificate?.file) {
      let modifiedName = uniquiFileName(value.certificate?.file?.originFileObj.name);
      let res = await getSingleUpload(
        modifiedName,
        'image',
        value.certificate?.file?.originFileObj,
        'Application',
        appName,
      );
      certificateIMG = res?.file_url;
    }

    if (value.academic_certificate && value.academic_certificate?.file) {
      let modifiedName = uniquiFileName(value.academic_certificate?.file?.originFileObj.name);
      let res = await getSingleUpload(
        modifiedName,
        'image',
        value.academic_certificate?.file?.originFileObj,
        'Application',
        appName,
      );
      AcademicCertificate = res?.file_url;
    }

    if (value.academic_transcript) {
      let modifiedName = uniquiFileName(value.academic_transcript?.file?.originFileObj.name);
      let res = await getSingleUpload(
        modifiedName,
        'image',
        value.academic_transcript?.file?.originFileObj,
        'Application',
        appName,
      );
      AcademicTranscript = res?.file_url;
    }

    if (value.attached_document_bg && value.attached_document_bg?.file) {
      let modifiedName = uniquiFileName(value.attached_document_bg?.file?.originFileObj.name);
      let res = await getSingleUpload(
        modifiedName,
        'image',
        value.attached_document_bg?.file?.originFileObj,
        'Application',
        appName,
      );
      passportbg = res?.file_url;
    }

    if (value.attached_document_scanned && value.attached_document_scanned?.file) {
      let modifiedName = uniquiFileName(value.attached_document_scanned?.file?.originFileObj.name);
      let res = await getSingleUpload(
        modifiedName,
        'image',
        value.attached_document_scanned?.file?.originFileObj,
        'Application',
        appName,
      );
      passportscanned = res?.file_url;
    }

    const education = await getEducation(value, appName);
    console.log(education, 'This is the education');
    const payLoad = {
      applicant_name: value?.applicant_name.trim(),
      nationality: value?.nationality?.value,
      gender: value?.gender?.value,
      race: value?.race?.value,
      contact_no: value?.contact_no,
      marital_satus: value?.marital_satus?.value,
      email: value?.email,
      icpassport: value?.icpassport,
      documents: [
        {
          item: 'Passport Photo with White Background',
          attached_document: passportbg
            ? passportbg
            : appDetalData?.documents?.length > 0 && appDetalData?.documents[0]?.attached_document,
        },
        {
          item: 'IC/Passport (Scanned)',
          attached_document: passportscanned
            ? passportscanned
            : appDetalData?.documents?.length > 1 && appDetalData?.documents[1]?.attached_document,
        },
      ],
      date_of_birth: value?.date_of_birth,
      passport_expiry: value?.passport_expiry,
      place_of_birth: value?.place_of_birth,
      issuing_country: value?.issuing_country?.value,
      address: [
        {
          current_address: 1,
          current_address_1: value?.current_address_1,
          permanent_state: value?.permanent_state,
          current_post_code: value?.current_post_code,
          current_country: value?.current_country?.value,
          current_city: value?.current_city,
        },
        {
          permanent_address: 1,
          current_address_1: value?.permenent_address ? value?.current_address_1 : value?.current_address_2,
          permanent_state: value?.permenent_address ? value?.permanent_state : value?.permanent_state2,
          current_post_code: value?.permenent_address ? value?.current_post_code : value?.current_post_code2,
          current_country: value?.permenent_address ? value?.current_country?.value : value?.current_country2?.value,
          current_city: value?.permenent_address ? value?.current_city : value?.current_city2,
        },
      ],
      emergency_contact_name: value?.emergency_contact_name,
      emergency_contact_number: value?.emergency_contact_number,
      emergency_contact_email: value?.emergency_contact_email,
      type: value?.type?.value,
      first_pref: value?.first_pref?.value,
      second_pref: value?.second_pref?.value,
      third_pref: value?.third_pref?.value,
      education: education,
      english_language_qualification: value?.english_language_qualification?.value,
      score: value?.score,
      certificate: certificateIMG ? certificateIMG : appDetalData?.certificate,

      //workflow_state: appDetalData?.workflow_state,
      doc_status: 'Approved',
      workflow_state: 'Eligibility assessment',
      religion: '',
      age_joined: '',
      remarks: '',
      find_us: 'Social network',
      intake: '',
    };

    console.log('payLoad', payLoad);

    try {
      const url = `${apiresource}/Application/${id}`;
      await axios.put(url, payLoad);
      props.setLoading(false);
      message.success('Application Successfully Edited');
      setTimeout(() => history.push('/marketing/applications'), 1000);
    } catch (e) {
      const { response } = e;
      props.setLoading(false);
      message.error(response);
    }
  };

  const onNotify = (name) => {
    setVisible(true);
  };

  const props1 = {
    title: 'Incomplete Documents',
    appStage: '1',
    stage: 0,
    type: 'app',
    noTitle: false,
    component: (
      <Text className="card-text">Please complete the application form below to proceed to the next stage.</Text>
    ),
  };
  const props2 = {
    title: 'Eligibility Assessments',
    appStage: '2',
    stage: 1,
    type: 'app',
    noTitle: false,
    component: (
      <AssessmentCard
        status="pending"
        reason="Hello World"
        data={stepDetailData}
        btnTitle="Notify Department"
        title=""
        title2={appDetalData?.status == 'done' ? 'Completed Assessment' : 'Pending Assessment'}
        title3="Elgibility Team"
        action={() => onNotify(appDetalData.name)}
      />
    ),
  };
  const props3 = {
    title: 'Pending Registration & Visa',
    appStage: '3',
    stage: 2,
    type: 'app',
    noTitle: false,
    component: <CardStepAccordian data={stepDetailData} page={true} />,
  };
  const props4 = {
    title: 'Pending Accommodations',
    appStage: '4',
    stage: 3,
    type: 'app',
    noTitle: false,
    component: <CardStepAccordian data={stepDetailData} page={true} />,
  };
  const props5 = {
    title: 'Pending Enrolment',
    appStage: '5',
    stage: 4,
    type: 'app',
    noTitle: false,
    component: <CardStepAccordian data={stepDetailData} page={true} />,
  };
  const props6 = {
    title: 'Eligibility Assessments',
    appStage: '2',
    stage: 1,
    type: 'app',
    noTitle: false,
    component: (
      <>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={12}>
              <Button
                size="large"
                onClick={() => applicationEligible()}
                type="primary"
                htmlType="submit"
                className="w-100 green-btn"
              >
                Eligible
              </Button>
            </Col>
            <Col span={12}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => notEligible()}
                className="w-100 red-btn"
              >
                Not Eligible
              </Button>
            </Col>
          </Row>
        </Col>
      </>
    ),
  };

  const checkCase = () => {
    switch (name) {
      case 'incomplete-documents':
        return props1;
      case 'eligibility-assessments':
        return props2;
      case 'pending-registration-visa':
        return props3;
      case 'pending-accommodations':
        return props4;
      case 'pending-enrolment':
        return props5;
      case 'eligibility-assessments-application':
        return props6;
    }
  };

  const checkDisable = () => {
    switch (name) {
      case 'incomplete-documents':
        return (disabledField = false);
      case 'eligibility-assessments':
        return (disabledField = true);
      case 'pending-registration-visa':
        return (disabledField = true);
      case 'pending-accommodations':
        return (disabledField = true);
      case 'pending-enrolment':
        return (disabledField = true);
      case 'eligibility-assessments-application':
        return (disabledField = true);
    }
  };

  const applicationEligible = async () => {
    props.setLoading(true);
    const payload = {
      eligibility_status: 'Approved',
      workflow_state: 'Incomplete registration visa',
    };
    try {
      const url = `${apiresource}/Application/${id}`;
      await axios.put(url, payload);
      props.setLoading(false);
      message.success('Application Successfully Moved to Next Stage');
      setTimeout(() => history.push('/eligibility/overview'), 1000);
    } catch (e) {
      const { response } = e;
      props.setLoading(false);
      message.error(response);
    }
  };

  const notEligible = async () => {
    props.setLoading(true);
    const payload = {
      eligibility_status: 'Rejected',
      workflow_state: 'Eligibility assessment',
      status: 'Archive',
      application_eligibility_status: [
        {
          eligible_status: 'Not Eligible',
          remarks: 'student Not Eligibile',
        },
      ],
    };
    try {
      const url = `${apiresource}/Application/${id}`;
      await axios.put(url, payload);
      props.setLoading(false);
      message.success('Application Successfully Not Eligible');
      setTimeout(() => history.push('/eligibility/overview'), 1000);
    } catch (e) {
      const { response } = e;
      props.setLoading(false);
      message.error(response);
    }
  };

  const onError = (errors, e) => {
    if (appDetalData?.documents?.length > 0 && appDetalData?.documents[0]?.attached_document) {
      clearErrors('attached_document_bg');
    }

    if (appDetalData?.documents?.length > 1 && appDetalData?.documents[1]?.attached_document) {
      clearErrors('attached_document_scanned');
    }

    if (Object.keys(errors).length > 0) {
      message.error('There are some Validation Errors');
    }
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item href={`/marketing/applications/${name}`} className="SentanceCase">
          {name.replace('-', ' ')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>Application Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Application Details" />
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
                  <Col span={24}>
                    <ApplicationStatus {...checkCase()} menu={menu} />
                  </Col>
                  <Col span={24}>
                    <Form onFinish={handleSubmit(onFinish, onError)} layout="vertical" scrollToFirstError={true}>
                      <Information
                        control={controlIn}
                        errors={errorsIn}
                        education={appDetalData?.education}
                        tags={tags}
                        setTags={setTags}
                        mode="edit"
                        t={t}
                        data={appDetalData}
                        disabled={checkDisable()}
                        clearErrors={clearErrors}
                        setError={setError}
                        setValue={setValueIn}
                        Controller={Controller}
                        getValues={getValuesIn}
                      />
                    </Form>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
      {/* {appDetalData?.company && appDetalData?.company != company ? <HeadingChip title="Wrong Application" /> : (
        
      )} */}
    </>
  );
};
