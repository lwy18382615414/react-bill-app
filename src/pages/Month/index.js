import './index.scss'
import {DatePicker, NavBar} from "antd-mobile";
import {useMemo, useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from "lodash";


const Month = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [chooseDate, setChooseDate] = useState(() => dayjs().format('YYYY | MM'));
    const [currentMonthList, setCurrentMonthList] = useState([]);
    const billList = useSelector(state => state.bill.bills)

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, bill => dayjs(bill.date).format('YYYY | MM'))
    }, [billList])

    function onChooseDate() {
        setShowDatePicker(true)
    }

    function confirmDate(value) {
        setShowDatePicker(false);
        const currentDate = dayjs(value).format('YYYY | MM');
        setChooseDate(currentDate);
        setCurrentMonthList(monthGroup[currentDate] || []);
    }

    const monthBill = useMemo(() => {
        const pay = currentMonthList.filter(bill => bill.type === 'pay').reduce((acc, bill) => acc + bill.money, 0) ?? 0;
        const income = currentMonthList.filter(bill => bill.type === 'income').reduce((acc, bill) => acc + bill.money, 0) ?? 0;
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList]);

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
                            <span className="money">{monthBill.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthBill.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthBill.total.toFixed(2)}</span>
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