import { Switch } from '@mantine/core';
import '@mantine/core/styles.css'

export const ChoiceSwitch = ({checked, functionChange}) => {
  return (
    <Switch
      //defaultChecked
      color="blue"
      labelPosition="left"
      label="Are You a worker"
      onChange={(e)=>functionChange(e)}
    />
  );
}