/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { setFilter } from '../reducers/filterReducer';

const Filter = ({ filter, setFilter }) => (
  <Form.Input
    name="comment"
    autoComplete="off"
    placeholder="filter"
    onChange={e => setFilter(e.target.value)}
    value={filter}
  />
);

export default connect(
  ({ filter }) => ({ filter }),
  { setFilter },
)(Filter);
