import { AuthGuard } from '@nestjs/passport/dist';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
