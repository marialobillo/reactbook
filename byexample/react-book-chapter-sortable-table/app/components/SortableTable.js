import React from 'react';
import { Table } from 'react-bootstrap';
import clone from 'clone';

class SortableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: null };
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.setOrder = this.setOrder.bind(this);
  }

  setOrder() {
    let { order } = this.state;
    if (order == null || order === "v") {
      this.setState({ order: "^" });
    }
    else {
      this.setState({ order: "v" });
    }
  }

  handleHeaderClick(event) {
    event.preventDefault();
    this.setOrder();
    this.props.onClick(this.props.attribute, this.state.order);
  }

  render () {
    let indicator;
    if (this.state.order) {
      indicator = " " + this.state.order;
    }
    return (
      <th>
        <a onClick={this.handleHeaderClick}>{this.props.title}</a>
        {indicator}
      </th>
    );
  }
}

class SortableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: this.props.initialRecords };
    this.sort = this.sort.bind(this);
  }

  wrap(array) {
    return array.map(function(item, index) {
      return { key: item, position: index };
    });
  }

  unwrap(array) {
    return array.map(function(item, index) {
      return item.key;
    });
  }

  getComparator(attribute, order) {
    if (order === "^") {
      return function(a, b){
        let diff = b.key[attribute].localeCompare(a.key[attribute]);
        if (diff === 0) {
          return a.position - b.position;
        }
        return diff;
      };
    }
    else {
      return function(a, b){
        let diff = a.key[attribute].localeCompare(b.key[attribute]);
        if (diff === 0) {
          return a.position - b.position;
        }
        return diff;
      };
    }
  }

  sort(attribute, order) {
    let { records } = clone(this.state);
    let comparator = this.getComparator(attribute, order);
    records = this.wrap(records);
    records.sort(comparator);
    records = this.unwrap(records);
    this.setState({ records: records });
  }

  render () {
    let {records} = this.state;
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <SortableHeader title="First Name" attribute="firstName" onClick={this.sort} />
            <SortableHeader title="Last Name" attribute="lastName" onClick={this.sort} />
            <SortableHeader title="Birth Date" attribute="birthDate" onClick={this.sort} />
          </tr>
        </thead>
        <tbody>
          {records.map(this.renderRow)}
        </tbody>
      </Table>
    );
  }

  renderRow(record, index) {
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <th>{record.firstName}</th>
        <th>{record.lastName}</th>
        <th>{record.birthDate}</th>
      </tr>
    );
  }
}

SortableTable.defaultProps = {
  initialRecords: [
      {firstName: "Angus", lastName: "Young", birthDate: "1955-03-31"},
      {firstName: "Malcolm", lastName: "Young", birthDate: "1953-01-06"},
      {firstName: "George", lastName: "Young", birthDate: "1946-11-06"},
      {firstName: "Bon", lastName: "Scott", birthDate: "1946-07-09"},
      {firstName: "Phil", lastName: "Rudd", birthDate: "1954-05-19"},
      {firstName: "Cliff", lastName: "Williams", birthDate: "1949-12-14"}
  ]
};

export default SortableTable;
