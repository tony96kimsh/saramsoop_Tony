export interface User {
  username: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export interface JwtPayload {
  username: string;
  role: string;
  exp: number; // UNIX timestamp (seconds)
}