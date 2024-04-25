import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            This is the layout component
            <Outlet />
        </div>
    )
}

export default Layout;