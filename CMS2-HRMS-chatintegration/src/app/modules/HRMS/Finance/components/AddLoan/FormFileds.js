const addLoan = [
  {
    type: 'select',
    label: 'Loan Type',
    name: 'loan_type',
    twocol: true,
    req: true,
    placeholder: 'Select Loan type',
    reqmessage: 'Loan Type required',
    options: [
      { value: 'General Loan', label: 'General Loan' },
      { value: 'Student Loan', label: 'Student Loan' },
    ],
  },
  {
    type: 'select',
    label: 'Loan Ammount',
    name: 'loan_ammount_type',
    twocol: false,
    colWidth: '0 1 110px',
    options: [{ value: 'RM', label: 'RM' }],
  },
  {
    type: 'input',
    label: '',
    name: 'amount',
    placeholder: 'Enter Amount',
    twocol: false,
    req: true,
    reqmessage: 'Amount required',
    colWidth: '1 0 180px',
  },
  {
    type: 'date',
    label: 'Loan Start Date',
    name: 'loan_start_date',
    req: true,
    reqmessage: 'date required',
    twocol: true,
  },
  {
    type: 'select',
    label: 'Monthly Deduction from Salary',
    name: 'monthly_deduction',
    twocol: false,
    colWidth: '0 1 110px',
    options: [{ value: 'RM', label: 'RM' }],
  },
  {
    type: 'input',
    label: '',
    name: 'deduction_amount',
    twocol: false,
    placeholder: 'Enter Amount',
    colWidth: '1 0 180px',
    req: true,
    reqmessage: 'Amount required',
  },
];
export { addLoan };
