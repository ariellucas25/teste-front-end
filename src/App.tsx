import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Formulario from './components/Formulario';
import theme from './agrotisTheme';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledDiv>  
        <Header/>
        <Formulario />
      </StyledDiv>
    </ThemeProvider>
  );
};

const StyledDiv = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  background-color: #F3F2F1; 
`;

export default App;