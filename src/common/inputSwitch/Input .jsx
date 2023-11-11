import { Switch } from '@mantine/core';
import '@mantine/core/styles.css'

export const ChoiceSwitch = () => {
  return (
    <Switch
      //defaultChecked
      color="blue"
      labelPosition="left"
      label="Are You a worker"
      font-color="red"
    />
  );
}