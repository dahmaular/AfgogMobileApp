import CustomText from './CustomText';

const ErrorText = ({error, touched}: {error: string; touched: boolean}) => {
  // const {fonts} = useCustomTheme();
  return error && touched ? (
    <CustomText
      style={{
        color: '#C73E10',
        fontFamily: 'Inter-Regualr',
        fontSize: 14,
        fontWeight: '600' as '600',
        lineHeight: 19.1,
      }}>
      {error}
    </CustomText>
  ) : (
    <></>
  );
};
export default ErrorText;
