import { useState } from 'react';
import OffCanvas from '../../components/header/OffCanvas';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <h1>Header</h1>
      <OffCanvas
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        setIsAuth={setIsAuth}
      />
    </>
  );
}

export default Header;
