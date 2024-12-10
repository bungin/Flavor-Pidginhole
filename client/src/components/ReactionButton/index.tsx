import { useMutation } from "@apollo/client";
import {
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_RECIPES } from "../../utils/queries";

const ReactionButton = ({ recipe, mode, data }: any) => {
  const [addLike] = useMutation(ADD_LIKE);
  const [removeLike] = useMutation(REMOVE_LIKE);
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);
  const { data: userData } = useQuery(QUERY_ME);
  const recipeId = recipe._id;
  const userId = userData?.me?._id ?? "";
    if (!data) {
      data = userData?.me?.favorites
      console.log(userData?.me?.favorites)
    }
  // nullish coalescing operator "??"

  const handleReaction = async () => {
    if (!userId) {
      console.log("You need to be logged in to like a recipe!");
      alert("You need to be logged in to like a recipe!");
      return;
    }
    try {
      switch (mode) {
        case "like":
          await addLike({
            variables: { recipeId, userId },
            refetchQueries: [{ query: QUERY_RECIPES }],
          });
          break;
        case "favorite":
          await addFavorite({
            variables: { recipeId },
            refetchQueries: [{ query: QUERY_ME }, {query: QUERY_RECIPES} ],
          });
          break;
        default:
          console.error("Invalid mode");
          alert("Unsupported Action!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveReaction = async () => {
    if (!userId) {
      console.log("You need to be logged in to like a recipe!");
      alert("You need to be logged in to like a recipe!");
      return;
    }
    try {
      switch (mode) {
        case "like":
          await removeLike({
            variables: { recipeId },
            refetchQueries: [{ query: QUERY_RECIPES }],
          });
          break;
        case "favorite":
          await removeFavorite({
            variables: { recipeId },
            refetchQueries: [{ query: QUERY_ME }, {query: QUERY_RECIPES }],
          });
          break;
        default:
          console.error("Invalid mode");
          alert("Unsupported Action!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const Button = () => {
    return data?.find((l: any) => l._id === userId) || data?.find((l: any) => l._id === recipe._id) ? 
    <button onClick={handleRemoveReaction}>{mode === 'like' ? 'Unlike' : 'Unfavorite' } this recipe!</button>
    :
    <button onClick={handleReaction}>{mode === 'like' ? 'Like' : 'Favorite' } this recipe!</button>
  }

  return (
      <div>
        <Button/>
      </div>
  );
};

export default ReactionButton;
