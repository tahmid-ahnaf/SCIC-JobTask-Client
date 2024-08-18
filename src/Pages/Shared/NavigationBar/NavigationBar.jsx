import { useContext } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { AuthContext } from "../../../providers/AuthProvider";

const NavigationBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
      logOut()
          .then(() => { })
          .catch(error => console.log(error));
  }
  return (

    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Techworld</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        
        {
          user ? <>
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user.photoURL} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.displayName}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
        </Dropdown>
          </>
          :
          <Navbar.Collapse>
          <Navbar.Link href="/login">Sign In</Navbar.Link>
          </Navbar.Collapse>
        }
          
          
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;