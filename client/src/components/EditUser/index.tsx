// We need to capture the NEW information from the user:
// handle the form as usual (useFormState)
// handle the submit (useMutation)
// handle the change in the textarea (useState)
// handle the change in an User input (useState)

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { UPDATE_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

export interface UserProps {
  displayName: string;
  pronouns: string;
  bio: string;
  location: string;
}

interface UserFormProps {
  onUserUpdate: () => void;
  existingUser: UserProps;
}

const UserForm: React.FC<UserFormProps> = ({ onUserUpdate, existingUser }) => {
  //State for the recipe text
  const [userProps, setUserProps] = useState<UserProps>({
    displayName: existingUser?.displayName?? "",
    pronouns: existingUser?.pronouns??"",
    bio: existingUser?.bio??"",
    location: existingUser?.location??"",
    
  });

  //Mutation Setup
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  //Function to handle the form submission
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await updateUser({
        variables: {
            ...userProps,
          },
        },
      );
      

      setUserProps({
        displayName: "",
        pronouns: "",
        bio: "",
        location: "",
      });
      
      onUserUpdate();

    } catch (err) {
      console.error(err);
    }
  };

  //Handle changes in User's Display Name
  const handleDisplayNameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserProps((prevState) => ({
      ...prevState,
      displayName: event.target.value,
    }));
  };

  //Handle changes in an Pronoun input
  const handlePronounChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserProps((prevState) => ({
      ...prevState,
      pronouns: event.target.value,
    }));
  };

  //Handle changes in an Bio input
  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserProps((prevState) => ({
      ...prevState,
      bio: event.target.value,
    }));
  };

  //Handle changes in location input
  const handleLocationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserProps((prevState) => ({
      ...prevState,
      location: event.target.value,
    }));
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            {/* Display Name */}
            <div className="col-12 col-lg-9">
              <textarea
                name="displayName"
                placeholder="Display Name"
                value={userProps.displayName}
                className="form-input w-100"
                style={{lineHeight: "1.5", resize: "vertical", minHeight: "50px"}}
                onChange={handleDisplayNameChange}
              ></textarea>
            </div>

            {/* Pronouns */}
            <div className="col-12 col-lg-9">
              <textarea
                name="pronouns"
                placeholder="What are your pronouns? (e.g., he/him, she/her, they/them)"
                value={userProps.pronouns}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical", minHeight: "50px"}}
                onChange={handlePronounChange}
              ></textarea>
            </div>

            {/* Bio */}
            <div className="col-12 col-lg-9">
              <textarea
                name="bio"
                placeholder="Tell us about yourself!"
                value={userProps.bio}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical", minHeight: "50px" }}
                onChange={handleBioChange}
              ></textarea>
            </div>

            {/* Location */}
            <div className="col-12 col-lg-9">
              <textarea
                name="location"
                placeholder="Where are you from?"
                value={userProps.location}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical", minHeight: "50px" }}
                onChange={handleLocationChange}
              ></textarea>
            </div>

            {/* Submit */}
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Update Profile
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message || "Something went wrong."}
              </div>
            )}
          </form>
        </>
      ) : (
        // If user is not logged in
        <p>
          You need to be logged in to update your Profile. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default UserForm;
