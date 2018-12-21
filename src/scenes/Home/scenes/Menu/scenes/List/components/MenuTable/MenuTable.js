import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { withRouter, Link } from 'react-router-dom';

// Import Actions
import { deleteMenu } from 'services/menu/menuActions';

class MenuTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderMenuTable = this.renderMenuTable.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleEdit(id) {
    this.props.history.push(`/menus/${id}/edit`);
  }

  handleDelete(id) {
    Swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.props.menuActions.deleteMenu(id);
      }
    });
  }

  renderMenuTable() {
    const { data, from } = this.props;
    if (data && data.length > 0) {
      return data.map((menu, index) => (
        <tr key={menu.id}>
          <th scope="row"> {index + from} </th>
          <th>
            <Link
              to={{
                pathname: '/items',
                search: `?menu=${menu.id}&page=1`
              }}
            >
              {menu.name}
            </Link>
          </th>
          <th>{menu.restaurant.name}</th>
          <th>
            <Button
              color="warning"
              onClick={() => {
                this.handleEdit(menu.id);
              }}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button
              color="danger"
              onClick={() => {
                this.handleDelete(menu.id);
              }}
            >
              <i className="fa fa-trash" />
            </Button>
          </th>
        </tr>
      ));
    }
  }
  render() {
    if (this.props.data && this.props.data.length > 0) {
      return (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Restaurant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderMenuTable()}</tbody>
        </Table>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  null,
  dispatch => ({
    menuActions: bindActionCreators({ deleteMenu }, dispatch)
  })
)(withRouter(MenuTable));
