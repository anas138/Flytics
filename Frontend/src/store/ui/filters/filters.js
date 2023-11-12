import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    dashboardFilters: {
      quickFilter: "d",
      dateFrom: null,
      dateTo: null,
    },
    navFilters: {
      department: "null",
    },
  },
  reducers: {
    quickFilterChanged: (filters, action) => {
      filters.dashboardFilters.quickFilter = action.payload.quickFilter;
      filters.dashboardFilters.dateTo = null;
      filters.dashboardFilters.dateFrom = null;
    },
    dateToChanged: (filters, action) => {
      filters.dashboardFilters.dateTo = action.payload.dateTo;
      filters.dashboardFilters.quickFilter = null;
    },
    dateFromChanged: (filters, action) => {
      filters.dashboardFilters.dateFrom = action.payload.dateFrom;
      filters.dashboardFilters.quickFilter = null;
    },
    departmentChanged: (filters, action) => {
      filters.navFilters.department = action.payload.department;
    },
  },
});

export const {
  quickFilterChanged,
  dateFromChanged,
  dateToChanged,
  departmentChanged,
} = slice.actions;

export default slice.reducer;
