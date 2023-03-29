const del_id = document.getElementById('id1')
const del_firstname = document.getElementById('firstname1')
const del_lastname = document.getElementById('lastname1')
const del_age = document.getElementById('age1')
const del_email = document.getElementById('email1')
const del_roles = document.getElementById('roles1')
const del_closeBtn = document.getElementById("close button delete")
const deleteModal = document.getElementById('deleteUser')

deleteModal.addEventListener('submit', deleteUser)

async function modalDeleteUser(id) {
    let userUrl = '/api/admin/users/' + id

        let deleteReq = await fetch(userUrl)
        await deleteReq.json().then(user => {
            del_id.value = user.id
            del_firstname.value = user.firstname
            del_lastname.value = user.lastname
            del_age.value = user.age
            del_email.value = user.email
            let rolesHtml = ``
            user.roles.forEach(role => {
                rolesHtml += `<option>${role.name.substring(5)}
                                </option>`
            })
            del_roles.innerHTML = rolesHtml
        })

}

async function deleteUser(e) {
    e.preventDefault()

    let DELETE_URL = '/api/admin/users/delete/' + del_id.value
    let http = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch(DELETE_URL, http).then(() => {
        del_closeBtn.click()
        loadUsers()
    })
}

