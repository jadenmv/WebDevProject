import { Link } from "react-router-dom";
import { CircleUser } from "lucide-react";

export default function AccountButton() {
  return (
    <div>
      {/* if logged out: */}
      <Link
        to="/auth"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded transition-all"
      >
        Login
      </Link>

      {/* if logged in: */}
      {false && (
        <Link to={`/account/${userId}`}>
          <CircleUser />
        </Link>
      )}
    </div>
  );
}

{/* <Link to={`/account/${userId}`}> */}
{/*   <CircleUser /> */}
{/* </Link>; */}
