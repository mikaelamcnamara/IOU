const login = async (email: String, password: String) => {
  const body = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  try {
    let resp = await fetch("/auth/login", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const update = async (email: String, fullName: String) => {
  const body = {
    email: email,
    fullName: fullName,
  };

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  try {
    let resp = await fetch('/api/current_user', requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
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
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    let resp = await fetch("/auth/signup", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const getCurrentUser = async () => {
  try {
    const resp = await fetch("/api/current_user");
    const result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {

  }
};

const getAllUsers = async () => {
  try {
    const resp = await fetch("/api/allUsers");
    const result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {

  }
};

const getAllFavours = async () => {
  try {
    const resp = await fetch("/api/allFavours");
    const result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
}


const logout = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const resp = await fetch("/api/logout", requestOptions);
    const result = await resp.text();
    localStorage.clear();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const createFavour = async (
  title: String,
  description: String,
  assignee: String,
  category: String,
  points: Number,
  date: String
) => {
  const body = {
    title: title,
    description: description,
    assignee: assignee,
    category: category,
    points: points,
    date: date,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    let resp = await fetch("/api/createFavour", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const addAFriend = async (friend: String) => {
  const body = {
    friend: friend,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    let resp = await fetch("/api/addFriend", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const removeFriend = async (friend: String) => {
  const body = {
    friend: friend,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    let resp = await fetch("/api/removeFriend", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const leaderboard = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    let resp = await fetch("/api/leaderboard", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const getFriendNames = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    let resp = await fetch("/api/getFriendNames", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const removeFavour = async (favourId: String) => {
  const body = {
    favourId: favourId,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    let resp = await fetch("/api/removeFavour", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
}

const getMyFavours = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    let resp = await fetch("/api/getMyFavours", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

const getMyDebts = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    let resp = await fetch("/api/getMyDebts", requestOptions);
    let result = await resp.json();
    return result;
  } catch (e) {
    return e;
  } finally {
  }
};

export {
  login,
  register,
  getCurrentUser,
  getAllUsers,
  logout,
  update,
  addAFriend,
  removeFriend,
  getAllFavours,
  leaderboard,
  createFavour,
  getFriendNames,
  removeFavour,
  getMyFavours,
  getMyDebts,
};
