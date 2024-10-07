export const UseAuth = ()=>{
    const userToken = localStorage.getItem('token');
    return {userToken}
}
export const UseAdminAuth = ()=>{
    const adminToken = localStorage.getItem('adminToken');
    return {adminToken}
}