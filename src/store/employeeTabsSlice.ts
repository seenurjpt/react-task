import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  name: string;
  uploadedDate: string;
  url: string;
}

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
}

interface Payslip {
  id: string;
  month: string;
  year: number;
  amount: number;
  url: string;
}

interface TabsState {
  documents: Document[];
  attendance: AttendanceRecord[];
  payslips: Payslip[];
  loading: boolean;
  error: string | null;
}

const initialState: TabsState = {
  documents: [],
  attendance: [],
  payslips: [],
  loading: false,
  error: null,
};

// Async thunk for fetching documents
export const fetchDocuments = createAsyncThunk('employeeTabs/fetchDocuments', async () => {
  await new Promise(res => setTimeout(res, 1000)); // simulate delay
  return [
    { id: 'doc1', name: 'Contract.pdf', uploadedDate: '2025-01-15', url: 'https://example.com/contract.pdf' },
    { id: 'doc2', name: 'NDA.pdf', uploadedDate: '2024-12-20', url: 'https://example.com/nda.pdf' },
  ] as Document[];
});

// Async thunk for fetching attendance
export const fetchAttendance = createAsyncThunk('employeeTabs/fetchAttendance', async () => {
  await new Promise(res => setTimeout(res, 1000));
  return [
    { date: '2025-05-01', status: 'Present' },
    { date: '2025-05-02', status: 'Absent' },
    { date: '2025-05-03', status: 'Leave' },
    { date: '2025-05-04', status: 'Present' },
  ] as AttendanceRecord[];
});

// Async thunk for fetching payslips
export const fetchPayslips = createAsyncThunk('employeeTabs/fetchPayslips', async () => {
  await new Promise(res => setTimeout(res, 1000));
  return [
    { id: 'p1', month: 'April', year: 2025, amount: 5500, url: 'https://example.com/payslip-apr.pdf' },
    { id: 'p2', month: 'March', year: 2025, amount: 5300, url: 'https://example.com/payslip-mar.pdf' },
  ] as Payslip[];
});

const employeeTabsSlice = createSlice({
  name: 'employeeTabs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Documents
    builder.addCase(fetchDocuments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
      state.loading = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch documents';
    });

    // Attendance
    builder.addCase(fetchAttendance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAttendance.fulfilled, (state, action: PayloadAction<AttendanceRecord[]>) => {
      state.loading = false;
      state.attendance = action.payload;
    });
    builder.addCase(fetchAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch attendance';
    });

    // Payslips
    builder.addCase(fetchPayslips.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPayslips.fulfilled, (state, action: PayloadAction<Payslip[]>) => {
      state.loading = false;
      state.payslips = action.payload;
    });
    builder.addCase(fetchPayslips.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch payslips';
    });
  },
});

export default employeeTabsSlice.reducer;
