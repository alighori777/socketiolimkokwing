import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from 'Molecules/ListCard';
import Search from '../Search';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';
import { getTransactionListPg } from '../../../ducks/actions';
import { formatCurrency } from '../../../../../../features/utility';
const TRANSACTION_TYPE = 'Online';



const filters = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Incomplete',
    value: 'Incomplete',
  },
  {
    label: 'Unverified',
    value: 'Pending',
  },
  {
    label: 'Rejected',
    value: 'Rejected',
  },
];



export default ({ iProps }) => {

  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  const ListCol = [
    {
      title: 'Date',
      dataIndex: 'transaction_date',
      key: 'transaction_date',
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Ref No',
      dataIndex: 'ref_no',
      key: 'ref_no',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'transaction_type',
      key: 'transaction_type',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'transaction_category',
      key: 'transaction_category',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      ellipsis: true,
      sorter: true,
      render: (text,record) => {
        let clname = '';
        let isIncome = record.transaction_type == 'Income';
        if (isIncome) {
          clname = 'c-success';
        } else {
          clname = 'c-error';
        }  
        return <span className={`SentanceCase ${clname}`}>{!isIncome?'- ':''}{company_currency} {formatCurrency(text)}</span>;
      }
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id', 
      ellipsis: true,
      sorter: false,
      render:(text,record)=> record.transaction_category=='Grant Payment'?record.staff_id:record.student_id
      
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: false,
      render:(text,record)=> { 
        if (record.transaction_category=='Grant Payment') {
          return record.grant_name 
        }else if (record.transaction_category=='Scholarship Payment') {
          return record.scholarship_name 
        }else{
          return record.student_name 
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 140,
      render: (text) => {
        let clname = '';
        if (text == 'Verified') {
          clname = 'c-success';
        } else if (text == 'Incomplete') {
          clname = 'c-error';
        } else if (text == 'Pending') {
          clname = 'c-pending';
        } else if (text == 'Unverified') {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      }
    }
  ]

  const { setData } = iProps;
  const dispatch = useDispatch();
  const [filterVal, setFilterVal] = useState('All');
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const [searchParams,setSearchParams] = useState('');
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const data = useSelector((state) => state.finance.transactionList);


  useEffect(() => {
    filterVal && dispatch(getTransactionListPg(filterVal, page, limit, TRANSACTION_TYPE,{}));
  }, [filterVal]);

  const btnList = [
    {
      text: '+ New Transaction',
      classes: 'green-btn',
      action: () => addTrans(),
    },
  ];

  const addTrans = () => {
      setData({
        data: null,
        visible: true,
        type: 'Online'
      });
  }
  
  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onSearch = (search) => {
    setSearchParams(search)
    dispatch(getTransactionListPg(filterVal, page, limit,TRANSACTION_TYPE,search));
  }

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setData({
          data: record,
          visible: true,
          type: 'Online'
        })
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log("pagination, filters, sorter =>",pagination, filters, sorter);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getTransactionListPg(filterVal, pagination.current, pagination.pageSize,TRANSACTION_TYPE, searchParams || {}, sorter.order, sorter.columnKey));
    } else {
      dispatch(getTransactionListPg(filterVal, pagination.current, pagination.pageSize, TRANSACTION_TYPE, searchParams || {}, '', ''));
    }
  }

  return (
    <>
      <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />
      <Row gutter={[20, 30]}>
        <Col span={24} className='clickRow'>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            filters={filters}
            filterValue={filterVal}
            onFilter={onFilter}
            ListCol={ListCol}
            ListData={data?.rows}
            onChange={onTableChange}
            pagination={{
              total: data?.count,
              current: page,
              pageSize: limit
            }}
          />
        </Col>
      </Row>
    </>
  );
};
