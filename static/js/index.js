const serverSocket = io('http://localhost:8080/')

// const listadoProducts = document.getElementById('listadoproducts')
const titulo = document.getElementById('titulo')
const codigo = document.getElementById('codigo')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
const descripcion = document.getElementById('descripcion')
const categoria = document.getElementById('categoria')
const guardarproducto = document.getElementById('guardar')
const form = document.getElementById('form')

guardarproducto.addEventListener('click', (e) => {
  e.preventDefault()
  const newProduct = {
    title: titulo.value,
    description: descripcion.value,
    code: codigo.value,
    price: precio.value,
    stock: stock.value,
    category: categoria.value
  }

  axios.post('http://localhost:8080/api/products', newProduct)
    .then(res => {
      console.log(res)
      alert('producto guardado con exito')
      form.reset()
    })
    .catch(err => console.log(err))
  serverSocket.emit('newProduct', newProduct)
})

const htmlProductos = `    
{{#each listado}}
<div class="card m-2" style="width: 18rem">
<div class="card-body">
<h5 class="card-title">{{this.title}}</h5>
<p class="card-text">{{this.description}}</p>
<p class="card-text">precio: {{this.price}}</p>
<button class="btn btn-danger" onclick="deleteProduct('{{this.id}}')" >Borrar</button>
</div>
</div>
{{/each}}
`
const armarHtmlProducts = Handlebars.compile(htmlProductos)

serverSocket.on('actualizarproducts', datosAdjuntos => {
  console.log(datosAdjuntos)
  const listadoProducts = document.getElementById('listadoproducts')
  listadoProducts.innerHTML = armarHtmlProducts({ listado: datosAdjuntos })
})

const deleteProduct = (id) => {
  axios.delete(`http://localhost:8080/api/products/${id}`)
    .then(res => {
      console.log(res)
      alert('producto eliminado exitosamente')
    })
}
