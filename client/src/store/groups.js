import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGroups,
  addNewGroup,
  addNewMemberToGroup,
  deleteGroup,
  getMembersOfGroup,
} from "../api/groups";

const initialGroupsState = {
  groups: [],
  members: [],
  addedMembers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const groupAddition = createAsyncThunk(
  "groups/newGroup",
  async (group, thunkAPI) => {
    try {
      return await addNewGroup(group);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const memberAddition = createAsyncThunk(
  "groups/addMember",
  async (obj, thunkAPI) => {
    try {
      return await addNewMemberToGroup(obj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllGroups = createAsyncThunk(
  "groups/getGroups",
  async (thunkAPI) => {
    try {
      return await getGroups();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMembers = createAsyncThunk(
  "groups/getMembers",
  async (id, thunkAPI) => {
    try {
      return await getMembersOfGroup(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOneGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (id, thunkAPI) => {
    try {
      return await deleteGroup(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState: initialGroupsState,
  reducers: {
    reset: (state) => initialGroupsState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(groupAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(groupAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups = action.payload;
      })
      .addCase(groupAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(memberAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(memberAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups = action.payload.groups;
        state.addedMembers = action.payload.group_members;
      })
      .addCase(memberAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllGroups.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups = action.payload;
      })

      .addCase(getAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getMembers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = action.payload;
      })

      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOneGroup.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOneGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups = state.users.filter(
          (group) => group._id !== action.payload
        );
      })

      .addCase(deleteOneGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default groupsSlice.reducer;
export const { reset } = groupsSlice.actions;
export const selectAllGroups = (state) => state.groups.groups;
