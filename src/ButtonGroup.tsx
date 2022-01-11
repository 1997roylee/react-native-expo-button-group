// src/ButtonGroup.tsx

import React, { useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native';
import ButtonGroupContext from './ButtonGroupContext';
import type { useMultiple } from './plugins/useMultiple';
import type { useSingle } from './plugins/useSingle';

enum As {
  Map = 'Map',
  // eslint-disable-next-line no-shadow
  FlatList = 'FlatList',
}

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
  as?: As.Map | As.FlatList;
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
    as = As.Map,
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
          key={`${as}-ButtonGroupItem-${index}`}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (as === As.Map)
    return (
      <ButtonGroupContext.Provider value={{ value: currentIndex, onPress }}>
        <ScrollView scrollEventThrottle={200} horizontal={horizontal}>
          {newData.map((item: any, index: number) =>
            renderItem({ item, index })
          )}
        </ScrollView>
      </ButtonGroupContext.Provider>
    );
  else
    return (
      <ButtonGroupContext.Provider value={{ value: currentIndex, onPress }}>
        <FlatList
          data={newData}
          horizontal={horizontal}
          numColumns={horizontal ? undefined : numColumns}
          keyExtractor={(_, index: number) => `ButtonGroupItem-${index}`}
          renderItem={renderItem}
        />
      </ButtonGroupContext.Provider>
    );
}

export default React.memo(ButtonGroup);
