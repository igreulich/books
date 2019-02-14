import React from 'react';

import {
  Container,
  Icon,
  Image,
  Item,
  Label,
} from 'semantic-ui-react';

const paragraph = <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />;

const BookDetail = (props) => {
  console.log('props', props);

  return (
    <Item.Group as={Container} text>
      <Item>
        <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <Item.Content>
          <Item.Header as="a">12 Years a Slave</Item.Header>
          <Item.Meta>
            <span className="cinema">Union Square 14</span>
          </Item.Meta>
          <Item.Description>{paragraph}</Item.Description>
          <Item.Extra>
            <Label>IMAX</Label>
            <Label icon="globe" content="Additional Languages" />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default BookDetail;
