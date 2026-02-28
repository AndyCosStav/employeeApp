import 'express'

declare global {
  namespace Express {
    interface UserPayload {
      sub: string
      email: string
      role: string
    }

    interface Request {
      user?: UserPayload
    }
  }
}

export {}