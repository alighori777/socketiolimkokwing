import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';
import moment from 'moment';
import { getFileName, onBeforeUploadFile } from '../../../../../../../features/utility';
import { allowed } from '../../../../../../../routing/config/utils';
import AllRoles from '../../../../../../../routing/config/AllRoles';
import { getStudentdetails } from '../../../../../Registry/Students/ducks/actions';
import { baseUrl } from '../../../../../../../configs/constants';

const _ = require('lodash');
const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const { control, errors, mode, setValue, getValues, widthCol, clearErrors, setError, data } = props;
  const countryDropData = useSelector((state) => state.applicationForm.countryData);
  const nationalityData = useSelector((state) => state.applicationForm.nationalityData);
  const raceDropData = useSelector((state) => state.applicationForm.raceData);
  const genderDropData = useSelector((state) => state.applicationForm.genderData);
  // const staffList = useSelector((state) => state.global.staff);
  const councelorData = useSelector((state) => state.applicationForm.councelorData);
  const appTypeDropData = useSelector((state) => state.applicationForm.appTypeData);
  const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];
  const student = useSelector((state) => state.students.studentAppData);
  const [exist, setExist] = useState(false);

  const PPDates = (current) => {
    return current && current > moment().endOf('day');
  };

  useEffect(() => {
    if (data && data.type == 'Existing Student') {
      setExist(true);
    } else {
      setExist(false);
    }
  }, [data]);

  const onSameAddress = (e) => {
    if (e[0] == 1) {
      setValue('permanent_address', getValues('current_address'));
      setValue('permanent_state', getValues('current_state'));
      setValue('permanent_post_code', getValues('current_post_code'));
      setValue('permanent_country', getValues('current_country'));
      setValue('permanent_city', getValues('current_city'));
    }
  };

  useEffect(() => {
    if (mode != 'add') {
      setValue('counsellor', { label: user.full_name, value: user.name });
    }
  }, []);

  const onTypeChange = (e) => {
    if (e.value == 'Existing Student') {
      setExist(true);
    } else {
      setExist(false);
    }
  };

  const onStudentID = (e) => {
    if (e.target.value) {
      dispatch(getStudentdetails(e.target.value));
    }
  };

  useEffect(() => {
    if (Object.entries(student).length > 0) {
      setValue('applicant_name', student?.applicant_name);
      setValue('icpassport', student?.icpassport);
      setValue('contact_no', student?.contact_no);
      setValue('email', student?.email);
      setValue('emergency_contact_name', student?.emergency_contact_name);
      setValue('emergency_contact_email', student?.emergency_contact_email);
      setValue('emergency_contact_number', student?.emergency_contact_number);
      setValue('score', student?.qualifications[0]?.score);
      setValue('place_of_birth', student?.place_of_birth);

      setValue('current_address', student?.current_address_1);
      setValue('current_city', student?.current_city);
      setValue('current_post_code', student?.current_post_code);
      setValue('current_state', student?.current_state);

      if (student?.current_country) {
        setValue(
          'current_country',
          student?.current_country
            ? {
                value: student?.current_country,
                label: student?.current_country,
              }
            : '',
        );
      }

      setValue('permanent_address', student?.permanent_address_1);
      setValue('permanent_city', student?.permanent_city);
      setValue('permanent_post_code', student?.permanent_post_code);
      setValue('permanent_state', student?.permanent_state);

      if (student?.permanent_country) {
        setValue(
          'permanent_country',
          student?.permanent_country
            ? {
                value: student?.permanent_country,
                label: student?.permanent_country,
              }
            : '',
        );
      }

      if (student?.date_of_birth) {
        setValue('date_of_birth', moment(student?.date_of_birth, 'YYYY-MM-DD'));
      }
      if (student?.passport_expiry) {
        setValue('passport_expiry', moment(student?.passport_expiry, 'YYYY-MM-DD'));
      }

      if (student?.qualifications[0]?.english_language_qualification) {
        setValue(
          'english_language_qualification',
          student?.qualifications[0]?.english_language_qualification
            ? {
                value: student?.qualifications[0]?.english_language_qualification,
                label: student?.qualifications[0]?.english_language_qualification,
              }
            : '',
        );
      }

      if (student?.race) {
        setValue(
          'race',
          student?.race
            ? {
                value: student?.race,
                label: student?.race_name,
              }
            : '',
        );
      }

      if (student?.nationality) {
        setValue(
          'nationality',
          student?.nationality
            ? {
                value: student?.nationality,
                label: student?.nationality,
              }
            : '',
        );
      }

      if (student?.issuing_country) {
        setValue(
          'issuing_country',
          student?.issuing_country
            ? {
                value: student?.issuing_country,
                label: student?.issuing_country,
              }
            : '',
        );
      }

      if (student?.gender) {
        setValue(
          'gender',
          student?.gender
            ? {
                value: student?.gender,
                label: student?.gender,
              }
            : '',
        );
      }

      if (student?.marital_status) {
        setValue(
          'marital_satus',
          student?.marital_status
            ? {
                value: student?.marital_status,
                label: student?.marital_status,
              }
            : '',
        );
      }

      if (student?.issuing_country) {
        setValue(
          'issuing_country',
          student?.issuing_country
            ? {
                value: student?.issuing_country,
                label: student?.issuing_country,
              }
            : '',
        );
      }

      if (student?.qualifications[0]?.academic && student?.qualifications[0]?.academic.length > 0) {
        setValue('education', student?.qualifications[0]?.academic);
      }

      if (student?.documents?.length > 0) {
        if (student?.documents[0]?.document) {
          setValue(
            'attached_document_bg',
            student?.documents[0]?.document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(student?.documents[0]?.document),
                      status: 'done',
                      url: `${baseUrl}${student?.documents[0]?.document}`,
                    },
                  ],
                }
              : '',
          );
        }
        if (student?.documents[1]?.document) {
          setValue(
            'attached_document_scanned',
            student?.documents[1]?.document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(student?.documents[1]?.document),
                      status: 'done',
                      url: `${baseUrl}${student?.documents[1]?.document}`,
                    },
                  ],
                }
              : '',
          );
        }
        if (student?.documents.find((x) => x.document_name == 'CV')) {
          setValue(
            'resume',
            student?.documents.find((x) => x.document_name == 'CV')?.document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(student?.documents.find((x) => x.document_name == 'CV')?.document),
                      status: 'done',
                      url: `${baseUrl}${student?.documents.find((x) => x.document_name == 'CV')?.document}`,
                    },
                  ],
                }
              : '',
          );
        }
        if (student?.documents.find((x) => x.document_name == 'Portfolio')) {
          setValue(
            'portfolio',
            student?.documents.find((x) => x.document_name == 'Portfolio')?.document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(student?.documents.find((x) => x.document_name == 'Portfolio')?.document),
                      status: 'done',
                      url: `${baseUrl}${student?.documents.find((x) => x.document_name == 'Portfolio')?.document}`,
                    },
                  ],
                }
              : '',
          );
        }
      }

      if (student?.qualifications[0]?.certificate) {
        setValue(
          'certificate',
          student?.qualifications[0]?.certificate
            ? {
                fileList: [
                  {
                    uid: '-1',
                    name: getFileName(student?.qualifications[0]?.certificate),
                    status: 'done',
                    url: `${baseUrl}${student?.qualifications[0]?.certificate}`,
                  },
                ],
              }
            : '',
        );
      }
    }
  }, [student]);

  const personalFields = [
    {
      type: 'select',
      label: 'Application Type',
      name: 'type',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      placeholder: 'Please select',
      options: appTypeDropData?.map((x) => ({ label: x.name, value: x.name })),
      req: mode == 'view' ? false : true,
      reqmessage: 'Application Type Required',
      onChange: onTypeChange,
    },
    {
      name: 'counsellor',
      label: 'Select Counselor',
      placeholder: 'Please state',
      type: 'select',
      twocol: false,
      colWidth: widthCol,
      reqmessage: 'Counselor Required',
      static: mode == 'view' || !allowed([AllRoles.MARKETING.MANAGER], 'read') ? true : false,
      req: mode == 'view' ? false : true,
      options: _.map(councelorData, (e) => ({ value: e.name, label: e.employee_name })),
    },
    {
      type: 'input',
      label: 'Student ID',
      name: 'current_studentid',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      placeholder: 'Type your student ID',
      req: mode == 'view' || exist == false ? false : true,
      reqmessage: 'ID Required',
      hidden: exist == false ? true : false,
      onBlur: onStudentID,
    },
    {
      type: 'input',
      label: 'Name as per IC/Passport',
      name: 'applicant_name',
      twocol: false,
      // string: true,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      placeholder: 'Please state',
      req: mode == 'view' ? false : true,
      reqmessage: 'Applicant Name Required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      placeholder: 'Please select',
      options: countryDropData?.map((x) => ({ label: x.name, value: x.name })),
      req: mode == 'edit' ? true : false,
      reqmessage: 'Nationality Required',
    },
    {
      type: 'select',
      label: 'Gender',
      name: 'gender',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      options: genderDropData?.map((x) => ({ label: x.name, value: x.name })),
      placeholder: 'Please select',
      reqmessage: 'Gender Required',
    },
    {
      type: 'select',
      label: 'Race',
      name: 'race',
      twocol: false,
      colWidth: widthCol,
      options: raceDropData?.map((x) => ({ label: x.name1, value: x.name })),
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      placeholder: 'Please select',
      reqmessage: 'Race Required',
    },
    {
      type: 'input',
      name: 'contact_no',
      label: 'Contact Number',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please state',
      static: mode == 'view' ? true : false,
      req: mode == 'view' ? false : true,
      reqmessage: 'Contact Number Required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'marital_satus',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please select',
      options: [
        { value: 'Married', label: 'Married' },
        { value: 'Single', label: 'Single' },
      ],
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Marital Status Required',
    },
    {
      type: 'input',
      name: 'email',
      label: 'Email',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please state',
      static: mode == 'view' ? true : false,
      req: mode == 'view' ? false : true,
      email: true,
      reqmessage: 'Valid Email Required',
    },
    {
      type: 'input',
      label: 'IC/Passport Number',
      name: 'icpassport',
      placeholder: 'Please state',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'view' ? false : true,
      reqmessage: 'IC/Passport Number Required',
    },
    {
      type: 'upload',
      name: 'attached_document_bg',
      label: 'Passport Photo with White Background (Only PNG,JPG and upto 5MB)',
      placeholder: 'Upload',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Passport Photo Required',
      onChange: (e) => onBeforeUploadFile(e, 'image', 'attached_document_bg', setValue),
    },
    {
      type: 'upload',
      name: 'attached_document_scanned',
      label: 'IC/Passport(Scanned) (Only PDF and upto 10MB)',
      placeholder: 'Upload',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Passport Photo Required',
      onChange: (e) => onBeforeUploadFile(e, 'pdf', 'attached_document_scanned', setValue),
    },
    {
      type: 'date',
      label: 'Date of Birth',
      name: 'date_of_birth',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Date of Birth Required',
      disabledDate: PPDates,
    },
    {
      type: 'date',
      label: 'Passport Expiry Date',
      name: 'passport_expiry',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: false,
      reqmessage: 'Passport Expiry Required',
    },
    {
      type: 'input',
      label: 'Place of Birth',
      name: 'place_of_birth',
      placeholder: 'Please state',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Place of Birth Required',
    },
    {
      type: 'select',
      label: 'Passport Issuing Country',
      name: 'issuing_country',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please select',
      options: countryDropData?.map((x) => ({ label: x.name, value: x.name })),
      static: mode == 'view' ? true : false,
      req: false,
      reqmessage: 'Country Required',
    },

    // Current Address

    {
      subheader: 'Current Address',
      type: 'input',
      subheadlevel: 5,
      name: 'current_address',
      twocol: false,
      colWidth: widthCol,
      label: 'Address',
      placeholder: 'Please state',
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Address required',
    },
    {
      type: 'input',
      name: 'current_state',
      label: 'State',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please state',
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'State required',
    },
    {
      type: 'input',
      name: 'current_post_code',
      label: 'Postcode',
      number: true,
      placeholder: 'Please state',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Postcode required',
    },
    {
      type: 'select',
      name: 'current_country',
      label: 'Country',
      placeholder: 'Please select',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Country Required',
      options: _.map(countryDropData, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'current_city',
      label: 'City',
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'City required',
    },
    // Permanent Address
    {
      subheader: 'Permanent Address',
      subheadlevel: 5,
      label: 'Address',
      name: 'permanent_address',
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Address required',
    },
    {
      name: 'permanent_state',
      label: 'State',
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'State required',
    },
    {
      name: 'permanent_post_code',
      label: 'Postcode',
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Postcode required',
    },
    {
      name: 'permanent_country',
      label: 'Country',
      placeholder: 'Please select',
      type: 'select',
      twocol: false,
      colWidth: widthCol,
      reqmessage: 'Country Required',
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      options: _.map(countryDropData, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'permanent_city',
      label: 'City',
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'City required',
    },
    {
      hidden: mode == 'view' ? true : false,
      name: 'permenent_address',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      class: 'graycheckbox',
      twocol: false,
      colWidth: widthCol,
      reqmessage: '',
      options: [{ label: 'Same as current address', value: 1 }],
      onChange: onSameAddress,
    },
    // Emergency Contact

    {
      subheader: 'Emergency Contact',
      subheadlevel: 5,
      name: 'emergency_contact_name',
      label: 'Name',
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Name Required',
    },
    {
      type: 'input',
      name: 'emergency_contact_number',
      label: 'Contact Number',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please state',
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Contact Number Required',
    },
    {
      type: 'input',
      name: 'emergency_contact_email',
      label: 'Email',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please state',
      email: true,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Valid Email Required',
    },

    // Own By

    // {
    //   subheader: 'Own By',
    //   subheadlevel: 5,
    //   name: 'own_by',
    //   label: 'Own By',
    //   placeholder: 'Please state',
    //   type: 'select',
    //   twocol: false,
    //   colWidth: widthCol,
    //   static: mode == 'view' ? true : false,
    //   req: mode == 'edit' ? true : false,
    //   reqmessage: 'Own By Required',
    //   options: staffList.map(x => ({label: x.employee_name, value: x.name})),
    // },
  ];

  return (
    <Row gutter={[20, 30]} align="bottom">
      {personalFields.map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={item?.subheadlevel ? item?.subheadlevel : 4} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
    </Row>
  );
};
