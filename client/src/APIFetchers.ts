const login = async (email: String, password: String) => {
  const body = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  try {
    let resp = await fetch('/auth/login', requestOptions);
    let result = await resp.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
  }
};

const register = async (
  fullName: String,
  email: String,
  password: String,
  confirmpass: String
) => {
  const body = {
    fullName: fullName,
    email: email,
    password: password,
    confirmpass: confirmpass,
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  try {
    let resp = await fetch('/auth/signup', requestOptions);
    let result = await resp.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
  }
};

const getCurrentUser = async () => {
  try {
    const resp = await fetch('/api/current_user');
    const result = await resp.text();
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
  }
};

const logout = async () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const resp = await fetch('/api/logout', requestOptions);
    const result = await resp.text();
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
  }
};

export { login, register, getCurrentUser, logout };
