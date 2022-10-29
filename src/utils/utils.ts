import * as bcrypt from 'bcrypt';

export const isOwner = (userId: number, ownerId: number) => {
  return userId === ownerId;
};

export function comparePassword(password, user) {
  return bcrypt.compare(password, user.password).then((matched) => {
    if (!matched) {
      return null;
    }

    return user;
  });
}
