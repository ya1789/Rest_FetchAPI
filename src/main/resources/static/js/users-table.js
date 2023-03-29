const usersTable = document.getElementById("users-table-body")
const ALL_USERS_URL = '/api/admin'
document.addEventListener('DOMContentLoaded', loadUsers)

async function loadUsers() {
    let emptyTab = '';
    (await (await fetch(ALL_USERS_URL)).json()).forEach((user) => {

        emptyTab += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname} </td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.roles.map(role => role.name.substring(5))}</td>
        <td>
            <a type="button" class="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#updateUser"
            onclick="modalUpdateUser(${user.id})"> Edit 
            </a>
        </td>
        <td>
            <a type="button" class="btn btn-sm btn-danger"
             data-bs-toggle="modal"
             data-bs-target="#deleteUser"
             onclick="modalDeleteUser(${user.id})"> Delete
            </a>
        </td>
      </tr>`;
    });
    usersTable.innerHTML = emptyTab
}

