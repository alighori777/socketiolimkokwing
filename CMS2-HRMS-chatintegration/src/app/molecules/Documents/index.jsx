import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { DownloadIcon } from 'Atoms/CustomIcons';
import { getFileName, uniquiFileName, getSingleUpload } from '../../../features/utility';
// import Base64Downloader from 'common-base64-downloader-react';
import UploadDocuments from '../../modules/Registry/Students/components/UploadDocuments';
import { Popup } from 'Atoms/Popup';

import { apiresource, baseUrl } from '../../../configs/constants';
import axios from '../../../services/axiosInterceptor';
import ListCard from '../ListCard';
import { Link, useHistory } from 'react-router-dom';
import { studAppForm, studProfile, studTranscript } from './ducks/services';

const documents = [
  {
    name: 'Passport Photo with White Background',
    type: 'Passport Photo with White Background',
    url: '',
  },
  {
    name: 'IC/Passport (Scanned)',
    type: 'IC/Passport (Scanned)',
    url: '',
  },
  // {
  //   name: 'Academic Transcript 1',
  //   type: 'Academic Transcript 1',
  //   url: '',
  // },
  // {
  //   name: 'Academic Certificate 1',
  //   type: 'Academic Certificate 1',
  //   url: '',
  // },
  {
    name: 'Proof of English Language Proficiency (IELTS/TOEFL)',
    type: 'Proof of English Language Proficiency (IELTS/TOEFL)',
    url: '',
  },
  {
    name: 'Resume/CV',
    type: 'CV',
    url: '',
  },
  {
    name: 'Portfolio',
    type: 'Portfolio',
    url: '',
  },
  {
    name: 'Student Consent for Progression',
    type: 'Student Consent for Progression',
    url: '',
  },

  {
    name: 'Exit stamp',
    type: 'Exit stamp',
    url: '',
  },
  {
    name: 'Medical Check-up',
    type: 'Medical Check-up',
    url: '',
  },
  {
    name: 'Scholarship Letter from Sponsor',
    type: 'Scholarship Letter from Sponsor',
    url: '',
  },
  {
    name: 'Sponsorship Recommendation Letter',
    type: 'Sponsorship Recommendation Letter',
    url: '',
  },
  {
    name: 'Undertaking Letter',
    type: 'Undertaking Letter',
    url: '',
  },
  {
    name: 'Affidavit Letter',
    type: 'Affidavit Letter',
    url: '',
  },
  {
    name: 'Clear colored passport photo page',
    type: 'Clear colored passport photo page',
    url: '',
  },
  {
    name: 'Certified true copy of Higher Education result & certificate (original & translated)',
    type: 'Certified true copy of Higher Education result & certificate (original & translated)',
    url: '',
  },
  {
    name: '6 Passport Size photograph with blue background (3.5cmx5cm)',
    type: '6 Passport Size photograph with blue background (3.5cmx5cm)',
    url: '',
  },
  {
    name: '2 Passport Copies including all blank pages',
    type: '2 Passport Copies including all blank pages',
    url: '',
  },
  {
    name: 'Certified copies of High School result (original & translated)',
    type: 'Certified copies of High School result (original & translated)',
    url: '',
  },
  // {
  //   name: 'Visa Approval Letter',
  //   type: 'Visa Approval Letter',
  //   url: '',
  // },
  // {
  //   name: 'Accommodation Offer Letter',
  //   type: 'Accommodation Offer Letter',
  //   url: '',
  // },
  // {
  //   name: 'Arrival Form',
  //   type: 'Arrival Form',
  //   url: '',
  // },
  // {
  //   name: 'Accommodation Form',
  //   type: 'Accommodation Form',
  //   url: '',
  // },
  // {
  //   name: 'Sponsorship Recommendation Letter',
  //   type: 'Sponsorship Recommendation Letter',
  //   url: '',
  // },
];

export default (props) => {
  const { docs, id, updateApi, doctype, permit } = props;
  const [alldocs, setAllDocs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const history = useHistory();

  const generatePDF = (type) => {
    let fileurl = '';
    if(type == 'Student Profile') {
      studProfile(id).then(res => {
        fileurl = res.data.message.message;
        updateApi();
        window.open(`${baseUrl}${fileurl}`, "_blank");
      }).catch(e => {
        const { response } = e;
        console.log("error", response.data);
        message.error('Something Went Wrong');
      })
    } else if(type == 'Application Form') {
      studAppForm(id).then(res => {
        fileurl = res.data.message.message;
        updateApi();
        window.open(`${baseUrl}${fileurl}`, "_blank");
      }).catch(e => {
        const { response } = e;
        console.log("error", response.data);
        message.error('Something Went Wrong');
      })
    } else if(type == 'Academic Transcript') {
      studTranscript(id).then(res => {
        fileurl = res.data.message.message;
        updateApi();
        window.open(`${baseUrl}${fileurl}`, "_blank");
      }).catch(e => {
        const { response } = e;
        console.log("error", response.data);
        message.error('Something Went Wrong');
      })
    } 
    // else if(type == 'Attendance Report') {

    // } else if(type == 'Course Advising Form') {

    // }
  }

  const ListCol = [
    {
      title: 'Document Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
    },
  
    {
      title: 'View/Download',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 150,
      render: (text, record) =>
        text ? (
          <Link to={{
            pathname: `${baseUrl}${text}`,
          }} target="_blank"><DownloadIcon className="c-success" /></Link>
        ) : (
          <Button type="link" onClick={() => generatePDF(record.name)} htmlType="button" className="p-0" icon={<DownloadIcon className="c-success" />}/>
        ),
    },
  ];

  useEffect(() => {
    if (docs) {
    let docArr = [];
      docs.map(x => {
        docArr.push({
        xid: x?.id,
        name: x?.document_name,
        type: x.document_name,
        url: x.document,
      })
    });
    let doc1 =  { xid: '', name: 'Student Profile', type: 'Student Profile', url: '' }
    let doc2 =  { xid: '', name: 'Application Form', type: 'Application Form', url: '' }
    let doc3 =  { xid: '', name: 'Attendance Report', type: 'Attendance Report', url: '' }
    let doc4 =  { xid: '', name: 'Academic Transcript', type: 'Academic Transcript', url: '' }
    let doc5 =  { xid: '', name: 'Course Advising Form', type: 'Course Advising Form', url: '' }
    docArr.find(x => x.name == 'Student Profile' && x.url) ? null : docArr.push(doc1);
    docArr.find(x => x.name == 'Application Form' && x.url) ? null : docArr.push(doc2);
    docArr.find(x => x.name == 'Academic Transcript' && x.url) ? null : docArr.push(doc4);
    docArr.find(x => x.name == 'Attendance Report' && x.url) ? null : docArr.push(doc3);
    docArr.find(x => x.name == 'Course Advising Form' && x.url) ? null : docArr.push(doc5);
    setAllDocs(docArr);
    }
  }, [docs]);

  const onUploadDocs = async (val) => {
    setLoad(true);
    let docArray = [];
    alldocs.map((x) => {
      x.url && docArray.push({ item: x.type, attached_document: x.url });
    });

    await Promise.all(
      val.documents.map(async (x) => {
        if (x?.document) {
          let modifiedName = uniquiFileName(x?.document?.file?.originFileObj.name);
          let res = await getSingleUpload(
            modifiedName,
            'image',
            x?.document?.file?.originFileObj,
            doctype,
            id,
          );
          docArray.push({
            item: x.type.value,
            attached_document: res?.file_url,
          });
        }
      }),
    );

    const body = {
      application_uploaded_documents: docArray,
    };

    let upurl = `${apiresource}/${doctype}/${id}`;

    try {
      await axios.put(upurl, body);
      setLoad(false);
      message.success('Document Uploaded');
      setTimeout(() => {
        updateApi();
        setVisible(false);
      }, 1000);
    } catch (e) {
      const { response } = e;
      console.log('response', response);
      message.error(response?.data?.status?.message ?? 'Something went wrong');
      setLoad(false);
    }
  };

  const popup = {
    closable: false,
    visibility: visible,
    content: <UploadDocuments onClose={() => setVisible(false)} onSubmit={onUploadDocs} load={load} />,
    width: 900,
    onCancel: () => setVisible(false),
  };

  return (
    <>
      <ListCard
        title="Documents"
        ListCol={ListCol}
        ListData={alldocs}
        pagination={true}
        scrolling={500}
        extraBtn={permit != true && 'Upload Documents'}
        extraAction={() => setVisible(true)}
        btnClass="green-btn"
      />
      <Popup {...popup} />
    </>
  );
};
