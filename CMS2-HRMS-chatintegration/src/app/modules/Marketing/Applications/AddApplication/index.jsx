import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Form, message, Card } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useHistory } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import {
  getCountryDrop,
  getNationalityDrop,
  getApplicationTypeDrop,
  getGenderDrop,
  getEnglishQualificationDrop,
  getProgNameDrop,
  getCouncelor,
  getSources,
} from '../ducks/actions';
import { useDispatch } from 'react-redux';
import { addStudentApp } from '../ducks/services';
import { getSingleUpload, uniquiFileName } from '../../../../../features/utility';
import { getRace } from '../../../Application/ducks/actions';
import moment from 'moment';
import { getCurrentYearIntakes } from '../../../AQA/Incentives/ducks/actions';
import { allowed } from '../../../../../routing/config/utils';
import AllRoles from '../../../../../routing/config/AllRoles';
import { baseUrl } from '../../../../../configs/constants';

const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [firstIncent, setFirstIncent] = useState([]);
  const [secondIncent, setSecondIncent] = useState([]);
  const [thirdIncent, setThirdIncent] = useState([]);
  const [agentUser, setAgentUser] = useState(false);
  const { control, errors, setValue, getValues, handleSubmit, clearErrors, setError, watch } = useForm();
  const userId = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const userName = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].full_name;

  useEffect(() => {
    dispatch(getCountryDrop());
    dispatch(getNationalityDrop());
    dispatch(getRace());
    dispatch(getApplicationTypeDrop());
    dispatch(getGenderDrop());
    dispatch(getEnglishQualificationDrop());
    dispatch(getProgNameDrop());
    dispatch(getCouncelor());
    dispatch(getSources());
    dispatch(getCurrentYearIntakes());
    if (!allowed([AllRoles.MARKETING.MANAGER], 'read')) {
      setValue('counsellor', { label: userName, value: userId });
    }
  }, []);

  const onFinish = async (val) => {
    setLoad(true);
    const firstPay = {
      type: val?.type?.value,
      applicant_name: val?.applicant_name,
      icpassport: val?.icpassport,
      contact_no: val?.contact_no,
      email: val?.email,
    };
    let noexempt = [];
    let exempt = [];

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

    addStudentApp(firstPay)
      .then(async (resp) => {
        let appName = resp['data']?.data.name;
        let certificate = '';
        let passportbg = '';
        let resumecv = '';
        let portfolio = '';
        let passportscanned = '';
        let educate = [];
        let modtranscript = '';

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
            let res = await getSingleUpload(
              modifiedName,
              'image',
              val.resume?.file?.originFileObj,
              'Application',
              appName,
            );
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
                if (x?.academic_certificate.fileList[0].uid != '-1') {
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
                if (x?.academic_transcript.fileList[0].uid != '-1') {
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
          status: 'Active',
          workflow_state: 'Incomplete document',
          type: val?.type?.value,
          first_pref_incentive: firstI,
          second_pref_incentive: secondI,
          third_pref_incentive: thirdI,
          applicant_name: val?.applicant_name.trim(),
          application_source: val?.application_source.value,
          source_name: val?.application_source ? val?.application_source.label : '',
          owner: val?.agent_user ? val?.agent_user?.value : '',
          agent_id: val?.agent_user ? val?.agent_user?.value : '',
          icpassport: val?.icpassport,
          contact_no: val?.contact_no,
          email: val?.email,
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
          remarks: '',
          find_us: 'Social network',
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

          education: educate,
          counsellor: val?.counsellor?.value ? val?.counsellor?.value : '',
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
        };

        console.log('checking12', payLoad);

        addStudentApp(payLoad, appName)
          .then((resp2) => {
            message.success('Application Successfully Created');
            setLoad(false);
            setTimeout(() => history.push('/marketing/applications'), 1000);
          })
          .catch((e) => {
            const { response } = e;
            setLoad(false);
            console.log('error', response);
            message.error('Something went wrong');
          });
      })
      .catch((e) => {
        const { response } = e;
        setLoad(false);
        console.log('error', response);
        message.error('There is some error in the Api');
      });
  };

  // useEffect(() => {
  //   setValue('counsellor', {
  //     value: userId,
  //     label: userName,
  //   });
  // }, [userName]);

  const onError = (errors, e) => {
    if (Object.keys(errors).length > 0) {
      message.error('There are some Validation Errors');
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onFinish, onError)} scrollToFirstError>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Add New Application" />
        </Col>
        <Col span={24}>
          <Spin indicator={antIcon} size="large" spinning={load}>
            <Card bordered={false} className="uni-card">
              <ApplicationForm
                mode="add"
                setLoad={setLoad}
                control={control}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                setAgentUser={setAgentUser}
                agentUser={agentUser}
                widthCol="1 0 400px"
                clearErrors={clearErrors}
                setError={setError}
                watch={watch}
                incentArray={{
                  firstIncent: firstIncent,
                  setFirstIncent: setFirstIncent,
                  secondIncent: secondIncent,
                  setSecondIncent: setSecondIncent,
                  thirdIncent: thirdIncent,
                  setThirdIncent: setThirdIncent,
                }}
              />
            </Card>
          </Spin>
        </Col>
      </Row>
    </Form>
  );
};
