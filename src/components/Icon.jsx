import * as icons from '@mui/icons-material';
import * as mPlusIcon from '../helpers/Icons';

export const MPlusIcon = ({ name = 'MoneyBag', ...props }) => {
  const mergedIcons = { ...icons, ...mPlusIcon };
  const Icon = mergedIcons[name];

  return <Icon {...props} />;
};

export default MPlusIcon;
