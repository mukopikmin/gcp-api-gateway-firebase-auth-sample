import { useContext, useState } from "react";
import { User } from "../utils/user";
import { AuthContext } from "./Auth";
import ErrorMessage from "./ErrorMessage";
import UserDetail from "./UserDetail";

const MirrorApiButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const callMirrorApi = async () => {
    const url = `${process.env.API_ENDPOINT}/mirror`;
    const token = await currentUser?.getIdToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, { headers });
      const body: User = await response.json();

      setUser(body);
      setError(null);
    } catch (error) {
      setUser(null);
      setError(error.message);
    }
  };

  return (
    <div>
      <button className="btn btn-outline-info" onClick={callMirrorApi}>
        Mirror API
      </button>
      <ErrorMessage message={error} />
      <UserDetail user={user} />
    </div>
  );
};

export default MirrorApiButton;
