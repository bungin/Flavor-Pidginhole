import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_LIKE, REMOVE_LIKE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const LikeButton = ({ recipeId }: any) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
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
                });
                setIsLiked(true);
                setLikeCount(likeCount + 1);
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
                });
                setIsLiked(false);
                setLikeCount(likeCount - 1);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            {!isLiked && <button onClick={handleLike}>Like this recipe!</button>}
            {isLiked && (
                <button onClick={handleRemoveLike}>Unlike this recipe!</button>
            )}
        </div>
    );
};

export default LikeButton;
