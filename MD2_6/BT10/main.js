import { fetchUsers } from "./apiService.js";

const container = document.getElementById("user-container");

const renderUsers = async () => {
  const users = await fetchUsers();
  container.innerHTML = users
    .map(
      ({ name, email, website }) => `
        <div class="user-card">
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>Web: ${website}</p>
        </div>
    `,
    )
    .join("");
};

renderUsers();
