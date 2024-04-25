// 账单相关的 store
import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: "bills",
    // 数据状态state
    initialState: {
        bills: [],
    },
    reducers: {
        // 同步修改方法
        setBills: (state, action) => {
            state.bills = action.payload;
        },
    },
});

// 解构actionCreate方法
const {setBills} = billStore.actions;
// 编写异步修改方法
const getBills = () => {
    return (dispatch) => {
        // 异步请求数据
        const res = axios.get('http://localhost:8888/ka')
        // 触发同步reducer方法
        dispatch(setBills(res.data));
    }
}

export {getBills}

const reducer = billStore.reducer

export default reducer;
