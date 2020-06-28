import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findbyEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ where: { email } });

    return user ?? null;
  }
}

export default UsersRepository;
