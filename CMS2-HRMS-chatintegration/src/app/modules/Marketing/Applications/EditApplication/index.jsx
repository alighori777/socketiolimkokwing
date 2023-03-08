import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Form, message, Menu, Breadcrumb, Space, Button } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import HeadingChip from 'Molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import { PhoneIcon, MailIcon } from 'Atoms/CustomIcons';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { ClockCircleFilled } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import moment from 'moment';
import ApplicationStatus from 'Molecules/ApplicationStatus';
import AssessmentCard from 'Atoms/AssessmentCard';
import NotifyDeartment from 'Molecules/NotifyDeartment';
import { Popup, PopupSuccess } from 'Atoms/Popup';
import CardStepAccordian from 'Molecules/CardStepAccordian';
import { uniquiFileName, getSingleUpload, getFileName } from '../../../../../features/utility';
import ApplicationForm from '../AddApplication/ApplicationForm';
import {
  getApplicationDetial,
  getStepsDetailData,
  emptyApp,
  marketingBool,
  getDownloadDocumentsList,
} from '../../ducks/actions';
import {
  getCountryDrop,
  getApplicationTypeDrop,
  getGenderDrop,
  getEnglishQualificationDrop,
  getProgNameDrop,
  getCouncelor,
  getSources,
  getAgentUser,
} from '../ducks/actions';
import { getRace, getComments, emptyComments } from '../../../Application/ducks/actions';
import { addStudentApp, createStudent, generateOfferLetter, offerLetterRelease } from '../ducks/services';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../../../../../configs/constants';
import PendingRegistrationsVisaDetails from '../../PendingRegistrationsVisaDetails';
import PendingEnrollmentDetails from '../../PendingEnrollmentDetails';
import Documents from 'Molecules/Documents';
import UpdateSection from 'Molecules/UpdateSection';
import { getCurrentYearIntakes } from '../../../AQA/Incentives/ducks/actions';

const { Title, Text } = Typography;

export default (props) => {
  const { id } = useParams();
  let location = useLocation();
  const url = location.pathname;
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [agentUser, setAgentUser] = useState(false);
  const [firstIncent, setFirstIncent] = useState([]);
  const [secondIncent, setSecondIncent] = useState([]);
  const [thirdIncent, setThirdIncent] = useState([]);
  const { control, errors, setValue, setError, clearErrors, handleSubmit, getValues, watch } = useForm();
  const appDetalData = useSelector((state) => state.marketing.appDetailData);
  const stepDetailData = useSelector((state) => state.marketing.stepDetailData);
  const documentDownloadList = useSelector((state) => state.marketing.documentDownloadList);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  let name = url.split('/')[3];
  const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];
  const commentsApi = useSelector((state) => state.global.comments);
  const sourcesData = useSelector((state) => state.applicationForm.sources);
  const agentUsersList = useSelector((state) => state.applicationForm.agentUsers);

  const updateComment = () => {
    dispatch(getComments('Application', id));
  };

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

    addStudentApp(payload, id)
      .then((x) => {
        props.setLoading(false);
        message.success('Application Successfully Moved To Incomplete');
        setTimeout(() => history.push('/marketing/applications'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        message.error(response);
      });
  };

  const movetoArchive = () => {
    props.setLoading(true);
    const payload = {
      status: 'Archive',
    };

    addStudentApp(payload, id)
      .then((x) => {
        props.setLoading(false);
        message.success('Application Successfully Moved To Archive');
        setTimeout(() => history.push('/marketing/applications'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        message.error(response);
      });
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
      value: appDetalData?.counsellor_name,
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
    dispatch(getComments('Application', id));
    dispatch(getApplicationDetial(id));
    dispatch(getStepsDetailData(id));
    dispatch(marketingBool('Marketing'));
    dispatch(getDownloadDocumentsList(id));
    return () => {
      dispatch(emptyApp());
      dispatch(emptyComments());
    };
  }, []);

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <NotifyDeartment title="Notify Department" x onClose={() => setVisible(false)} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const popupOffer = {
    closable: false,
    className: 'black-modal',
    title: 'Offer Letter Released',
    content: 'The offer letter for Rebecca Holmes has successfully been released.',
    width: 536,
  };

  useEffect(() => {
    dispatch(getCountryDrop());
    dispatch(getRace());
    dispatch(getApplicationTypeDrop());
    dispatch(getGenderDrop());
    dispatch(getEnglishQualificationDrop());
    dispatch(getProgNameDrop());
    dispatch(getCouncelor());
    dispatch(getSources());
    dispatch(getAgentUser());
    dispatch(getCurrentYearIntakes());
  }, []);

  useEffect(() => {
    if (Object.keys(appDetalData).length > 0) {
      setValue('applicant_name', appDetalData?.applicant_name);
      setValue('icpassport', appDetalData?.icpassport);
      setValue('contact_no', appDetalData?.contact_no);
      setValue('email', appDetalData?.email);
      setValue('emergency_contact_name', appDetalData?.emergency_contact_name);
      setValue('emergency_contact_email', appDetalData?.emergency_contact_email);
      setValue('emergency_contact_number', appDetalData?.emergency_contact_number);
      setValue('score', appDetalData?.score);
      setValue('place_of_birth', appDetalData?.place_of_birth);

      setValue('current_address', appDetalData?.address[0]?.current_address_1);
      setValue('current_city', appDetalData?.address[0]?.current_city);
      setValue('current_post_code', appDetalData?.address[0]?.current_post_code);
      setValue('current_state', appDetalData?.address[0]?.permanent_state);

      if (appDetalData?.address[0]?.current_country) {
        setValue(
          'current_country',
          appDetalData?.address[0]?.current_country
            ? {
                value: appDetalData?.address[0]?.current_country,
                label: appDetalData?.address[0]?.current_country,
              }
            : '',
        );
      }

      if (appDetalData?.address[0]?.own_by) {
        setValue(
          'current_country',
          appDetalData?.address[0]?.own_by
            ? {
                value: appDetalData?.address[0]?.own_by,
                label: appDetalData?.address[0]?.own_by,
              }
            : '',
        );
      }

      setValue('permanent_address', appDetalData?.address[1]?.current_address_1);
      setValue('permanent_city', appDetalData?.address[1]?.current_city);
      setValue('permanent_post_code', appDetalData?.address[1]?.current_post_code);
      setValue('permanent_state', appDetalData?.address[1]?.permanent_state);

      if (appDetalData?.address[1]?.current_country) {
        setValue(
          'permanent_country',
          appDetalData?.address[1]?.current_country
            ? {
                value: appDetalData?.address[1]?.current_country,
                label: appDetalData?.address[1]?.current_country,
              }
            : '',
        );
      }

      if (appDetalData?.date_of_birth) {
        setValue('date_of_birth', moment(appDetalData?.date_of_birth, 'YYYY-MM-DD'));
      }
      if (appDetalData?.passport_expiry) {
        setValue('passport_expiry', moment(appDetalData?.passport_expiry, 'YYYY-MM-DD'));
      }

      if (appDetalData?.english_language_qualification) {
        setValue(
          'english_language_qualification',
          appDetalData?.english_language_qualification
            ? {
                value: appDetalData?.english_language_qualification,
                label: appDetalData?.english_language_qualification,
              }
            : '',
        );
      }

      if (appDetalData?.type) {
        setValue(
          'type',
          appDetalData?.type
            ? {
                value: appDetalData?.type,
                label: appDetalData?.type,
              }
            : '',
        );
        if (appDetalData?.type == 'Existing Student') {
          setValue('current_studentid', appDetalData?.current_studentid);
        }
        if (appDetalData?.type == 'Transfer Student') {
          setValue(
            'enrolled_semester',
            appDetalData?.enrolled_semester
              ? { label: appDetalData?.enrolled_semester, value: appDetalData?.enrolled_semester }
              : '',
          );

          if (appDetalData?.application_module_exemption_proof) {
            setValue(
              'application_module_exemption_proof',
              appDetalData?.application_module_exemption_proof
                ? {
                    fileList: [
                      {
                        uid: '-1',
                        name: getFileName(appDetalData?.application_module_exemption_proof),
                        status: 'done',
                        url: `${baseUrl}${appDetalData?.application_module_exemption_proof}`,
                      },
                    ],
                  }
                : '',
            );
          }
        }
      }

      if (appDetalData?.application_intake) {
        setValue(
          'application_intake',
          appDetalData?.application_intake
            ? {
                value: appDetalData?.application_intake,
                label: appDetalData?.intake_name,
              }
            : '',
        );
      }

      if (appDetalData?.application_source) {
        setValue(
          'application_source',
          appDetalData?.application_source
            ? {
                value: appDetalData?.application_source,
                label: appDetalData?.source_name,
              }
            : '',
        );
      }

      if (appDetalData?.third_pref) {
        setValue(
          'third_pref',
          appDetalData?.third_pref
            ? {
                value: appDetalData?.third_pref,
                label: appDetalData?.third_pref_name,
              }
            : '',
        );
      }

      if (appDetalData?.second_pref) {
        setValue(
          'second_pref',
          appDetalData?.second_pref
            ? {
                value: appDetalData?.second_pref,
                label: appDetalData?.second_pref_name,
              }
            : '',
        );
      }

      if (appDetalData?.first_pref) {
        setValue(
          'first_pref',
          appDetalData?.first_pref
            ? {
                value: appDetalData?.first_pref,
                label: appDetalData?.first_pref_name,
              }
            : '',
        );
      }

      if (appDetalData?.race) {
        setValue(
          'race',
          appDetalData?.race
            ? {
                value: appDetalData?.race,
                label: appDetalData?.race_name,
              }
            : '',
        );
      }

      if (appDetalData?.nationality) {
        setValue(
          'nationality',
          appDetalData?.nationality
            ? {
                value: appDetalData?.nationality,
                label: appDetalData?.nationality,
              }
            : '',
        );
      }

      if (appDetalData?.issuing_country) {
        setValue(
          'issuing_country',
          appDetalData?.issuing_country
            ? {
                value: appDetalData?.issuing_country,
                label: appDetalData?.issuing_country,
              }
            : '',
        );
      }

      if (appDetalData?.gender) {
        setValue(
          'gender',
          appDetalData?.gender
            ? {
                value: appDetalData?.gender,
                label: appDetalData?.gender,
              }
            : '',
        );
      }

      if (appDetalData?.counsellor) {
        setValue('counsellor', {
          value: appDetalData?.counsellor,
          label: appDetalData?.counsellor_name,
        });
      } else {
        setValue('counsellor', {
          value: user?.name,
          label: user?.full_name,
        });
      }

      if (appDetalData?.marital_satus) {
        setValue(
          'marital_satus',
          appDetalData?.marital_satus
            ? {
                value: appDetalData?.marital_satus,
                label: appDetalData?.marital_satus,
              }
            : '',
        );
      }

      if (appDetalData?.issuing_country) {
        setValue(
          'issuing_country',
          appDetalData?.issuing_country
            ? {
                value: appDetalData?.issuing_country,
                label: appDetalData?.issuing_country,
              }
            : '',
        );
      }

      if (appDetalData?.first_pref_incentive && appDetalData?.first_pref_incentive.length > 0) {
        let temp = [];
        appDetalData.first_pref_incentive.map((x) => {
          temp.push({
            incentive_name: x.incentive_name,
            name: x.incentive,
            nationality: x.nationality,
            tution_fee_covered: parseInt(x.incentive_discount),
          });
        });
        setFirstIncent(temp);
      }
      if (appDetalData?.second_pref_incentive && appDetalData?.second_pref_incentive.length > 0) {
        let temp = [];
        appDetalData.second_pref_incentive.map((x) => {
          temp.push({
            incentive_name: x.incentive_name,
            name: x.incentive,
            nationality: x.nationality,
            tution_fee_covered: parseInt(x.incentive_discount),
          });
        });
        setSecondIncent(temp);
      }

      if (appDetalData?.third_pref_incentive && appDetalData?.third_pref_incentive.length > 0) {
        let temp = [];
        appDetalData.third_pref_incentive.map((x) => {
          temp.push({
            incentive_name: x.incentive_name,
            name: x.incentive,
            nationality: x.nationality,
            tution_fee_covered: parseInt(x.incentive_discount),
          });
        });
        setThirdIncent(temp);
      }

      if (appDetalData?.education && appDetalData?.education.length > 0) {
        setValue('education', appDetalData?.education);
      }

      if (appDetalData?.documents?.length > 0) {
        if (appDetalData?.documents[0]?.attached_document) {
          setValue(
            'attached_document_bg',
            appDetalData?.documents[0]?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(appDetalData?.documents[0]?.attached_document),
                      status: 'done',
                      url: `${baseUrl}${appDetalData?.documents[0]?.attached_document}`,
                    },
                  ],
                }
              : '',
          );
        }
        if (appDetalData?.documents[1]?.attached_document) {
          setValue(
            'attached_document_scanned',
            appDetalData?.documents[1]?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(appDetalData?.documents[1]?.attached_document),
                      status: 'done',
                      url: `${baseUrl}${appDetalData?.documents[1]?.attached_document}`,
                    },
                  ],
                }
              : '',
          );
        }
        if (appDetalData?.documents.find((x) => x.item == 'CV')) {
          setValue(
            'resume',
            appDetalData?.documents.find((x) => x.item == 'CV')?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(appDetalData?.documents.find((x) => x.item == 'CV')?.attached_document),
                      status: 'done',
                      url: `${baseUrl}${appDetalData?.documents.find((x) => x.item == 'CV')?.attached_document}`,
                    },
                  ],
                }
              : '',
          );
        }
        if (appDetalData?.documents.find((x) => x.item == 'Portfolio')) {
          setValue(
            'portfolio',
            appDetalData?.documents.find((x) => x.item == 'Portfolio')?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(appDetalData?.documents.find((x) => x.item == 'Portfolio')?.attached_document),
                      status: 'done',
                      url: `${baseUrl}${appDetalData?.documents.find((x) => x.item == 'Portfolio')?.attached_document}`,
                    },
                  ],
                }
              : '',
          );
        }
      }

      if (appDetalData?.certificate) {
        setValue(
          'certificate',
          appDetalData?.certificate
            ? {
                fileList: [
                  {
                    uid: '-1',
                    name: getFileName(appDetalData?.certificate),
                    status: 'done',
                    url: `${baseUrl}${appDetalData?.certificate}`,
                  },
                ],
              }
            : '',
        );
      }
    }
  }, [appDetalData]);

  useEffect(() => {
    if (Object.keys(appDetalData).length > 0 && agentUsersList?.length > 0) {
      if (appDetalData?.source_application == 'Agent Portal' || appDetalData?.source_name == 'Agent') {
        const agent = sourcesData?.find((x) => x?.source_name == 'Agent');
        const agentUser = agentUsersList?.find((x) => x?.name == appDetalData?.agent_id);
        console.log('agentUser', agentUser, appDetalData?.agent_id);
        setAgentUser(true);
        setValue('application_source', {
          value: agent?.name,
          label: agent?.source_name,
        });

        setTimeout(() => {
          setValue('agent_user', {
            label: agentUser?.first_name + ' ' + (agentUser?.last_name ? agentUser?.last_name : ''),
            value: agentUser?.name,
          });
        }, 1000);
      }
    }
  }, [sourcesData, agentUsersList, appDetalData]);

  const onFinish = async (val) => {
    props.setLoading(true);

    let appName = id;
    let certificate = '';
    let passportbg = '';
    let resumecv = '';
    let portfolio = '';
    let passportscanned = '';
    let educate = [];

    let noexempt = [];
    let exempt = [];
    let modtranscript = '';

    if (val?.type?.value == 'Transfer Student' && val?.first_pref) {
      val.modules.map((x) => {
        if (x.selected[0]) {
          exempt.push({
            status: 'Active', // not required
            student_module_status: 'Active', // not required
            module_current_status: 'Regular',
            module: x.module,
            module_name: x.module_name,
            module_code: x.module_code, // not required
            semester_source_period: x.period, // not required
            semester_source_name: x.semester, // not required
            semester_source: x?.structure,
            term: val?.application_intake ? val?.application_intake.value : '', // not required
            period: x.fromsource ? x.fromsource.period : '', // not required
            structure_name: x.fromsource ? x.fromsource.label : '',
            overall_grade: x?.overall_grade,
            grade: x?.grade,
            earned_point: x?.earned_point,
            total_grade_point: x.total_grade_point,
            student_total_point: x.student_total_point,
            grading_system_description: x.grading_system_description,
          });
        } else {
          noexempt.push({
            status: 'Active', // not required
            student_module_status: 'Active', // not required
            module_current_status: 'Regular',
            module_code: x.module_code, // not required
            module_name: x.module_name,
            module: x.module,
            semester_source_period: x.period, // not required
            semester_source_name: x.semester, // not required
            semester_source: x.structure,
            term: val?.application_intake ? val?.application_intake.value : '', // not required
            period: x.fromsource ? x.fromsource.period : '',
            semester: x.fromsource ? x.fromsource.label : '',
          });
        }
      });
    }

    if (val?.application_module_exemption_proof) {
      if (val.application_module_exemption_proof.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.application_module_exemption_proof?.file?.originFileObj.name);
        let res = await getSingleUpload(
          modifiedName,
          'image',
          val.application_module_exemption_proof?.file?.originFileObj,
          'Application',
          appName,
        );
        modtranscript = res?.file_url;
      } else {
        modtranscript = val.application_module_exemption_proof.fileList[0].url;
      }
    }

    if (val.attached_document_bg) {
      if (val.attached_document_bg.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.attached_document_bg?.file?.originFileObj.name);
        let res = await getSingleUpload(
          modifiedName,
          'image',
          val.attached_document_bg?.file?.originFileObj,
          'Application',
          appName,
        );
        passportbg = res?.file_url;
      } else {
        passportbg = val.attached_document_bg.fileList[0].url;
      }
    }

    if (val.attached_document_scanned) {
      if (val.attached_document_scanned.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.attached_document_scanned?.file?.originFileObj.name);
        let res = await getSingleUpload(
          modifiedName,
          'image',
          val.attached_document_scanned?.file?.originFileObj,
          'Application',
          appName,
        );
        passportscanned = res?.file_url;
      } else {
        passportscanned = val.attached_document_scanned.fileList[0].url;
      }
    }

    if (val.resume) {
      if (val.resume.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.resume?.file?.originFileObj.name);
        let res = await getSingleUpload(modifiedName, 'image', val.resume?.file?.originFileObj, 'Application', appName);
        resumecv = res?.file_url;
      } else {
        resumecv = val.resume.fileList[0].url;
      }
    }

    if (val.portfolio) {
      if (val.portfolio.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.portfolio?.file?.originFileObj.name);
        let res = await getSingleUpload(
          modifiedName,
          'image',
          val.portfolio?.file?.originFileObj,
          'Application',
          appName,
        );
        portfolio = res?.file_url;
      } else {
        portfolio = val.portfolio.fileList[0].url;
      }
    }

    if (val.certificate) {
      if (val.certificate.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.certificate?.file?.originFileObj.name);
        let res = await getSingleUpload(
          modifiedName,
          'image',
          val.certificate?.file?.originFileObj,
          'Application',
          appName,
        );
        certificate = res?.file_url;
      } else {
        certificate = val.certificate.fileList[0].url;
      }
    }

    if (val.education && val.education.length > 0) {
      await Promise.all(
        val.education.map(async (x) => {
          let certificateUrl = '';
          let transcriptUrl = '';
          if (x?.academic_certificate) {
            if (x.academic_certificate.fileList[0].uid != '-1') {
              let modifiedName = uniquiFileName(x?.academic_certificate?.file?.originFileObj.name);
              let res = await getSingleUpload(
                modifiedName,
                'image',
                x?.academic_certificate?.file?.originFileObj,
                'Application',
                appName,
              );
              certificateUrl = res?.file_url;
            } else {
              certificateUrl = x.academic_certificate.fileList[0].url;
            }
          }
          if (x.academic_transcript) {
            if (x.academic_transcript.fileList[0].uid != '-1') {
              let modifiedName = uniquiFileName(x.academic_transcript?.file?.originFileObj.name);
              let res = await getSingleUpload(
                modifiedName,
                'image',
                x.academic_transcript?.file?.originFileObj,
                'Application',
                appName,
              );
              transcriptUrl = res?.file_url;
            } else {
              transcriptUrl = x.academic_transcript.fileList[0].url;
            }
          }
          if (x.education_name || x.country || certificateUrl || transcriptUrl) {
            educate.push({
              education_name: x.education_name ? x.education_name?.value : '',
              country: x.country ? x.country?.value : '',
              academic_certificate: certificateUrl ? certificateUrl.replace(`${baseUrl}`, '') : '',
              academic_transcript: transcriptUrl ? transcriptUrl.replace(`${baseUrl}`, '') : '',
            });
          }
        }),
      );
    }

    let firstI = [];
    let secondI = [];
    let thirdI = [];

    firstIncent.length > 0 &&
      firstIncent.map((x) => {
        firstI.push({ incentive: x.name });
      });
    secondIncent.length > 0 &&
      secondIncent.map((x) => {
        secondI.push({ incentive: x.name });
      });
    thirdIncent.length > 0 &&
      thirdIncent.map((x) => {
        thirdI.push({ incentive: x.name });
      });

    const payLoad = {
      doc_status: 'Approved',
      workflow_state: 'Eligibility assessment',
      type: val?.type?.value,
      first_pref_incentive: firstI,
      second_pref_incentive: secondI,
      third_pref_incentive: thirdI,
      applicant_name: val?.applicant_name.trim(),
      application_source: val?.application_source.value,
      source_name: val?.application_source.label,
      icpassport: val?.icpassport,
      contact_no: val?.contact_no,
      email: val?.email,
      owner: val?.agent_user ? val?.agent_user?.value : '',
      agent_id: val?.agent_user ? val?.agent_user?.value : '',
      date_of_birth: val?.date_of_birth ? moment(val?.date_of_birth).format('YYYY-MM-DD') : '',
      passport_expiry: val?.passport_expiry ? moment(val?.passport_expiry).format('YYYY-MM-DD') : '',
      issuing_country: val?.issuing_country ? val?.issuing_country.value : '',
      emergency_contact_name: val?.emergency_contact_name,
      emergency_contact_email: val?.emergency_contact_email,
      emergency_contact_number: val?.emergency_contact_number,
      english_language_qualification: val?.english_language_qualification
        ? val?.english_language_qualification?.value
        : '',
      score: val?.score,
      certificate: certificate ? certificate.replace(`${baseUrl}`, '') : '',
      race: val?.race ? val?.race?.value : '',
      marital_satus: val?.marital_satus ? val?.marital_satus?.value : '',
      gender: val?.gender ? val?.gender?.value : '',
      religion: '',
      age_joined: '',
      nationality: val?.nationality ? val?.nationality?.value : '',
      place_of_birth: val?.place_of_birth,
      first_pref: val?.first_pref ? val?.first_pref?.value : '',
      second_pref: val?.second_pref ? val?.second_pref?.value : '',
      third_pref: val?.third_pref ? val?.third_pref?.value : '',
      application_intake: val?.application_intake ? val?.application_intake.value : '',

      current_studentid: val?.current_studentid,
      enrolled_semester: val?.enrolled_semester ? val?.enrolled_semester.label : '',
      application_semesters_modules: noexempt,
      application_module_exemption: exempt,
      application_module_exemption_proof: modtranscript,

      documents: [
        {
          item: 'Passport Photo with White Background',
          attached_document: passportbg ? passportbg.replace(`${baseUrl}`, '') : '',
        },
        {
          item: 'IC/Passport (Scanned)',
          attached_document: passportscanned ? passportscanned.replace(`${baseUrl}`, '') : '',
        },
        {
          item: 'CV',
          attached_document: resumecv ? resumecv.replace(`${baseUrl}`, '') : '',
        },
        {
          item: 'Portfolio',
          attached_document: portfolio ? portfolio.replace(`${baseUrl}`, '') : '',
        },
      ],

      address: [
        {
          current_address: 1,
          current_address_1: val?.current_address,
          permanent_state: val?.current_state,
          current_post_code: val?.current_post_code,
          current_country: val?.current_country ? val?.current_country?.value : '',
          current_city: val?.current_city,
        },
        {
          permanent_address: 1,
          current_address_1: val?.permanent_address,
          permanent_state: val?.permanent_state,
          current_post_code: val?.permanent_post_code,
          current_country: val?.permanent_country ? val?.permanent_country?.value : '',
          current_city: val?.permanent_city,
        },
      ],
      counsellor: val?.counsellor ? val?.counsellor?.value : '',
      education: educate,
    };

    addStudentApp(payLoad, appName)
      .then((resp2) => {
        message.success('Application Successfully Updated');
        props.setLoading(false);
        setTimeout(() => history.push('/marketing/applications'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const onNotify = (name) => {
    setVisible(true);
  };

  const movetoEnrollment = () => {
    props.setLoading(true);
    const payload = {
      accommodations_status: 'Approved',
      workflow_state: 'Pending enrollment',
    };
    addStudentApp(payload, id)
      .then((x) => {
        props.setLoading(false);
        message.success('Application Successfully Moved to Next Stage');
        setTimeout(() => history.push('/marketing/applications'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  // const finishedSteps = () => {
  //   props.setLoading(true);
  //   const payload = {
  //     enrolment_status: 'Approved',
  //     workflow_state: 'Approved',
  //   };
  //   addStudentApp(payload, id)
  //     .then((x) => {
  //       createStudent(id).then((y) => {
  //         props.setLoading(false);
  //         message.success('Application Successfully Created');
  //         setTimeout(() => history.push('/registry/students'), 1000);
  //       });
  //     })
  //     .catch((e) => {
  //       const { response } = e;
  //       props.setLoading(false);
  //       console.log('error', response);
  //       message.error('Something went wrong');
  //     });
  // };

  const onEligibile = (status) => {
    props.setLoading(true);
    let payload = {};
    if (status == 'Rejected') {
      payload = {
        eligibility_status: status,
        workflow_state: 'Eligibility assessment',
        status: 'Archive',
        application_eligibility_status: [
          {
            eligible_status: 'Not Eligible',
            remarks: 'student Not Eligibile',
          },
        ],
      };
    } else {
      payload = {
        eligibility: 1,
        eligibility_status: status,
        // workflow_state: 'Incomplete registration visa',
      };
    }
    addStudentApp(payload, id)
      .then((x) => {
        props.setLoading(false);
        message.success('Application Successfully Moved to Next Stage');
        setTimeout(() => history.push('/eligibility/overview'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const onOfferLetter = () => {
    props.setLoading(true);
    offerLetterRelease(id)
      .then((x) => {
        generateOfferLetter(id).then(xd => {
          addStudentApp(
            {
              offer_letter_release: 1,
              registration_status: 'Approved',
              // workflow_state: 'Pending accomodation',
            },
            id,
          );
        
          props.setLoading(false);
          PopupSuccess(popupOffer);
          setTimeout(() => history.push('/registry/pending-offerletter'), 1000);
        }).catch(e => {
          console.log('Something Went Wrong')
          message.error('Something Went Wrong');
        })
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  // const onRegister = () => {
  //   props.setLoading(true);
  //   offerLetterRelease(id).then(x => {
  //     props.setLoading(false);
  //     PopupSuccess(popup);
  //     setTimeout(() => history.push('/registry/pending-offerletter'), 1000)
  //   })
  //   .catch((e) => {
  //     const { response } = e;
  //     props.setLoading(false);
  //     console.log('error', response);
  //     message.error('Something went wrong');
  //   });
  // };

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
    component:
      url.split('/')[1] == 'eligibility' ? (
        <Col span={24}>
          <Row gutter={20}>
            <Col span={12}>
              <Button
                size="large"
                onClick={() => onEligibile('Approved')}
                type="primary"
                htmlType="button"
                className="w-100 green-btn"
              >
                Eligible
              </Button>
            </Col>
            <Col span={12}>
              <Button
                size="large"
                type="primary"
                htmlType="button"
                onClick={() => onEligibile('Rejected')}
                className="w-100 red-btn"
              >
                Not Eligible
              </Button>
            </Col>
          </Row>
        </Col>
      ) : (
        <AssessmentCard
          status="pending"
          data={stepDetailData}
          btnTitle="Notify Department"
          title=""
          title2={'Applicant Academic Assessment'}
          title3={"Eligibility department is currently assessing the applicant's eligibility"}
          action={() => onNotify(appDetalData.name)}
          action2={() => onNotify(appDetalData.name)}
        />
      ),
  };
  const props3 = {
    title: 'Pending Registration & Visa',
    appStage: '3',
    stage: 2,
    type: 'app',
    noTitle: false,
    component:
      url.split('/')[1] == 'registry' ? (
        <PendingRegistrationsVisaDetails date={appDetalData.modified} onAction={onOfferLetter} />
      ) : (
        <CardStepAccordian data={stepDetailData} page={true} />
      ),
  };
  const props4 = {
    title: 'Pending Accommodations',
    appStage: '4',
    stage: 3,
    type: 'app',
    noTitle: false,
    component: (
      <Row gutter={[20, 20]} justify="end">
        <Col span={24}>
          <CardStepAccordian data={stepDetailData} page={true} />
        </Col>
        {/* <Col>
          <Button size="large" onClick={movetoEnrollment} type="primary" htmlType="button" className="green-btn">
            Move to Enrollment
          </Button>
        </Col> */}
      </Row>
    ),
  };
  const props5 = {
    title: 'Pending Enrolment',
    appStage: '5',
    stage: 4,
    type: 'app',
    noTitle: false,
    component:
      url.split('/')[1] == 'registry' ? (
        <PendingEnrollmentDetails date={appDetalData.modified} />
      ) : (
        <CardStepAccordian data={stepDetailData} page={true} />
      ),
  };
  const props6 = {
    title: 'Approved',
    appStage: 'Approved',
    stage: 5,
    type: 'app',
    noTitle: false,
    component: (
      <Text className="card-text" style={{ backgroundColor: '#02a574', color: '#fff' }}>
        Application is Approved
      </Text>
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
      case 'approved':
        return props6;
    }
  };

  const onError = (errors, e) => {
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
                    {console.log('checkk', url.split('/')[1])}
                    <ApplicationStatus {...checkCase()} menu={url.split('/')[1] == 'marketing' ? menu : null} />
                  </Col>
                  <Col span={24}>
                    <Card bordered={false} className="uni-card transparent-card">
                      <Row gutter={[20, 20]}>
                        <Col span={24}>
                          <Card bordered={false} className="uni-card">
                            <Form
                              onFinish={handleSubmit(onFinish, onError)}
                              layout="vertical"
                              scrollToFirstError={true}
                            >
                              <ApplicationForm
                                mode={name == 'incomplete-documents' ? 'edit' : 'view'}
                                control={control}
                                errors={errors}
                                setValue={setValue}
                                getValues={getValues}
                                setError={setError}
                                clearErrors={clearErrors}
                                setAgentUser={setAgentUser}
                                agentUser={agentUser}
                                watch={watch}
                                widthCol="1 0 300px"
                                stage={name}
                                data={appDetalData}
                                incentArray={{
                                  firstIncent: firstIncent,
                                  setFirstIncent: setFirstIncent,
                                  secondIncent: secondIncent,
                                  setSecondIncent: setSecondIncent,
                                  thirdIncent: thirdIncent,
                                  setThirdIncent: setThirdIncent,
                                }}
                              />
                            </Form>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Documents docs={documentDownloadList} />
                        </Col>
                        <Col span={24}>
                          <UpdateSection
                            data={commentsApi}
                            code={id}
                            module={'Application'}
                            updateComment={updateComment}
                          />
                        </Col>
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
