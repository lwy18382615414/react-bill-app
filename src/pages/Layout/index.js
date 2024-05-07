import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getBills} from "../../store/modules/billStore";
import {TabBar} from "antd-mobile";
import {AddCircleOutline, BillOutline, CalculatorOutline} from 'antd-mobile-icons'
import "./index.scss";

const Layout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBills())
    }, []);

    const tabs = [
        {
            key: '/',
            title: '月度账单',
            icon: <BillOutline/>,
        },
        {
            key: '/new',
            title: '记账',
            icon: <AddCircleOutline/>,
        },
        {
            key: '/year',
            title: '年度账单',
            icon: <CalculatorOutline/>,
        },
    ]

    const navigate = useNavigate();
    const switchTab = (path) => {
        navigate(path)
    }
    return (
        <div className="layout">
            <div className="container">
                <Outlet/>
            </div>
            <div className="foot-bar">
                <TabBar onChange={switchTab}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout;