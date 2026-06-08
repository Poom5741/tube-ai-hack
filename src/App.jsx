import React from "react";
import { LangProvider } from "./i18n.jsx";
import { Nav, About, Objective } from "./components/story.jsx";
import { Hero } from "./components/hero.jsx";
import { Format, Journey, IdeaGenerator } from "./components/program.jsx";
import { Sponsors } from "./components/sponsor.jsx";
import { Prizes, Advisors, Contact } from "./components/closing.jsx";

export default function App() {
  return (
    <LangProvider>
    <React.Fragment>
      <Nav />
      <span id="top" />
      <Hero />
      <main>
        <About />
        <Objective />
        <Format />
        <Journey />
        <IdeaGenerator />
        <Sponsors />
        <Prizes />
        <Advisors />
        <Contact />
      </main>
    </React.Fragment>
    </LangProvider>
  );
}
