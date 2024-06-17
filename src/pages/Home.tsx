import SessionMenu from "../components/Session/SessionMenu";

const Home = () => {
  return (
    <div className="layout max-w-screen-lg flex flex-auto flex-col gap-12 items-center justify-center px-4 py-12 relative">
      
      <img src="/src/assets/logo.svg" alt="Logo onmangeou" className=" translate-x-[3%] w-2/4 sm:max-w-xs" />
      
      <span className="flex flex-col gap-3">
        <h1 className="h0 text-center">Découvrez votre prochain coup de 💜 culinaire</h1>
        <p className="text-center">Les meilleurs restaurants à proximité. Commencez votre aventure gastronomique dès maintenant !</p>
      </span>
      

      <SessionMenu />
      
    </div>
  );
};

export default Home;