export type HomeInfoRowPropsType = {
  title: string;
  iconName?: string;
  isInfoAUnit: boolean;
  info: string | number | { text: string; color: string };
  optionalInfo?: string | number;
  text: string;
  optionalText?: string;
};
