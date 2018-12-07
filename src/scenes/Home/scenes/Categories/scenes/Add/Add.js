import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import Swal from 'sweetalert2';

// Import Components
import { Button, Form, FormGroup, Label, Input } from 'components';


// Import Actions
import { addCategory} from 'services/category/categoryActions';
import { getCities } from 'services/city/cityActions';

// Import Utility functions
import { errorMsg } from 'services/utils';

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      city_id: ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.cityActions.getCities();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category.error !== prevProps.category.error && this.props.category.error !== null) {
      console.log(this.props.category.error);
      console.log('error 1111');
      let msg = errorMsg(this.props.category.error);
      toastr.error('Error', msg);
    }

    if (this.props.city.error !== prevProps.city.error && this.props.city.error !== null) {
      console.log(this.props.category.error);
      let msg = errorMsg(this.props.city.error);
      toastr.error('Error', msg);
    }

    if (this.props.category.success !== prevProps.category.success && this.props.category.success === true) {
      toastr.success('Success', this.props.category.message);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    if(this.state.name === '') {
      toastr.error('Error', 'Category name can not be an empty value');
      return;
    }

    const category = {
      name: this.state.name,
      city_id: this.state.city_id
    }

    this.props.categoryActions.addCategory(category);
  }

  renderCityOptions(cities){
    if (cities !== null) {
      return cities.data.map((city, index) => (
          <option value={city.id} key={index}>
            {city.name}
          </option>
        )
      )
    }
  }

  render() {
    const { categoryLoading, categoryMessage} = this.props.category;
    const { cityLoading, cityMessage } = this.props.city;

    if (categoryLoading || cityLoading ) {
      Swal({
        title: 'Please wait...',
        text: categoryMessage + '\n' + cityMessage,
        onOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
    } else {
      Swal.close();
    }

    return (
      <div>
        <strong>Category add</strong>
        <Form className="mt-3">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Category name here"
              onChange={ this.onChange }
            />
          </FormGroup>
          <Label for="city">City</Label>
          <Input
            type="select"
            name="city_id"
            id="city_id"
            onChange={ this.onChange }
          >
            {this.renderCityOptions(this.props.city.cities)}
          </Input>
          <Button
            color="primary"
            onClick={this.handleSubmit}
            className="float-right"
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    category: {
      ...state.default.services.category
    },
    city: {
      ...state.default.services.city
    }
  }),
  (dispatch) => ({
    cityActions: bindActionCreators({ getCities }, dispatch),
    categoryActions: bindActionCreators({
      addCategory
    }, dispatch)
  })
)(Add);