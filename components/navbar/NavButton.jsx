import { Tooltip, Button, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

export const NavButton = ({Icon, tooltip}) => {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon color="blue" size="xl" radius="md" variant='light'>
        <div>{Icon}</div>
      </ActionIcon>
    </Tooltip>
  );
}

NavButton.defaultProps = {
  Icon: [<IconSettings size="22"/>],
  tooltip: "Tooltip"
}

export default NavButton