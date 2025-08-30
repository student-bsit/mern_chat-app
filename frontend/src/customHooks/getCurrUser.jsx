import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { setUserData, setLoading } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/currUser`, { withCredentials: true });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.error(error);
        dispatch(setLoading(false))
      }
    };

    fetchUser();
  }, []);
};

export default useGetCurrentUser;
