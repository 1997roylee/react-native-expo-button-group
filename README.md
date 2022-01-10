# react-native-expo-button-group

button group

## Installation

```sh
npm install react-native-expo-button-group
```

## Usage

```js
import * as React from 'react';
import { useCallback } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import ButtonGroup, { useSingle, useMultiple } from 'react-native-expo-button-group';

const mockData = (size: number) => {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push({
      id: i,
      label: `Item ${i}`,
    });
  }
  return data;
};

const data = mockData(10);

function Item(props) {
  const { isSelected, label, onPress } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.btn, isSelected ? styles.active : styles.inactive]}>
        <Text style={{ color: isSelected ? '#fff' : '#222' }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default function App() {
  // For single selection:
  // const [value, setValue] = React.useState<any | undefined>(3);

  // For multiple selection:
  const [value, setValue] = React.useState<string[] | number[]>([1, 3, 5]);
  const handleChange = useCallback((selectedValue: any, index: number) => {
    // console.log(index, selectedValue);
    setValue(selectedValue);
  }, []);

  return (
    <SafeAreaView>
      <Text>{Array.isArray(value)? value.join(','): value}</Text>
      <ButtonGroup
        data={data}
        ItemComponent={Item}
        valueAttribute="id"
        onChange={handleChange}
        defaultValue={value}
        method={useMultiple}
        supportReset={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    margin: 4,
  },
  inactive: {
    borderColor: '#222',
    color: '#222',
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: '#222',
    color: '#fff',
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
