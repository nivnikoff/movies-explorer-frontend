import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
// import Portfolio from '../Portfolio';
// import Footer from ',,/Footer';

function Main() {
  return (
    <>
      <Header loggedIn = {false} />
      <main>
        <Promo/>
        <NavTab/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        {/* <Portfolio/> */}
      </main>
      {/* <Footer/> */}
    </>
  );
};
  
export default Main;
  