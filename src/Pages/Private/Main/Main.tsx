import { useNavs } from '../../../Contexts/Navs_Context'; 
import { Sidebar_Home } from '../../../Containers/Navs/Navigation_Home/Sidebar_Home/Sidebar_Home';
import Private_Routes from '../../../Routes/Private_Routes';
import './Main.scss';

const Main = () => {
  const { typeOfNavigation } = useNavs();

  function getNavClass(): string {
    switch (typeOfNavigation) {
      case "Sidebar_Home":
        return "Container_Sidebar_Home";
      case "Top_Nav_Navigation":
        return "Container_With_TopNav";
      case "Mobile_Menu":
        return "Container_With_MobileMenu";
      default:
        return "";
    }
  }

  return (
    <>
      <Sidebar_Home />

      <div className="Intri">
        <div className={getNavClass()}>
          <Private_Routes />  
        </div>
      </div>
    </>
  );
};

export default Main;