import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_LIKE, REMOVE_LIKE } from "../../utils/mutations";

const LikeButton = ({ recipeId }: any) => {
    const [isLiked, setIsLiked] = useState(false);
    const [addLike] = useMutation(ADD_LIKE);
    const [removeLike] = useMutation(REMOVE_LIKE);

    const handleLike = async () => {
        try {
            await addLike({
                variables: { recipeId },
            });
            setIsLiked(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveLike = async () => {
        try {
            await removeLike({
                variables: { recipeId },
            });
            setIsLiked(false);
        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <div>
            {!isLiked && <button onClick={handleLike}>Like this recipe!</button>}
            {isLiked && <button onClick={handleRemoveLike}>Unlike this recipe!</button>}
        </div>
    );
};

export default LikeButton;
