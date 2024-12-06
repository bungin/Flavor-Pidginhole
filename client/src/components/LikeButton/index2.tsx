import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_LIKE, REMOVE_LIKE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

