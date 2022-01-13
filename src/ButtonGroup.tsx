// src/ButtonGroup.tsx

import React, { useCallback } from 'react';
import { VirtualizedList } from 'react-native';
import ButtonGroupContext from './ButtonGroupContext';
import type { useMultiple } from './plugins/useMultiple';
import type { useSingle } from './plugins/useSingle';

interface IButtonGroupProps {
  data: any[];
  defaultValue?: any | any[];
  valueAttribute?: string;
  labelAttribute?: string;
  ItemComponent: any;
  onChange: (value: any | any[], index: number | number[]) => void;
  method: useMultiple | useSingle;
  supportReset?: boolean;
  resetLabel?: string;
  horizontal?: boolean;
  numColumns?: number;
}

function ButtonGroup(props: IButtonGroupProps) {
  const {
    data,
    ItemComponent,
    onChange,
    method,
    defaultValue,
    horizontal = false,
    valueAttribute = 'value',
    labelAttribute = 'label',
    supportReset = false,
    resetLabel = 'Reset',
  } = props;

  const {
    data: newData,
    currentIndex,
    onPress,
  } = method({
    data,
    valueAttribute,
    labelAttribute,
    defaultValue,
    onChange,
    supportReset,
    resetLabel,
  });

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <ItemComponent
          item={item}
          index={index}
          key={`ButtonGroupItem-${index}`}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ButtonGroupContext.Provider value={{ value: currentIndex, onPress }}>
      <VirtualizedList
        data={newData}
        horizontal={horizontal}
        getItem={(data: any, index: number) => data[index]}
        getItemCount={() => newData.length}
        keyExtractor={(_, index: number) => `ButtonGroupItem-${index}`}
        renderItem={renderItem}
      />
    </ButtonGroupContext.Provider>
  );
}

export default React.memo(ButtonGroup);
