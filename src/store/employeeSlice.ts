import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: any;
  content: string;
  date: string;
  priority: 'important' | 'normal';
}

interface EmploymentDetails {
  clientName: string;
  location: string;
  employmentType: string;
  mode: string;
  reportingTo: string;
}

interface ContractDetails {
  startedOn: string;
  contractStartDate: string;
  contractEndDate: string;
  incrementDate: string;
}

interface PaymentDetails {
  salaryPerMonth: number;
  monthlyPaymentDate: string;
  invoiceCycleEnds: string;
  lastIncrementPercent: number;
}

export interface EmployeeData {
  name: string;
  position: string;
  linkedin: string;
  email: string;
  phone: string;
  address: string;
  employmentDetails: EmploymentDetails;
  contractDetails: ContractDetails;
  paymentDetails: PaymentDetails;
  image: any;
}


interface EmployeeState {
  employeeData: EmployeeData;
  notes: Note[];
}

const initialState: EmployeeState = {
  employeeData: {
    name: 'Jerome Bell',
    position: 'Senior Software Developer',
    image: '',
    linkedin: 'https://www.linkedin.com/in/jerome.bell/',
    email: 'jerome.bell@invision.com',
    phone: '629.555.0129',
    address: '232, 4th Street, Melbourne, Australia',
    employmentDetails: {
      clientName: 'Invision Pvt. Ltd',
      location: 'Melbourne, Australia',
      employmentType: 'Contract',
      mode: 'Hybrid',
      reportingTo: 'Mary Houston - COO',
    },
    contractDetails: {
      startedOn: '12/05/2023',
      contractStartDate: '12/05/2024',
      contractEndDate: '12/05/2025',
      incrementDate: '12/05/2025',
    },
    paymentDetails: {
      salaryPerMonth: 5500,
      monthlyPaymentDate: '7th',
      invoiceCycleEnds: 'Last day of the month',
      lastIncrementPercent: 15,
    },
  },
  notes: [
    {
      id: '1',
      content:
        'Jerome has been working and leading on PV-21 project with enthusiasm and high level of dedication.',
      date: '15/04/2025',
      priority: 'important',
    },
    {
      id: '2',
      content:
        'Jerome has been caught smoking in the office premises which violates company policy.',
      date: '05/01/2025',
      priority: 'normal',
    },
  ],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    updateEmployee(state, action: PayloadAction<EmployeeData>) {
      state.employeeData = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
  state.notes.push(action.payload);
},
  },
});

// Export action creator for dispatching updates
export const { updateEmployee,addNote } = employeeSlice.actions;

// Export reducer as default
export default employeeSlice.reducer;
