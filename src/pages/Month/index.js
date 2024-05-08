import './index.scss'
import {DatePicker, NavBar} from "antd-mobile";
import {useMemo, useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from "lodash";


const Month = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [chooseDate, setChooseDate] = useState(() => dayjs().format('YYYY | MM'));

    function onChooseDate() {
        setShowDatePicker(true)
    }

    function confirmDate(value) {
        setShowDatePicker(false)
        setChooseDate(dayjs(value).format('YYYY | MM'))
    }

    const billList = useSelector(state => state.bill.bills)

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, bill => dayjs(bill.date).format('YYYY | MM'))
    }, [billList])

    console.log(monthGroup)
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>月度收支</NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => onChooseDate()}>
                        <span className="text">
                            {chooseDate}账单
                    </span>
                        <span className={showDatePicker ? "arrow expand" : "arrow"}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{100}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={showDatePicker}
                        onCancel={() => setShowDatePicker(false)}
                        onConfirm={(val) => confirmDate(val)}
                        max={new Date()}
                    />
                </div>
            </div>
        </div>
    );
};

export default Month;