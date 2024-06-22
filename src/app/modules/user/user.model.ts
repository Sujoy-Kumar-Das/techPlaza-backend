import { Schema, model } from 'mongoose';
import { IFullName, IUser, IUserMethods } from './user.interface';

const fullNameSchema = new Schema<IFullName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required.'],
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<IUser, IUserMethods>({
  name: {
    type: fullNameSchema,
    required: [true, 'Name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  isPasswordChange: {
    type: Boolean,
    default: false,
  },
  lastPasswords: {
    type: [String],
    default: [],
  },
  lastPasswordChangeAt: {
    type: Date,
  },
  wrongPasswordAttempt: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    required: [true, 'Role is required.'],
    default: 'user',
  },
  status: {
    type: String,
    default: 'in-progress',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.isUserExists = async function (email: string) {
  return await userModel.findOne({ email });
};

export const userModel = model<IUser, IUserMethods>('user', userSchema);
