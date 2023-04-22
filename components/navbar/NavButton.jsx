import { Tooltip, Button, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

export const NavButton = ({icon, tooltip}) => {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon color="dark" size="xl" radius="md" variant='white'>
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