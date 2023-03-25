import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as UserActiveSvg } from '../assets/icons/graphics/User-Active.svg';
import { ReactComponent as UserNormalSvg } from '../assets/icons/graphics/User-Normal.svg';
import { ReactComponent as ChartNormalSvg } from '../assets/icons/graphics/Union-Normal.svg';
import { ReactComponent as ChartActiveSvg } from '../assets/icons/graphics/Union-Active.svg';

export const UserActive = (props) => <SvgIcon component={UserActiveSvg} {...props} />;
export const UserNormal = (props) => <SvgIcon component={UserNormalSvg} {...props} />;
export const ChartNormal = (props) => <SvgIcon component={ChartNormalSvg} {...props} />;
export const ChartActive = (props) => <SvgIcon component={ChartActiveSvg} {...props} />;
