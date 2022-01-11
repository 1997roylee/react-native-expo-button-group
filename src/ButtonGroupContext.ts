// src/ButtonGroupContext.ts

import React from 'react';

export interface ButtonGroupContextProps {
  /**
   * The identifier value of the radio button. must be different than other RadioButtons in the same group
   */
  value?: string | number | boolean;
  /**
   * Invoked once when value changes, by selecting one of the radio buttons in the group
   */
  onPress: (index: number, value: any) => void;
}
export type RadioGroupContextPropTypes = ButtonGroupContextProps; //TODO: remove after ComponentPropTypes deprecation;

type PropTypes = ButtonGroupContextProps;

export default React.createContext<PropTypes>({
  value: undefined,
  onPress: () => {},
});
