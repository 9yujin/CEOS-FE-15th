import { authState } from '../store/recoil';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';

// https://reactrouter.com/docs/en/v6/examples/auth
// 인증이 필요한 컴포넌트는 이 방식으로 접근을 제한합니다.
const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useRecoilValue(authState);

    if (!auth.init) {
        return <Navigate to="/login" state={{}} replace />;
    }

    return children;
};

export default RequireAuth;
