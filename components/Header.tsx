import Link from "next/link";
import { HeaderContainer } from "../styles/header";

const Header = () => {
  return (
    <HeaderContainer>
      <Link href="/">Home</Link>
      <Link href="/three">Three.js</Link>
    </HeaderContainer>
  );
};

export default Header;
