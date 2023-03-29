const userTable = document.getElementById("user-table-body")
const USER_URL = '/api/user'
document.addEventListener('DOMContentLoaded', loadUser)

async function loadUser() {
    let emptyTab = '';
    await (await fetch(USER_URL)).json().then((user) => {
        emptyTab += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname} </td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.roles.map(role => role.name.substring(5))}</td>
      </tr>`;
    });
    userTable.innerHTML = emptyTab
}