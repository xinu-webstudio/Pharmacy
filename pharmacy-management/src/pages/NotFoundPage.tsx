import { Link } from "react-router-dom";
import { FrontendRoutes } from "../routes/FrontendRoutes";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to={FrontendRoutes.HOME}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
