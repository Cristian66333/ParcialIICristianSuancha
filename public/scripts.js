
const url = "https://api-dishes.vercel.app"
function loadDishes(id) {
    if (id != '') {
        return new Promise((resolve, reject) => {
            fetch(url + '/' + id)
                .then(resp => resp.json()).then(resp => resolve(resp))
                .catch(err => reject(err))
        })
    } else {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(resp => resp.json()).then(resp => resolve(resp))
                .catch(err => reject(err))
        })
    }
}

const fillData = function () {

    const id = document.getElementById('idObject').value
    cleanData()
    if (id != '') {
        document.getElementById('divTable').innerHTML = '<h5>Elementos encontrados:</h5><br><table class="table" >' +
            '<thead>' +
            ' <tr>' +
            '<th>object id</th>' +
            '<th>idDish</th>' +
            '<th>name</th>' +
            '<th>calories</th>' +
            '<th>isVegetarian</th>' +
            '<th>Value</th>' +
            '<th>Comments</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="tbody2">' +
            '</tbody>' +
            ' </table>'
        loadDishes(id).then(resp => {
            if (resp.state) {
                console.log(resp.data)
                dish = resp.data
                const row = document.createElement('tr')
                const colObId = document.createElement('td')
                colObId.append(document.createTextNode(`${dish._id}`))
                row.append(colObId)
                const colId = document.createElement('td')
                colId.append(document.createTextNode(`${dish.idDish}`))
                row.append(colId)
                const colName = document.createElement('td')
                colName.append(document.createTextNode(`${dish.name}`))
                row.append(colName)
                const colCalories = document.createElement('td')
                colCalories.append(document.createTextNode(`${dish.calories}`))
                row.append(colCalories)
                const colVegetarian = document.createElement('td')
                if (dish.isVegetarian == true) {
                    colVegetarian.append(document.createTextNode(`Si`))
                    row.append(colVegetarian)
                } else {
                    colVegetarian.append(document.createTextNode(`No`))
                    row.append(colVegetarian)
                }
                const colValue = document.createElement('td')
                colValue.append(document.createTextNode(`${dish.value}`))
                row.append(colValue)
                const colComment = document.createElement('td')
                colComment.append(document.createTextNode(`${dish.comments}`))
                row.append(colComment)
                document.getElementById('tbody2').append(row)

            } else {
                console.log('error' + resp.state)
            }
        })

    } else {
        document.getElementById('divTable').innerHTML = ''
        alert('ingrese un id')
    }
}
const cleanData = function () {
    document.getElementById('idObject').value = ''
    document.getElementById('divTable').innerHTML = ''
}

const loadData = () => {
    const id = document.getElementById('idDish').value
    const name = document.getElementById('nameDish').value
    const calories = document.getElementById('caloriesDish').value
    const vegetarian = document.getElementById('vegetarianDish').value
    const value = document.getElementById('valueDish').value
    const comments = document.getElementById('commentsDish').value
    if (id != '' && name != '' && calories != '' && vegetarian != '' && value != '' && comments != '') {
        const data = { 'idDish': id, 'name': name, 'calories': calories, 'isVegetarian': vegetarian, 'value': value, 'comments': comments }

        return JSON.stringify(data)
    } else {
        return false
    }


}

document.getElementById('btnSend').addEventListener('click', () => {
    const body = loadData()
    if (body) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(resp => {
            if (resp.status != 208) {
                return resp.json()
            } else {
                return false
            }

        })
            .then(resp => {
                console.log()
                if (resp.state) {
                    alert('Agregado correctamente')
                    location.href='/';
                } else if (!resp.state) {

                    alert('El platillo ya existe, error al agregar')
                }
            })
            .catch(err => {
                alert(`Error ${err}`)
            })
    } else {
        alert('Complete todos los campos')
    }

})