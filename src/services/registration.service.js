import { authService } from "../services/auth.service";
import { handleResponse } from "../helpers/handleresponse";

export const registrationService = {
  register,
};

function register(username, password, fullname, country) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role: "Contributor", //#toDo roles and permissions
      username,
      password,
      fullname,
      country,
    }),
  };

  return fetch(`http://localhost:8080/api/register`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      authService.login(username, password);
      return res;
    });
}
