export function setToken(token: string){
  return localStorage.setItem("userToken",token);
}
export function getToken(){
  return localStorage.getItem("userToken");
}

