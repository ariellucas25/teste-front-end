import styled from 'styled-components';
import logo from '../assets/images/logo.png';

function Header() {
  return (
    <StyledHeader>
      <StyledImage src={logo} alt="Logo Agrotis" />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  height: 20px;
`;

export default Header;
