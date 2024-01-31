import React from 'react';

export type MenuRowPropsType = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  localStorageName: string;
  title: string;
  leftinfo: string;
  rightinfo: string;
};
