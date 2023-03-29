document.getElementById("update user form").addEventListener('submit', updateUser);

const upd_id = document.getElementById('id')
const upd_firstname = document.getElementById('firstname')
const upd_lastname = document.getElementById('lastname')
const upd_age = document.getElementById('age')
const upd_email = document.getElementById('email')
const upd_password = document.getElementById('password')
const closeEditBtn = document.getElementById('close button update')

function rolesUserEdit(event) {
    let rolesAdmin = {};
    let rolesUser = {};
    let roles = [];
    let allRoles = [];
    let sel = document.getElementById(event);

    for (let i = 0, n = sel.options.length; i < n; i++) {
        if (sel.options[i].selected) {
            roles.push(sel.options[i].value);
        }
    }

    if (roles.includes('1')) {
        rolesAdmin["id"] = 1;
        rolesAdmin["name"] = "ROLE_ADMIN";
        allRoles.push(rolesAdmin);
    }
    if (roles.includes('2')) {
        rolesUser["id"] = 2;
        rolesUser["name"] = "ROLE_USER";
        allRoles.push(rolesUser);
    }
    return allRoles;
}
async function modalUpdateUser(id) {
    let userUrl = '/api/admin/users/' + id
    let updateReq = await fetch(userUrl)
    await updateReq.json().then(user => {
        upd_id.value = user.id
        upd_firstname.value = user.firstname
        upd_lastname.value = user.lastname
        upd_age.value = user.age
        upd_email.value = user.email
        upd_password.value = user.password
    })}

    function updateUser(form) {
        form.preventDefault();
        let editUserForm = new FormData(form.target);
        let user = {
            id: upd_id.value,
            firstname: upd_firstname.value,
            lastname: upd_lastname.value,
            age: upd_age.value,
            email: upd_email.value,
            password: upd_password.value,
            roles: rolesUserEdit("rolesUpdate")
        };

        let UPDATE_URL = '/api/admin/users/update/' + upd_id.value
        let http = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }

        fetch(UPDATE_URL, http).then(() => {
            closeEditBtn.click()
            loadUsers()
        })
    }
