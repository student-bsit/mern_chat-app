import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setLoading, setOtherUsers } from "../redux/userSlice";

const useGetOthertUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getUsers`, { withCredentials: true });
        dispatch(setOtherUsers(result.data));
      } catch (error) {
        console.error(error);
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [userData]);
};

export default useGetOthertUsers;
