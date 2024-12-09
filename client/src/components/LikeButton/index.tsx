import { useMutation } from "@apollo/client";
import {
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_RECIPES, QUERY_FAVORITES } from "../../utils/queries";

const LikeButton = ({ recipeId, recipeLikes, favorites }: any) => {
  const [addLike] = useMutation(ADD_LIKE);
  const [removeLike] = useMutation(REMOVE_LIKE);
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);
  const { data } = useQuery(QUERY_ME);

  const handleLike = async () => {
    if (!data?.me?._id) {
      console.log("You need to be logged in to like a recipe!");
      alert("You need to be logged in to like a recipe!");
    } else {
      const userId = data.me._id;
      try {
        await addLike({
          variables: { recipeId, userId },
          refetchQueries: [{ query: QUERY_RECIPES }],
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRemoveLike = async () => {
    if (data?.me?._id) {
      const userId = data.me._id;
      try {
        await removeLike({
          variables: { recipeId, userId },
          refetchQueries: [{ query: QUERY_RECIPES }],
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFavorite = async () => {
    if (!data?.me?._id) {
      console.log("You need to be logged in to like a recipe!");
      alert("You need to be logged in to like a recipe!");
    } else {
      const userId = data.me._id;
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
      const userId = data.me._id;
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
    <>
      <div>
        {!recipeLikes.find((l: any) => l._id === data?.me?._id) && (
          <button onClick={handleLike}>Like this recipe!</button>
        )}
        {recipeLikes.find((l: any) => l._id === data?.me?._id) && (
          <button onClick={handleRemoveLike}>Unlike this recipe!</button>
        )}{" "}
        {recipeLikes.length}
      </div>
      <div>
        {!favorites?.find((l: any) => l._id === data?.me?._id) && (
          <button onClick={handleFavorite}>Favorite!</button>
        )}
        {favorites?.find((l: any) => l._id === data?.me?._id) && (
          <button onClick={handleRemoveFavorite}>Unfavorite!</button>
        )}
      </div>
    </>
  );
};

export default LikeButton;
