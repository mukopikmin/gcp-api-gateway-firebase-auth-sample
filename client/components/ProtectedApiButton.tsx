import { useContext, useState } from "react";
import { Book } from "../utils/book";
import { AuthContext } from "./Auth";
import BookList from "./BookList";
import ErrorMessage from "./ErrorMessage";

const ProtectedApiButton = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext);
  const callProtectedApi = async () => {
    const url = `${process.env.API_ENDPOINT}/protected`;
    const token = await currentUser?.getIdToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, { headers });
      const body = await response.json();

      setBooks(body);
      setError(null);
    } catch (error) {
      setBooks([]);
      setError(error.message);
    }
  };

  return (
    <div>
      <button className="btn btn-outline-success" onClick={callProtectedApi}>
        Protected API
      </button>
      <ErrorMessage message={error} />
      <BookList books={books} />
    </div>
  );
};

export default ProtectedApiButton;
