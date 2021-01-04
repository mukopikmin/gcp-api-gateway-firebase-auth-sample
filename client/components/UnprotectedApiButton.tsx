import { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import BookList from "./BookList";

const UnprotectedApiButton = () => {
  const [books, setBooks] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const callUnprotectedApi = async () => {
    const url = `${process.env.API_ENDPOINT}/unprotected`;
    const token = await currentUser?.getIdToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, { headers });
      const body = await response.json();

      setBooks(body);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div>
      <button className="btn btn-outline-danger" onClick={callUnprotectedApi}>
        Unprotected API
      </button>
      <BookList books={books} />
    </div>
  );
};

export default UnprotectedApiButton;
