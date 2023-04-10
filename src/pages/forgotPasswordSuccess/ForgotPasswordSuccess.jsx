import React from 'react';
import { Button, Box } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import Logo from '@/assets/logo-light.png';

import {
  Container,
  CardContainer,
  Image,
  HeaderCard,
  DescriptionCard,
  SendLinkButton,
} from './ForgotPasswordSuccess.style';

const ForgotPasswordSuccess = () => (
  <Container
    sx={(theme) => ({
      backgroundColor: theme.palette.primary.lightMain,
    })}
  >
    <Box>
      <Button variant="text" startIcon={<ChevronLeft />} sx={{ marginBottom: '32px', maxWidth: '54px' }}>
        Back
      </Button>
      <CardContainer>
        <Image src={Logo} />
        <HeaderCard>Successfully sent!</HeaderCard>
        <DescriptionCard>
          {`Please check your email. Check your spam and promotions folder if it doesn't appear in your main mailbox.`}
        </DescriptionCard>
        <SendLinkButton color="primary" variant="contained">
          Ok
        </SendLinkButton>
      </CardContainer>
    </Box>
  </Container>
);

export default ForgotPasswordSuccess;
