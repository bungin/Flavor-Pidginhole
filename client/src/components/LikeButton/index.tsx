import { useMutation } from "@apollo/client";
import { ADD_LIKE, REMOVE_LIKE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_RECIPES } from "../../utils/queries";

const LikeButton = ({ recipeId, recipeLikes }: any) => {
    const [addLike] = useMutation(ADD_LIKE);
    const [removeLike] = useMutation(REMOVE_LIKE);
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

    return (
        <div>
            {!recipeLikes.find((l: any) => l._id === data?.me?._id) && <button onClick={handleLike}>Like this recipe!</button>}
            {recipeLikes.find((l: any) => l._id === data?.me?._id) && (
                <button onClick={handleRemoveLike}>Unlike this recipe!</button>
            )} {recipeLikes.length}
        </div>
    );
};

export default LikeButton;
