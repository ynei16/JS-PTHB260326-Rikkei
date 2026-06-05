async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    users.forEach((user) => console.log(user.name));
  } catch (err) {
    console.error("Lỗi fetch:", err);
  }
}
getUsers();
