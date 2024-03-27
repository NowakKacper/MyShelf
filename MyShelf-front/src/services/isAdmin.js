export default function isAdmin() {
    let user_data = JSON.parse(localStorage.getItem('user_data'))
    if(user_data != null){
      let roles = user_data.roles;
      let ifAdmin = roles.filter(role => { 
        return role === "ROLE_ADMIN";
      });
    
      if(ifAdmin.length === 0) return false;
      else return true;
    }
}