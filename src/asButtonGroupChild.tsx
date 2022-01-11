// src/asButtonGroupChild.tsx
import React from 'react';
import ButtonGroupContext from './ButtonGroupContext';

const isSelected = (currentIndex: any[] | any, index: number[] | number) => {
  if (Array.isArray(currentIndex)) {
    return currentIndex.indexOf(index) > -1;
  } else {
    return currentIndex === index;
  }
};

interface IProps {
  index: number;
  item: any;
}

export default function asButtonGroupChild(
  WrappedComponent: React.ComponentType<any>
) {
  return (props: IProps) => {
    const { index, item } = props;
    return (
      <ButtonGroupContext.Consumer>
        {({ value, onPress }) => (
          <WrappedComponent
            {...props}
            isSelected={isSelected(value, index)}
            onPress={() => onPress(index, item.value)}
          />
        )}
      </ButtonGroupContext.Consumer>
    );
  };
}
