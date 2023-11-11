import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <PasswordInput
      radius="lg"
      label="Password"
      withAsterisk
      error="Invalid Password"
      placeholder="Input placeholder"
    />
  );
}