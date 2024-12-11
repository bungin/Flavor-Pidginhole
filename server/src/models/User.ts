import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  pronouns?: string;
  bio?: string;
  location?: string;
  recipes: Schema.Types.ObjectId[];
  favorites: Schema.Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    displayName: {
      type: String,
      required: false,
    },
    pronouns: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
