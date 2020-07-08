import { connect } from 'react-redux';
import { EmployeeManagement as Component } from './EmployeeManagement';
import {getEmployeeList, addEmployee, deleteEmployee} from '../../Reducers/EmployeeManagement.reducer';

  const mapStateToProps = state => {
    return {
        employeeList: state.employeeList,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        getEmployeeList:(params, cb) => dispatch(getEmployeeList(params, cb)),
        addEmployee: (params, cb) => dispatch(addEmployee(params, cb)),
        deleteEmployee: (params, cb) => dispatch(deleteEmployee(params, cb)),
    }
  };
  export const EmployeeManagement = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);