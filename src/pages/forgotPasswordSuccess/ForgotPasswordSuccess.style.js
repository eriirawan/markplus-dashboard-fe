import { Box, Card, Button } from '@mui/material';
import styled from 'styled-components';
import media from '@/helpers/MediaQueries';

export const Container = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const CardContainer = styled(Card)`
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
export const Image = styled.img`
  margin-bottom: 32;
  height: 63px;
  width: 99px;
  margin-bottom: 32px;
`;

export const HeaderCard = styled.p`
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

export const DescriptionCard = styled.p`
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

export const SendLinkButton = styled(Button)`
  max-width: 512px;
  width: 100%;
`;
