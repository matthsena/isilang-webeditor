import { useState, useMemo, createContext, ReactNode } from "react";

export const CurrentJavaCode = createContext({
    code: '',
    setJavaCode: (data: string) => null
})

export default function JavaCodeContext({children}: {children: ReactNode}) {
    const [code, setCode] = useState('')

    const setJavaCode = (text: string) => {
        setCode(text)
        return null
    }

    const value = useMemo(() => ({ code, setJavaCode }), [code]);

    return (
        <CurrentJavaCode.Provider value={value}>
          {children}
        </CurrentJavaCode.Provider>
      );
}

