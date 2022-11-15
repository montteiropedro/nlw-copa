import React, { createContext, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  
  // ! Remember to change the hardcoded client ID with a env variable
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '54762089048-5rogll5b1n2iis8fc83ckf1hl09sa8he.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();      
    }
    catch (error) {
      console.log(error);
      throw error;
    }
    finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log('\n-> Token de autenticação: ', access_token);
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
}
