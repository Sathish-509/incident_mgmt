import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { CouchDbConfig, incidentDbName } from '@/config/couchDbconfig';
import { CouchDb } from '@teammaestro/node-couchdb-client';

const couchDb = new CouchDb(CouchDbConfig)
class AuthService {
  public users = userModel;

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: any }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const incidentrecord = await couchDb.findDocuments({
      dbName: incidentDbName,
      findOptions: {
          selector: {
            name: userData.userName
          }
      }
  });
    let record: any = {};
    if(incidentrecord.docs.length > 0) {
      record = incidentrecord.docs[0]
    }
    const isPasswordMatching: boolean = await compare(userData.password, record.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(record);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser: record };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = this.users.find(user => user.name === userData.name && user.name === userData.name);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
