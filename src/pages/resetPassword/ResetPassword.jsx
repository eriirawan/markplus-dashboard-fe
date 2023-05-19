import { Box, Button, Card, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo-light.png';
import media from '../../helpers/MediaQueries';

const ResetPassword = () => (
  <Container
    sx={(theme) => ({
      backgroundColor: theme.palette.primary.lightMain,
    })}
  >
    <CardContainer>
      <Image src={Logo} />
      <HeaderCard>Update Password</HeaderCard>
      <Form>
        <NewPassword
          size="small"
          label="New password"
          placeholder="Your new password"
          InputProps={{
            style: {
              height: '44px',
              textAlign: 'center',
            },
          }}
          sx={(theme) => ({
            '& .Mui-focused': {
              color: theme.palette.primary.lightBlue,
            },
          })}
        />
        <ConfrimPassword
          size="small"
          label="Confrim password"
          placeholder="Retype your new password"
          InputProps={{
            style: {
              height: '44px',
              textAlign: 'center',
            },
          }}
          sx={(theme) => ({
            '& .Mui-focused': {
              color: theme.palette.primary.lightBlue,
            },
          })}
        />

        <ButtonSetPassword color="primary" variant="contained">
          Set new password
        </ButtonSetPassword>
      </Form>
    </CardContainer>
  </Container>
);

export default ResetPassword;

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.phone`
    padding: 32px;
    `}
  padding: 64px;
`;
const Image = styled.img`
  margin-bottom: 32px;
`;
const HeaderCard = styled.p`
  ${media.phone`
    font-size: 24px;
    line-height: 31px;
    `}
  font-weight: 700;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  color: #2e459a;
  margin-top: 0;
  margin-bottom: 41px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 256px;
  width: 100%;
`;

const NewPassword = styled(TextField)`
  margin-bottom: 41px !important;
  max-width: 256px;
  width: 100%;
`;

const ConfrimPassword = styled(TextField)`
  max-width: 256px;
  width: 100%;
  margin-bottom: 51px !important;
`;

const ButtonSetPassword = styled(Button)`
  max-width: 256px;
  width: 100%;
`;
