import React from 'react';

import {
  Container,
  Header,
  Table,
} from 'semantic-ui-react';

const Body = () => (
  <Container text>
    <Header as="h1">The Grey Library</Header>
    <Table color='green'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell>Series</Table.HeaderCell>
          <Table.HeaderCell>Number</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>The Phantom Menace</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>1</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Attack of the Clones</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>2</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Revenge of the Sith</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>A New Hope</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>4</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Empire Strikes Back</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>5</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Return of the Jedi</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>6</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>The Force Awakens</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>7</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>The Last Jedi</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>8</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Episode IX</Table.Cell>
          <Table.Cell>George Lucas</Table.Cell>
          <Table.Cell>Star Wars</Table.Cell>
          <Table.Cell>9</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>The Hobbit</Table.Cell>
          <Table.Cell>J.R.R. Tolkien</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);

export default Body;
