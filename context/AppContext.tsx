'use client'

import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    SetStateAction,
    useEffect,
    useMemo,
} from "react";
import { createAuthClient } from '../lib/auth';

const defaultValue = {
    identity: "",
    setIdentity: (): void => {},
};

export const IdentityContext = createContext<{
    identity: string;
    setIdentity: React.Dispatch<SetStateAction<string>>;
}>(defaultValue);

interface Props {
    children: ReactNode;
}

export const IdentityProvider = ({ children }: Props) => {
    const [identity, setIdentity] = useState("");
    const value = useMemo(() => ({ identity, setIdentity }), [identity]);

    useEffect(() => {
        createAuthClient()
            .then((authClient) => {
                const existingIdentity = authClient
                    .getIdentity()
                    .getPrincipal()
                    .toString();
                if(existingIdentity && existingIdentity !== "2vxsx-fae"){
                    setIdentity(existingIdentity);
                }
            })
        .catch((err) => console.log(err));
    }, [identity]);

    return (
        <IdentityContext.Provider value={value}>
            {useMemo(
                () => (
                    <>{children}</>
                ),
                [children]
            )}
        </IdentityContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useIdentity = () => useContext(IdentityContext);
{/*export const useIdentity = () => {
    return useContext(IdentityContext);
}*/}
console.log(useIdentity)
console.log(typeof useIdentity)