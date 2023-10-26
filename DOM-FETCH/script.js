const marcasDropdown = document.getElementById('marcas')
const modelosDropdown = document.getElementById('modelos')

fetch('http://localhost:8888/marcas')
    .then(response=>response.text())
    .then(data=>{
        const marcas = data.split('\n')
        marcas.forEach(marca=>{
            const option = document.createElement('option')
            option.value = marca
            option.textContent = marca
            marcasDropdown.appendChild(option)
        })
        marcasDropdown.addEventListener('change', ()=>{
            const selectMarca = marcasDropdown.value
            cargarModelos(selectMarca)
        })
    })

    function cargarModelos(marca){
        fetch(`http://localhost:8888/modelos/${marca}`)
            .then(response => response.text())
            .then(data=>{
                const modelos = data.split('\n')
                modelosDropdown.innerHTML = '<option value = ""> Selecciona un modelo </option>'
                modelos.forEach(modelo=>{
                    const option = document.createElement('option')
                    option.value = modelo
                    option.textContent = modelo

                    const marcaSinEspacios = marca.trim()
                    option.classList.add(`is-${marcaSinEspacios}`)
                    modelosDropdown.appendChild(option)
                })
            })
    }

    modelosDropdown.addEventListener('change',()=> {
        const selectedModelo = modelosDropdown.value
        if(selectedModelo){
            alert(`modelo seleccionado: ${selectedModelo}`)
        }
    })