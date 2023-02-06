import { Tooltip, Button, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

export const NavButton = ({icon, tooltip}) => {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon color="blue" size="xl" radius="md" variant='light'>
        <div>{icon}</div>
      </ActionIcon>
    </Tooltip>
  );
}

NavButton.defaultProps = {
  icon: <IconSettings size="22"/>,
  tooltip: "Tooltip"
}

export default NavButton