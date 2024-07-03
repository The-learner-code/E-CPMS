import styled from 'styled-components';
import LR from '../Assets/capture.jpg';

// Color variables
const colors = {
  primary: '#003366', // Navy Blue for primary actions
  secondary: '#f5deb3', // Beige for secondary actions
  background: '#f5f5f5', // Light grey background for container
  overlayBackground: '#002244', // Dark Blue for overlay
  buttonText: '#ffffff', // White text for buttons
  linkText: '#003366', // Navy Blue for links
  inputBackground: '#f5f5dc', // Light Beige for input background
};

// Body container
export const Body = styled.div`
  width: 100%;
  min-height: 100vh; 
  background: linear-gradient(135deg, rgba(225, 185, 65, 0.3), rgba(225, 185, 65, 0.3)), url(${LR});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

// Container for the whole component
export const Container = styled.div`
  background-color: ${colors.background};
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 750px;
  max-width: 100%;
  min-height: 400px;
`;

// Container for the Sign Up form
export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
`;

// Container for the Sign In form
export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

// Form styling
export const Form = styled.form`
  background-color: ${colors.buttonText};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

// Title styling
export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

// Input field styling
export const Input = styled.input`
  background-color: ${colors.inputBackground};
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

// Back Button
export const BackButton = styled.button`
  width: 80px;
  height: 40px;
  position: absolute;
  top: 25px;
  right: 35px;
  font-size: 14px;
  font-weight: bold;
  background: ${colors.background};
  border-radius: 20px;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: transform 80ms ease-in;
    &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover{
  background: ${colors.primary};
  color: ${colors.buttonText};
  }
`;

// Button styling
export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid ${colors.secondary};
  background: ${colors.primary};
  color: ${colors.buttonText};
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

// Ghost button styling
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: ${colors.buttonText};
`;

// Anchor (link) styling
export const Anchor = styled.a`
  color: ${colors.linkText};
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

// Container for the overlay
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props => props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

// Overlay styling
export const Overlay = styled.div`
  background-color: ${colors.overlayBackground};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: ${colors.buttonText};
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

// Panel styling inside the overlay
export const OverlayPanel = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

// Left panel styling inside the overlay
export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

// Right panel styling inside the overlay
export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 15px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

// Checkbox label styling
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${colors.primary};
  cursor: pointer;

  input[type="checkbox"] {
    margin-right: 5px;
  }
`;