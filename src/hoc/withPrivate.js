/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useUser } from "src/hooks";

export default function withPrivate(Component) {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const { user } = useUser();

      if (!user) {
        Router.replace("/");
        return null;
      }

      return <Component {...props} />;
    }
    // If we are on server, return null
    return null;
  };
}
