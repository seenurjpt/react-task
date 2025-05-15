 // src/store/employeeTabsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  name: string;
  uploadedDate: string;
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

// Async thunk example for fetching documents
export const fetchDocuments = createAsyncThunk('employeeTabs/fetchDocuments', async () => {
  // simulate API delay
  await new Promise((res) => setTimeout(res, 1000));
  // return mock data
  return [
    { id: 'doc1', name: 'Contract.pdf', uploadedDate: '2025-01-15' },
    { id: 'doc2', name: 'NDA.pdf', uploadedDate: '2024-12-20' },
  ] as Document[];
});

const employeeTabsSlice = createSlice({
  name: 'employeeTabs',
  initialState,
  reducers: {
    // You can add sync reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch documents';
      });
  },
});

export default employeeTabsSlice.reducer;
