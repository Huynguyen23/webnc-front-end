import { connect } from 'react-redux';
import { EmployeeManagement as Component } from './EmployeeManagement';
import {getEmployeeList,promoteEmployee, addEmployee, updateEmployee , deleteEmployee} from '../../Reducers/EmployeeManagement.reducer';

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
        updateEmployee: (params, cb) => dispatch(updateEmployee(params, cb)),
        promoteEmployee: (params, cb) => dispatch(promoteEmployee(params, cb)),
    }
  };
  export const EmployeeManagement = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);