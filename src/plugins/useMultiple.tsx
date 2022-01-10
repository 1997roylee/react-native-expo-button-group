// src/plugins/useMultiple.tsx

import { useMemo, useState, useCallback } from 'react';
import xor from 'lodash/xor';
import without from 'lodash/without';

interface IProps {
  data: any[];
  defaultValue?: any[];
  valueAttribute: string;
  labelAttribute: string;
  onChange: (value: any[], index: number[]) => void;
  supportReset?: boolean;
  resetLabel?: string;
}

export type useMultiple = (props: IProps) => {
  data: any[];
  currentIndex: number | undefined;
  value: string | undefined;
  onPress: (index: number, value: any) => void;
};

function useMultiple(props: IProps) {
  const {
    data,
    defaultValue,
    valueAttribute,
    labelAttribute,
    onChange,
    supportReset,
    resetLabel,
  } = props;

  const mappedData = useMemo(
    () => {
      const newData = data.map((item: any) => ({
        value: item[valueAttribute],
        label: item[labelAttribute],
      }));

      if (supportReset)
        newData.unshift({
          value: -1,
          label: resetLabel,
        });

      return newData;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const index =
    defaultValue?.filter((item: any) => {
      return mappedData.findIndex((row: any) => row.value === item) > -1;
    }) || [];

  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number[]>(index as number[]);

  const onPress = (index: number, value: any) => {
    if (supportReset && value === -1) {
      setSelectedValue([]);
      setCurrentIndex([0]);
      onChange([], [0]);
    } else {
      const newIndex = without(xor(currentIndex, [index]), 0);
      const newValue = newIndex.map((i: number) => mappedData[i].value);

      setCurrentIndex(newIndex);
      setSelectedValue(newValue);
      onChange(newValue, newIndex);
    }
  };

  return {
    data: mappedData,
    currentIndex,
    value: selectedValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onPress: useCallback(onPress, [currentIndex, selectedValue]),
  };
}

export default useMultiple;
