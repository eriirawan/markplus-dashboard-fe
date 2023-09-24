import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as UserActiveSvg } from '../assets/icons/graphics/User-Active.svg';
import { ReactComponent as UserNormalSvg } from '../assets/icons/graphics/User-Normal.svg';
import { ReactComponent as ChartNormalSvg } from '../assets/icons/graphics/Union-Normal.svg';
import { ReactComponent as ChartActiveSvg } from '../assets/icons/graphics/Union-Active.svg';
import { ReactComponent as SettingNormalSvg } from '../assets/icons/graphics/Setting-Normal.svg';
import { ReactComponent as SettingActiveSvg } from '../assets/icons/graphics/Setting-Active.svg';
import { ReactComponent as EyeShowSvg } from '../assets/icons/graphics/Eye-Show.svg';
import { ReactComponent as EyeHideSvg } from '../assets/icons/graphics/Eye-Hide.svg';

import { ReactComponent as DragIndicatorSvg } from '../assets/icons/graphics/Drag-Indicator.svg';
import { ReactComponent as ExportFilesSvg } from '../assets/icons/graphics/Export-Files.svg';
import { ReactComponent as GearSvg } from '../assets/icons/graphics/Gear.svg';
import { ReactComponent as ChevronDownRedSvg } from '../assets/icons/graphics/ChevronDownRed.svg';
import { ReactComponent as PickerColorSmallSvg } from '../assets/icons/graphics/Picker-Color-Small.svg';
import { ReactComponent as CloseSvg } from '../assets/icons/graphics/Close.svg';
import { ReactComponent as BarChartSvg } from '../assets/icons/graphics/Bar-Chart.svg';
import { ReactComponent as DeleteFillSvg } from '../assets/icons/graphics/Delete-Fill.svg';
import { ReactComponent as EditSvg } from '../assets/icons/graphics/Edit.svg';

export const UserActive = (props) => <SvgIcon component={UserActiveSvg} {...props} sx={{ fontSize: 18 }} />;
export const UserNormal = (props) => <SvgIcon component={UserNormalSvg} {...props} sx={{ fontSize: 18 }} />;
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
export const EditIcon = (props) => <SvgIcon component={EditSvg} {...props} sx={{ fontSize: 18 }} />;
