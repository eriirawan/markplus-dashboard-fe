import React from 'react';
import { Button, Box } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/logo-light.png';

import {
  Container,
  CardContainer,
  Image,
  HeaderCard,
  DescriptionCard,
  SendLinkButton,
} from './ForgotPasswordSuccess.style';

const ForgotPasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.lightMain,
      })}
    >
      <Box>
        <Button
          variant="text"
          startIcon={<ChevronLeft />}
          sx={{ marginBottom: '32px', maxWidth: '54px' }}
          onClick={() => navigate('/login', { replace: true })}
        >
          Back
        </Button>
        <CardContainer>
          <Image src={Logo} />
          <HeaderCard>Successfully sent!</HeaderCard>
          <DescriptionCard>
            {`Please check your email. Check your spam and promotions folder if it does not appear in your main mailbox.`}
          </DescriptionCard>
          <SendLinkButton color="primary" variant="contained" onClick={() => navigate('/login', { replace: true })}>
            OK
          </SendLinkButton>
        </CardContainer>
      </Box>
    </Container>
  );
};

export default ForgotPasswordSuccess;
