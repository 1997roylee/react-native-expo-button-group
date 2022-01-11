import * as React from 'react';
import { useCallback, Profiler } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import ButtonGroup, {
  asButtonGroupChild,
  useSingle,
  useMultiple,
} from '../../src/index';

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

const data = mockData(100);

const Item = asButtonGroupChild((props) => {
  const { isSelected, item, onPress } = props;
  const { label } = item;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.btn, isSelected ? styles.active : styles.inactive]}>
        <Text style={{ color: isSelected ? '#fff' : '#222' }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default function App() {
  // For single selection:
  // const [value, setValue] = React.useState<any | undefined>(3);

  // For multiple selection:
  const [value, setValue] = React.useState<string[] | number[]>([1, 3, 5]);
  const handleChange = useCallback((selectedValue: any, index: number) => {
    // console.log(index, selectedValue);
    setValue(selectedValue);
  }, []);

  const onRenderCallback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    console.log(
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions
    );
  };

  return (
    <SafeAreaView>
      <Text>{Array.isArray(value) ? value.join(',') : value}</Text>
      <Profiler id="MapMultipleButtonGroup" onRender={onRenderCallback}>
        <ButtonGroup
          data={data}
          ItemComponent={Item}
          valueAttribute="id"
          onChange={handleChange}
          defaultValue={value}
          method={useMultiple}
          supportReset={true}
          horizontal={true}
          numColumns={2}
        />
      </Profiler>
      <Profiler id="FlatMultipleButtonGroup" onRender={onRenderCallback}>
        <ButtonGroup
          data={data}
          ItemComponent={Item}
          valueAttribute="id"
          defaultValue={value}
          method={useMultiple}
          onChange={handleChange}
          supportReset={true}
          horizontal={true}
          numColumns={2}
          as="FlatList"
        />
      </Profiler>
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
