import { Link } from 'react-router-dom';
import { Box, Card, Button } from '@mui/material';
import styled from 'styled-components';
import media from '../../helpers/MediaQueries';

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.phone`
    padding: 32px;
  `}
  padding: 64px;
  max-height: 577px;
  max-width: 384px;
  width: 100%;
`;

export const LoginButton = styled(Button)``;

export const ForgotPassword = styled(Link)`
  margin-top: 32px;
  color: #2e459a;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

export const Image = styled.img`
  margin-bottom: 32;
`;
export const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: 41px;
  max-width: 256px;
  width: 100%;
`;

export const HeaderCard = styled.p`
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  color: #2e459a;
`;
