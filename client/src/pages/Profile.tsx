import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import Recipes from "../components/Recipe";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(user);
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }



  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        {/* User Info Box */}
        <div className="user-info-box">
          {/* <div className="profile-picture"> */}
            {/* Placeholder for profile picture */}
            {/* <img */}
              {/* src="/path/to/default-profile-pic.jpg" */}
              {/* alt={`${user?.username}'s profile`} */}
            {/* /> */}
          {/* </div> */}
          <h3>{user.displayName || user.username}</h3>
          <p>Pronouns: {user.pronouns?.join(", ") || "Not specified"}</p>
          <p>Bio: {user.bio?.join(" ") || "No bio available"}</p>
          <p>Location: {user.location?.join(", ") || "Not specified"}</p>
        </div>

        {/* Favorite Posts Box */}
        <div className="favorite-posts-box">
          <h4>Favorite Posts</h4>
          <ul>
            {user.favoritePosts?.length > 0 ? (
              user.favoritePosts.map((post: any, index: number) => (
                <li key={index}>{post.title}</li>
              ))
            ) : (
              <p>No favorite posts yet.</p>
            )}
          </ul>
        </div>
      </div>

      <div className="profile-content">
        <h2 className="profile-header">
          {`${user?.username}`}'s profile
        </h2>
        <div>
          {!userParam && (
            <div className="recipes-section">
              <Recipes recipes={user?.recipes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
