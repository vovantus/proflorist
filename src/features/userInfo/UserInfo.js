import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './userInfoSlice';

export function UserInfo() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  console.log(userInfo);
  return (
    userInfo.isAuthenticated && (
      <div>
        <div>email: {userInfo.email}</div>
        <div>{userInfo.isAuthenticated}</div>
        <div>{userInfo.name}</div>
        <button onClick={() => dispatch(logoutUser())}>clear</button>
      </div>
    )
  );
}
