import NotFound from "@/components/sheared/NotFound";
import NotFoundUser from "@/components/sheared/NotFoundUser";

const NotFoundPage = () => {
  const isDev = process.env.NODE_ENV === "production";



  return (
    <div>
      {isDev ? <NotFoundUser/> : <NotFound/> }
    </div>
  );
};

export default NotFoundPage;