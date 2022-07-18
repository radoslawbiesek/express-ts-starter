import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import usersService from '../users/services';
import { UserDto } from '../users/models';

async function validate(userData: UserDto) {
  const { email, password } = userData;

  const user = await usersService.getOne(email);

  const isValid = user && (await bcrypt.compare(password, user.password));

  if (isValid) {
    const token = jwt.sign(
      { email, userId: user.id },
      process.env.SECRET as string,
      { expiresIn: '8h' }
    );

    return {
      token,
    };
  }

  return null;
}

export default {
  validate,
};
