import { isLoggedInVar } from '../lib/client/apolloVars'
import * as jwt from 'jsonwebtoken'
const PRIVATE_KEY = 'DFE73A4B7274C742'
export default function useIsLoggedIn(token: string | undefined) {
  if (token) {
    const verified = jwt.verify(token, PRIVATE_KEY)
    if (verified) {
      isLoggedInVar(true)
    }
  }
}
