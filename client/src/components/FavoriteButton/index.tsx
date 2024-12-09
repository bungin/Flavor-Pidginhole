import { useMutation } from "@apollo/client";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_FAVORITES, QUERY_ME } from "../../utils/queries";

const FavoriteButton = ({ recipeId }: any) => {
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);
  const { data } = useQuery(QUERY_ME);

  const handleFavorite = async () => {
    if (!data?.me?._id) {
      console.log("You need to be logged in to like a recipe!");
      alert("You need to be logged in to like a recipe!");
    } else {
      try {
        await addFavorite({
          variables: { recipeId },
          refetchQueries: [{ query: QUERY_FAVORITES }],
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRemoveFavorite = async () => {
    if (!data?.me?._id) {
      console.log("You need to be logged in to like a recipe!");
      alert("You need to be logged in to like a recipe!");
    } else {
      try {
        await removeFavorite({
          variables: { recipeId },
          refetchQueries: [{ query: QUERY_FAVORITES }],
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
        {!data.me.favorites.find((l: any) => l._id === data?.me?._id) && <button onClick={handleFavorite}>Favorite!</button>}
        {data.me.favorites.find((l: any) => l._id === data?.me?._id) && <button onClick={handleRemoveFavorite}>Unfavorite!</button>}
    </div>
  )
};

export default FavoriteButton
