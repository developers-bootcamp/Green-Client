import { Box, Button, FormControl, Paper, TextField } from '@mui/material';
import { PALLETE } from '../../config/config';
import styled from 'styled-components';

export const LoginContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
`;

export const LoginTitle = styled.p`
  margin-top: 0px;
`;

export const LoginSubtitle = styled.h4`
  margin-bottom: 10px;
`;

export const EmailInput = styled(TextField)`
  margin-bottom: 10px;
  width: 300px;
`;

export const PasswordFormControl = styled(FormControl)`
  margin-bottom: 10px;
  width: 300px;
`;

export const StyledButton = styled(Button)`
  background-color: ${PALLETE.YELLOW};
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  border-radius: 15px;
`;
