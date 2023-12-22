import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAsync } from './userInfoSlice';

export function UserInfo() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  return (
    userInfo.isAuthenticated && (
      <div>
        <div>email: {userInfo.email}</div>
        <div>{userInfo.isAuthenticated}</div>
        <div>{userInfo.name}</div>
        <button onClick={() => dispatch(logoutUserAsync())}>clear</button>
      </div>
    )
  );
}
