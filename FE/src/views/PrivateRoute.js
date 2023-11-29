import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
import { loginSuccess,logoutSuccess } from '../redux/authSlice';
import { useEffect, useState } from 'react';
//Component tạo một định tuyến an toàn, khi muốn truy cập các đường dẫn cần có xác thực thì phải đi qua route này
const PrivateRoute = ({
    roles,
}) => {
    const [auth, setAuth] = useState(null)
    let location = useLocation();
    const user = useSelector(state => state.auth.login?.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const verify = async () => {
            if (user) {
                /*const veri = await apiMain.verifyToken(user, dispatch, loginSuccess)
                if (veri?.status !== 200) {
                    toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại", { autoClose: 1000, pauseOnHover: false, hideProgressBar: true })
                    setAuth(false);
                }*/
                const tokenDecode = jwt_decode(user?.refreshToken)
                let date = new Date();
                if (tokenDecode.exp < date.getTime() / 1000) {
                    toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại")
                    setAuth(false);
                    dispatch(logoutSuccess())
                    return
                }
                console.log(user)
                const userHasRequiredRole = user.roles.some(role => roles.includes(role))
                if (!userHasRequiredRole) {
                    toast.warning("Bạn không có quyền truy cập", { autoClose: 1000, pauseOnHover: false, hideProgressBar: true })
                    setAuth(false);
                    return
                }

                setAuth(true)
            }
            else {
                toast.warning("Bạn chưa đăng nhập", { autoClose: 1000, pauseOnHover: false })
                setAuth(false)
                return <Navigate to="/" state={{ from: location }} />;
            }
        }
        verify()
    }, [])
    if (auth === null) return <></>
    return auth === true ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;

};

export default PrivateRoute;