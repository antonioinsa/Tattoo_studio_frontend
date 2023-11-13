import { DateTimePicker } from '@mantine/dates';
import '@mantine/core/styles.css'

export const DateInput = () => {
  return (
    <DateTimePicker
      valueFormat="DD MMM YYYY hh:mm A"
      label="Pick date and time"
      placeholder="Pick date and time"
    />
  );
}