import { User } from "../utils/user";

const UserDetail = (props: { user: User | null }) => {
  if (props.user) {
    return (
      <ul>
        <li>Name: {props.user.name}</li>
        <li>Email: {props.user.email}</li>
      </ul>
    );
  }

  return <ul></ul>;
};

export default UserDetail;
