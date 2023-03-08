import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../molecules/ListCard';
import Search from './Search';
import { getStudentsListPg } from '../../Registry/Students/ducks/actions';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';
import MainStatusCard from '../../../atoms/MainStatusCard';
import ApprovedStudents from './Components/ApprovedStudents';

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const students = useSelector((state) => state.students.studentList);
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const data = [
    {
      student_id: '00004654',
      student_name: 'Owais Zafar',
      issue_type: 'Outstanding Balance',
      balance: 'RM 12,000.00',
    },
    {
      student_id: '00004654',
      student_name: 'Owais Zafar',
      visa_expiring: '10 Days Left',
      issue_type: 'Expiring Visa',
    },
    {
      student_id: '00004654',
      student_name: 'Owais Zafar',
      issue_type: 'Unregisterd Module',
      modules: '3 Modules',
    },
  ];

  const ListCol = [
    {
      title: 'ID',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      width: 140,
    },
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      sorter: true,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Level',
      dataIndex: 'education_level',
      key: 'education_level',
      sorter: true,
    },
  ];

  useEffect(() => {
    dispatch(getAllFaculty());
    dispatch(getAllPrograms());
    dispatch(getStudentsListPg('Active', page, limit, '', ''));
  }, []);

  useEffect(() => {
    if (facultyList && facultyList.length > 0) {
      let temp = [];
      facultyList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Faculties', value: '' });
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        } else {
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        }
      });
      setFaculty(temp);
    }
  }, [facultyList]);

  useEffect(() => {
    if (programList && programList.length > 0) {
      let temp = [];
      programList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Programmes', value: '' });
          temp.push({ label: x.program_name, value: x.program_name });
        } else {
          temp.push({ label: x.program_name, value: x.program_name });
        }
      });
      setProgram(temp);
    }
  }, [programList]);

  const onSearch = (val) => {};

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`students/${record.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getStudentsListPg(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getStudentsListPg(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  };

  const caseKey = (key) => {
    switch (key) {
      case 'Outstanding Balance':
        return 'balance';
      case 'Expiring Visa':
        return 'visa_expiring';
      case 'Unregisterd Module':
        return 'modules';
    }
  };

  const btnList = [
    {
      text: 'View All >',
      classes: 'c-white linkbtn',
      type: 'link',
      //   action: () => addNew(),
    },
  ];

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
            <ApprovedStudents></ApprovedStudents>
          {/* <Col span={24}>
            <HeadingChip title="Pending Issues" btnList={btnList} />
          </Col> */}
          {/* <Col span={24}>
                <div className="flexibleRow">
                    {data.map((item, index) => (
                        <div className="requestPanel" key={index}>
                        <MainStatusCard data={item} link={'/marketing/students/'} statusKey={'issue_type'} highlight={true} statData={{key1: 'issue_type', key2: caseKey(item.issue_type)}} />
                        </div>
                    ))}
                </div>
            </Col> */}
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Student List" />
          </Col>
          <Col span={24} className="clickRow">
            <ListCard
              Search={Search}
              onSearch={onSearch}
              onChange={onTableChange}
              field1={faculty}
              field2={program}
              ListCol={ListCol}
              ListData={students?.rows}
              onRow={onClickRow}
              pagination={{
                total: students?.count,
                current: page,
                pageSize: limit,
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
