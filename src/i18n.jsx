import React, { createContext, useContext, useState, useEffect } from "react";

const LangCtx = createContext({ lang: "en", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
