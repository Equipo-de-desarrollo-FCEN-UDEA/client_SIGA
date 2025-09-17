import User from '../interfaces/user';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  hasRole: (roleName: string, academicUnitId?: string) => boolean;
  isAdmin: () => boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}