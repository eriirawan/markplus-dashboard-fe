import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as UserActiveSvg } from '../assets/icons/graphics/User-Active.svg';
import { ReactComponent as UserNormalSvg } from '../assets/icons/graphics/User-Normal.svg';
import { ReactComponent as ChartNormalSvg } from '../assets/icons/graphics/Union-Normal.svg';
import { ReactComponent as ChartActiveSvg } from '../assets/icons/graphics/Union-Active.svg';
import { ReactComponent as SettingNormalSvg } from '../assets/icons/graphics/Setting-Normal.svg';
import { ReactComponent as SettingActiveSvg } from '../assets/icons/graphics/Setting-Active.svg';
import { ReactComponent as EyeShowSvg } from '../assets/icons/graphics/Eye-Show.svg';
import { ReactComponent as EyeHideSvg } from '../assets/icons/graphics/Eye-Hide.svg';
import { ReactComponent as HomeActiveSvg } from '../assets/icons/graphics/Home-Active.svg';
import { ReactComponent as HomeNormalSvg } from '../assets/icons/graphics/Home-Normal.svg';
import { ReactComponent as ResultActiveSvg } from '../assets/icons/graphics/Result-Active.svg';
import { ReactComponent as ResultNormalSvg } from '../assets/icons/graphics/Result-Normal.svg';
import { ReactComponent as FieldWorkActiveSvg } from '../assets/icons/graphics/FieldWork-Active.svg';
import { ReactComponent as FieldWorkNormalSvg } from '../assets/icons/graphics/FieldWork-Normal.svg';
import { ReactComponent as EvidenceActiveSvg } from '../assets/icons/graphics/Evidence-Active.svg';
import { ReactComponent as EvidenceNormalSvg } from '../assets/icons/graphics/Evidence-Normal.svg';

import { ReactComponent as UploadSvg } from '../assets/icons/graphics/Upload.svg';
import { ReactComponent as DragIndicatorSvg } from '../assets/icons/graphics/Drag-Indicator.svg';
import { ReactComponent as ExportFilesSvg } from '../assets/icons/graphics/Export-Files.svg';
import { ReactComponent as GearSvg } from '../assets/icons/graphics/Gear.svg';
import { ReactComponent as ChevronDownRedSvg } from '../assets/icons/graphics/ChevronDownRed.svg';
import { ReactComponent as PickerColorSmallSvg } from '../assets/icons/graphics/Picker-Color-Small.svg';
import { ReactComponent as CloseSvg } from '../assets/icons/graphics/Close.svg';
import { ReactComponent as BarChartSvg } from '../assets/icons/graphics/Bar-Chart.svg';
import { ReactComponent as DeleteFillSvg } from '../assets/icons/graphics/Bar-Chart.svg';

export const HomeActive = (props) => (
  <SvgIcon component={HomeActiveSvg} viewBox="10 0 20 40" style={{ fill: 'primary.main' }} {...props} />
);
export const HomeNormal = (props) => <SvgIcon component={HomeNormalSvg} viewBox="10 0 20 40" {...props} />;
export const ResultActive = (props) => (
  <SvgIcon component={ResultActiveSvg} viewBox="10 0 20 40" style={{ fill: 'primary.main' }} {...props} />
);
export const ResultNormal = (props) => <SvgIcon component={ResultNormalSvg} viewBox="10 0 20 40" {...props} />;
export const FieldWorkActive = (props) => (
  <SvgIcon component={FieldWorkActiveSvg} viewBox="4 0 30 35" style={{ fill: 'primary.main' }} {...props} />
);
export const FieldWorkNormal = (props) => <SvgIcon component={FieldWorkNormalSvg} viewBox="4 0 30 35" {...props} />;
export const EvidenceActive = (props) => (
  <SvgIcon component={EvidenceActiveSvg} viewBox="4 0 30 35" style={{ fill: 'primary.main' }} {...props} />
);
export const EvidenceNormal = (props) => <SvgIcon component={EvidenceNormalSvg} viewBox="4 0 30 35" {...props} />;
export const UserActive = (props) => (
  <SvgIcon component={UserActiveSvg} viewBox="8 0 10 30" style={{ fill: 'primary.main' }} {...props} />
);
export const UserNormal = (props) => <SvgIcon component={UserNormalSvg} viewBox="8 0 10 30" {...props} />;
export const Upload = (props) => <SvgIcon component={UploadSvg} style={{ fill: 'primary.main' }} {...props} />;
export const ChartNormal = (props) => <SvgIcon component={ChartNormalSvg} {...props} sx={{ fontSize: 18 }} />;
export const ChartActive = (props) => <SvgIcon component={ChartActiveSvg} {...props} sx={{ fontSize: 18 }} />;
export const SettingNormal = (props) => <SvgIcon component={SettingNormalSvg} {...props} sx={{ fontSize: 18 }} />;
export const SettingActive = (props) => <SvgIcon component={SettingActiveSvg} {...props} sx={{ fontSize: 18 }} />;
export const EyeShow = (props) => <SvgIcon component={EyeShowSvg} {...props} />;
export const EyeHide = (props) => <SvgIcon component={EyeHideSvg} {...props} />;
export const DragIndicator = (props) => <SvgIcon component={DragIndicatorSvg} {...props} sx={{ fontSize: 18 }} />;
export const ExportFiles = (props) => <SvgIcon component={ExportFilesSvg} {...props} sx={{ fontSize: 18 }} />;
export const Gear = (props) => <SvgIcon component={GearSvg} {...props} sx={{ fontSize: 18 }} />;
export const ChevronDownRed = (props) => <SvgIcon component={ChevronDownRedSvg} {...props} sx={{ fontSize: 18 }} />;
export const PickerColorSmall = (props) => <SvgIcon component={PickerColorSmallSvg} {...props} sx={{ fontSize: 18 }} />;
export const Close = (props) => <SvgIcon component={CloseSvg} viewBox="0 0 30 24" {...props} />;
export const BarChartIcon = (props) => <SvgIcon component={BarChartSvg} viewBox="0 0 28 19" {...props} />;
export const DeleteFill = (props) => <SvgIcon component={DeleteFillSvg} {...props} />;
