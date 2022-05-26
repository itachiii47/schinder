import jwt_decode from "jwt-decode";

export function schinderDecode() {
    const token = localStorage.getItem("access_token");
    let user = jwt_decode(token);
    console.log(user);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("isAdmin", user.admin);
    return;
}

export default {
    schinderDecode
};
