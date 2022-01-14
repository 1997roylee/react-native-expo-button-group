// src/plugins/useMultiple.tsx

import { useMemo, useState, useCallback } from 'react';
// import xor from 'lodash/xor';
import without from 'lodash/without';
import { xor } from '../utils';

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
        origin: item,
      }));

      if (supportReset)
        newData.unshift({
          value: -1,
          label: resetLabel,
          origin: null,
        });

      return newData;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const index =
    defaultValue && Array.isArray(defaultValue)
      ? defaultValue?.reduce((sum: number[], item: any) => {
          const i: number = mappedData.findIndex(
            (row: any) => row.value === item
          );
          if (i > -1) sum.push(i);
          return sum;
        }, []) || []
      : [];

  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number[]>(index as number[]);

  // eslint-disable-next-line no-shadow
  const onPress = (index: number, value: any) => {
    // const startTime = (global as any).performance.now();
    if (supportReset && value === -1) {
      setCurrentIndex([0]);
      onChange([], [0]);
      setSelectedValue([]);
    } else {
      const newIndex = supportReset
        ? without(xor(currentIndex, index), 0)
        : xor(currentIndex, index);
      const newValue = newIndex.map((i: number) => mappedData[i].value);
      setCurrentIndex(newIndex);
      onChange(newValue, newIndex);
      setSelectedValue(newValue);
    }
    // console.log(
    //   `useMultiple: ${(global as any).performance.now() - startTime}ms`
    // );
  };

  return {
    data: mappedData,
    currentIndex,
    value: selectedValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onPress: useCallback(onPress, [currentIndex]),
  };
}

export default useMultiple;
