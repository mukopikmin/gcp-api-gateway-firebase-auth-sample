import { useRouter } from "next/router";
import { FC, createContext, useEffect, useState } from "react";
import firebaseUtil from "../utils/firebase";

type AuthContextProps = {
  currentUser: firebaseUtil.User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: FC = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<
    firebaseUtil.User | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAuthorized(false);

    firebaseUtil.auth().onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);

      user?.getIdTokenResult()?.then((result) => {
        const token = result?.token;

        if (token) {
          setAuthorized(true);
        }
      });
    });

    if (!authorized && !loading) {
      router.push("/");
    }
  }, [router.pathname]);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
