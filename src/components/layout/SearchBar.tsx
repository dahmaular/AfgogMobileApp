import {useCustomTheme} from '@/store/settings/theme/hook';
import CustomInput from './CustomInput';

const SearchBar = ({placeholder}: {placeholder: string}) => {
  const {
    colors: {
      bills: {
        input: {
          search: {icon},
        },
      },
    },
  } = useCustomTheme();
  return (
    <CustomInput
      placeholder={placeholder}
      icon={{right: {name: 'search', color: icon}}}
    />
  );
};

export default SearchBar;
