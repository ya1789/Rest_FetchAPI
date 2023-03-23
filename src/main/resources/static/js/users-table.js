const usersTable = document.getElementById("users-table-body")

const ALL_USERS_URL = '/api/admin'

document.addEventListener('DOMContentLoaded', loadUsers)

async function getData() {
    let res = await fetch(ALL_USERS_URL)
    return res.json()
}
let usersList = await getData()
console.log("Hello")
console.log(usersList)
async function loadUsers() {
    let usersList = await getData()
    //let {id, name, lastName, age, email, roles} = await getUserData()

    console.log("Hello")
    console.log(usersList)
    let tableHtml = ''
    for (let user of usersList) {
        let roles = []
        for (let role of user.roles) {
            roles.push(role.name.toString().replaceAll('ROLE_', ''))
        }

        tableHtml +=
            `<tr>
                    <th class="users-list-id">${user.id}</th>
                    <td class="users-list-name">${user.firstname}</td>
                    <td class="users-list-last-name">${user.lastname}</td>
                    <td class="users-list-age">${user.age}</td>
                    <td class="users-list-email">${user.email}</td>
                    <td><span class="users-list-roles"/>${roles}</td>
                    <td>
                        <a type="button" class="btn btn-sm btn-primary"
                           data-bs-toggle="modal"
                           data-bs-target="#editUser"
                           >
                            Edit
                        </a>
                    </td>
                    <td>
                        <a type="button" id="open-delete-modal" class="btn btn-sm btn-danger"
                           data-bs-toggle="modal"
                           data-bs-target="#deleteUser"
                          >
                            Delete
                        </a>
                    </td>
                </tr>`
    }
    usersTable.innerHTML = tableHtml
}
// function getAllUsers() {
//     fetch('/api/admin').then(function (response) {
//         if (response.ok) {
//             response.json().then(users => {
//                 usersTable.empty();
//                 users.forEach(user => {
//                     _appendUserRow(user);
//                 });
//             });
//         } else {
//             console.error('Network request for users.json failed with response ' + response.status + ': ' + response.statusText);
//         }
//     });
// }
//
// function _appendUserRow(user) {
//     usersTable
//         .append($('<tr class="border-top bg-light">').attr('id', 'userRow[' + user.id + ']')
//             .append($('<td>').attr('id', 'userData[' + user.id + '][id]').text(user.id))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][firstName]').text(user.firstName))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][lastName]').text(user.lastName))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][age]').text(user.age))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][email]').text(user.email))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][roles]').text(user.roles.map(role => role.name)))
//             .append($('<td>').append($('<button class="btn btn-sm btn-info">')
//             .append($('<td>').append($('<button class="btn btn-sm btn-danger">')
//         )))))

