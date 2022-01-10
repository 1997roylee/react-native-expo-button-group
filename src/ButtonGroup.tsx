// src/ButtonGroup.tsx

import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
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
    numColumns = 1,
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
      let isSelected: boolean = false;
      if (Array.isArray(currentIndex)) {
        isSelected = currentIndex.indexOf(index) > -1;
      } else {
        isSelected = currentIndex === index;
      }

      return (
        <ItemComponent
          label={item.label}
          isSelected={isSelected}
          onPress={() => onPress(index, item.value)}
        />
      );
    },
    [currentIndex, onPress]
  );

  return (
    <FlatList
      data={newData}
      horizontal={horizontal}
      numColumns={horizontal ? undefined : numColumns}
      keyExtractor={(_, index: number) => `ButtonGroupItem-${index}`}
      renderItem={renderItem}
    />
  );
}

export default React.memo(ButtonGroup);
