document.getElementById("new-user-form").addEventListener('submit', addNewUser);

const createModal = document.getElementById("new-user-form")
const allUsersTab = document.getElementById("all-users-tab")
const newUserTab = document.getElementById("new-user-tab")
const allUsersContent = document.getElementById("home")
const newUserContent = document.getElementById('add-user')

function rolesUser(event) {
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
function addNewUser(form) {
    form.preventDefault();
    let newUserForm = new FormData(form.target);
    let user = {
        firstname: newUserForm.get('firstname'),
        lastname: newUserForm.get('lastname'),
        age: newUserForm.get('age'),
        email: newUserForm.get('email'),
        password: newUserForm.get('password'),
        roles: rolesUser("rolesCreate")
    };

    let req = new Request("http://localhost:8080/api/admin", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    fetch(req).then(() => {
        createModal.reset()
        loadUsers()
        newUserTab.classList.remove('active')
        newUserTab.ariaSelected = 'false'
        newUserContent.classList.remove('active', 'show')
        allUsersTab.classList.add('active')
        allUsersTab.ariaSelected = 'true'
        allUsersContent.classList.add('active', 'show')
        allUsersTab.classList.add('active')
    })
}