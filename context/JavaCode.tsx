import { useState, useMemo, createContext, ReactNode } from "react";

export const CurrentJavaCode = createContext({
    plainText: '',
    code: '',
    setJavaCode: (data: string) => null,
    setPlainText: (data: string) => null
})

export default function JavaCodeContext({children}: {children: ReactNode}) {
    const [code, setCode] = useState('')
    const [plainText, setText] = useState('')

    const setJavaCode = (text: string) => {
        setCode(text)
        return null
    }

    const setPlainText = (text: string) => {
      setText(text)
      return null
    }

    const value = useMemo(() => ({ code, plainText, setJavaCode, setPlainText }), [plainText, code]);

    return (
        <CurrentJavaCode.Provider value={value}>
          {children}
        </CurrentJavaCode.Provider>
      );
}

