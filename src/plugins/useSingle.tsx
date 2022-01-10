// src/plugins/useSingle.tsx

import { useState, useCallback } from 'react';

interface IProps {
  data: any[];
  defaultValue?: any;
  valueAttribute: string;
  labelAttribute: string;
  onChange: (value: any, index: number) => void;
}

export type useSingle = (props: IProps) => {
  data: any[];
  currentIndex: number | undefined;
  value: string | undefined;
  onPress: (index: number, value: any) => void;
};

export default function useSingle(props: IProps) {
  const { data, defaultValue, valueAttribute, labelAttribute, onChange } =
    props;

  const mappedData = data.map((item: any) => ({
    value: item[valueAttribute],
    label: item[labelAttribute],
  }));

  const index = defaultValue
    ? mappedData.findIndex(
        (item: { value: number | string }) => item.value === defaultValue
      )
    : undefined;

  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    index && index > -1 ? mappedData[index].value : undefined
  );

  const [currentIndex, setCurrentIndex] = useState<number | undefined>(index);

  const onPress = (index: number, value: any) => {
    setCurrentIndex(index);
    setSelectedValue(value);
    onChange(value, index);
  };

  return {
    data: mappedData,
    currentIndex,
    value: selectedValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onPress: useCallback(onPress, []),
  };
}
