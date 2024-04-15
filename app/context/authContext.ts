// Currently not is use. 
// we use the session cookie

import { createContext } from "react";

interface BackendAddr {
    aw_server_endpoint: string;
    aw_projectId: string;
    databaseID: string;
}

export const AuthContext = createContext<{
    authStatus: boolean;
    setAuthStatus: (status: boolean) => void;
    backendAddr: BackendAddr;
}>({
    authStatus: false,
    setAuthStatus: () => { },
    backendAddr: {
        aw_server_endpoint: "",
        aw_projectId: "",
        databaseID: ""
    }
});

export const AuthProvider = AuthContext.Provider;

export type { BackendAddr }
export default AuthContext;