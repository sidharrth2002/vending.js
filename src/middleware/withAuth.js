// import axios from 'axios';
// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// export default function withAuth(ComponentToProtect) {
//   return class extends Component {
//     constructor() {
//       super();
//       this.state = {
//         isAuthenticated: useSelector(state => state.isAuthenticated),
//         loading: true,
//         redirect: false,
//       };
//     }
//     componentDidMount() {
//         console.log(this.props);
//         if(this.state.isAuthenticated) {
//             this.setState({
//                 loading: false
//             })
//         }
//     }

//     render() {
//       const { loading, redirect } = this.state;
//       if (loading) {
//         return <h3>Loading...</h3>
//       }
//       else if (redirect) {
//         return <Redirect to="/login" />;
//       }
//       return <ComponentToProtect {...this.props} />;
//     }
//   }
// }

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     user: state.auth.user,
//     token: state.auth.token
// });
  
  
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withAuth);