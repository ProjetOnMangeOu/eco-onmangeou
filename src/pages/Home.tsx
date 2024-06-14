import SessionMenu from "../components/Session/SessionMenu";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Bienvenue sur la page d'accueil</h1>
          <SessionMenu />
    </div>
  );
};

export default Home;