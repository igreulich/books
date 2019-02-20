import React from 'react';

import {
  Container,
  Icon,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Head = (props) => {
  const toggleSidebar = () => {
    const { handleToggleSidebar } = props;

    handleToggleSidebar();
  };

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          <Icon name="tv" size="large" style={{ marginRight: '1.5em' }} />
          Greulich Online
        </Menu.Item>
        <Menu.Item as={Link} to="/books">Collection</Menu.Item>
        <Menu.Item as="a" onClick={toggleSidebar} position="right">
          <Icon name="bars" size="large" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Head;
