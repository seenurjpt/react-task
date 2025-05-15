import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmployeeData {
  name: string;
  position: string;
  linkedin: string;
  email: string;
  phone: string;
  address: string;
  image: string | null;
}

interface Note {
  id: string;
  content: string;
  date: string;
  type: 'positive' | 'negative';
}

interface EmployeeState {
  employeeData: EmployeeData;
  notes: Note[];
}

const initialEmployeeData: EmployeeData = {
  name: 'Jerome Bell',
  position: 'Senior Software Developer',
  linkedin: 'https://www.linkedin.com/in/jerome.bell/',
  email: 'jerome.bell@invision.com',
  phone: '629.555.0129',
  address: '232, 4th Street, Melbourne, Australia',
  image: 'https://randomuser.me/api/portraits/men/1.jpg',
};

const initialState: EmployeeState = {
  employeeData: initialEmployeeData,
  notes: [
    {
      id: '1',
      content: 'Jerome has been working and leading on PV-21 project with enthusiasm and high level of dedication.',
      date: '15/04/2025',
      type: 'positive',
    },
    {
      id: '2',
      content: 'Jerome has been caught smoking in the office premises which violates company policy.',
      date: '05/01/2025',
      type: 'negative',
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
  },
});

export const { updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
