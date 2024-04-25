import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getBills} from "../../store/modules/billStore";

const Layout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBills())
    }, []);
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default Layout;