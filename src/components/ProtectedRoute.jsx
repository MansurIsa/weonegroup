// // components/ProtectedRoute.jsx
// import React, { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserObj } from '../actions/loginAction/loginAction';

// const ProtectedRoute = ({ element, isProtected }) => {
//       const dispatch=useDispatch()
//   useEffect(()=>{
//     dispatch(getUserObj())
//   },[dispatch])

//   const {userObj}=useSelector(state=>state.login)
//   const { user } = useSelector(state => state.login); // login reducer-də user məlumatı olmalıdır

//   if (isProtected) {
//     // Əgər istifadəçi yoxdursa və ya is_staff false-dursa -> ana səhifəyə yönləndir
//     if (!user || !user.is_staff) {
//       return <Navigate to="/" replace />;
//     }
//   }

//   return element;
// };

// export default ProtectedRoute;
