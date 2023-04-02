import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as UserActiveSvg } from '../assets/icons/graphics/User-Active.svg';
import { ReactComponent as UserNormalSvg } from '../assets/icons/graphics/User-Normal.svg';
import { ReactComponent as ChartNormalSvg } from '../assets/icons/graphics/Union-Normal.svg';
import { ReactComponent as ChartActiveSvg } from '../assets/icons/graphics/Union-Active.svg';
import { ReactComponent as SettingNormalSvg } from '../assets/icons/graphics/Setting-Normal.svg';
import { ReactComponent as SettingActiveSvg } from '../assets/icons/graphics/Setting-Active.svg';
import { ReactComponent as EyeShowSvg } from '../assets/icons/graphics/Eye-Show.svg';
import { ReactComponent as EyeHideSvg } from '../assets/icons/graphics/Eye-Hide.svg';

export const UserActive = (props) => <SvgIcon component={UserActiveSvg} {...props} sx={{ fontSize: 18 }} />;
export const UserNormal = (props) => <SvgIcon component={UserNormalSvg} {...props} sx={{ fontSize: 18 }} />;
export const ChartNormal = (props) => <SvgIcon component={ChartNormalSvg} {...props} sx={{ fontSize: 18 }} />;
export const ChartActive = (props) => <SvgIcon component={ChartActiveSvg} {...props} sx={{ fontSize: 18 }} />;
export const SettingNormal = (props) => <SvgIcon component={SettingNormalSvg} {...props} sx={{ fontSize: 18 }} />;
export const SettingActive = (props) => <SvgIcon component={SettingActiveSvg} {...props} sx={{ fontSize: 18 }} />;
export const EyeShow = (props) => <SvgIcon component={EyeShowSvg} {...props} />;
export const EyeHide = (props) => <SvgIcon component={EyeHideSvg} {...props} />;
