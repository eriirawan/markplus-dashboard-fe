import React from 'react';
import { Button, TextField, Card, Box } from '@mui/material';
import styled from 'styled-components';
import Logo from '../../assets/icons/graphics/Logo-Light.svg';
import { ChevronLeft } from '@mui/icons-material';
import media from '../../helpers/MediaQueries';

const ForgotPasswordSuccess = () => {
  return (
    <Container
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.lightMain,
      })}
    >
      <Box>
        <Button variant="text" startIcon={<ChevronLeft />} sx={{ maxWidth: '54px', marginBottom: '32px' }}>
          Back
        </Button>
        <CardContainer>
          <Image src={Logo}></Image>
          <HeaderCard>Successfully sent!</HeaderCard>
          <DesctiptionCard>
            Please check your email. Check your spam and promotions folder if it doesn't appear in your main mailbox.
          </DesctiptionCard>
          <SendLinkButton color="primary" variant="contained">
            Ok
          </SendLinkButton>
        </CardContainer>
      </Box>
    </Container>
  );
};
const Container = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 640px;
  ${media.phone`
    padding: 32px;
  `}
  padding: 64px;
  width: 100%;
`;
const Image = styled.img`
  margin-bottom: 32;
  height: 63px;
  width: 99px;
  margin-bottom: 32px;
`;

const HeaderCard = styled.p`
  ${media.phone`
    font-size: 24px;
    line-height: 31px;
  `}
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  color: #2e459a;
  margin-top: 0;
  margin-bottom: 16px;
`;

const DesctiptionCard = styled.p`
  ${media.phone`
    font-size: 12px;
    line-height: 18px;
  `}
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #000000;
  max-width: 512px;
  width: 100%;
  margin-top: 0;
  margin-bottom: 64px;
`;

const SendLinkButton = styled(Button)`
  max-width: 512px;
  width: 100%;
`;

export default ForgotPasswordSuccess;
