import Head from "next/head";
import { GetServerSideProps } from "next";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperinceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      // Recebemos do armazenamento cookies em string (converter para Number)
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};

// Back-end (Ruby)

// Next-js (Node.js) <-- camada intermediaria (constroi a pagina de interface do front-end) buscando dados no back=end (back-end virtual no applicativo/pagina) (Nao recomendavel acessar BD, email, servicos externos, etc) <getServerSideProps> <-- disponibiliza quais dados do Next(camada intermediaria) para o React (front-end) {Roda dentro do servidor node e Não no browser} NEXT surgiu por causa desta feature [Disponibiliza leitura dos search engines SE Otimization - buscadores ] nosso app solicita primeiro os dados externos e disponibiliza os dados dentro do getServerSideProps

// Front-end (React)
