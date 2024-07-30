const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const cepInput = document.getElementById("cep");
const cepWarn = document.getElementById("cep-warn")
const buscarCepBtn = document.getElementById("buscarCepBtn");
const numeroInput = document.getElementById("numero");
const resultado = document.getElementById("resultado");
const adicionar = document.getElementById("adicionar");
const enderecoCompleto = document.getElementById("enderecoCompleto");

let cart = [];

VMasker(cepInput).maskPattern("99999-999");

cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex"
});

cartModal.addEventListener("click", function (event) {
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
});

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
});


menu.addEventListener("click", function(event) {
    
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
   
});


function addToCart(name, price) {
    if (!isOpen) {
        showMessage("Ops, o restaurante no momento está fechado!");
        return;
    }

    const existingItem = cart.find(item =>item.name === name )

    if(existingItem){
    existingItem.quantity += 1;    
    }else{
        cart.push({
        name,
        price,
        quantity: 1,
        })

    }

        
    updateCartModal()
    showMessage("Item adicionado com sucesso!", "#32CD32");

}



function updateCartModal(){
    if (!isOpen) {
        showMessage("Ops, o restaurante no momento está fechado!", "#ef4444");
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-6", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">

                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)} \n\n</p>
                </div>

                
                 <button class="remove-btn" data-name="${item.name}">
                    Remover
                </button>
                
            </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}


cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")
        
        removeItemCart(name);
    }
})


function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

let enderecoCompletoStr = "";

cepInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        cepInput.classList.remove("border-red-500")
        cepWarn.classList.add("hidden")
    }
})


buscarCepBtn.addEventListener("click", async function(event) {
    event.preventDefault();

    const cep = cepInput.value;

    if (!cep) {
        cepWarn.classList.remove("hidden");
        return;
    }

    cepWarn.classList.add("hidden");

    try {
        const response = await fetch(`https://api.postmon.com.br/v1/cep/${cep}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar o CEP');
        }
        const data = await response.json();

        resultado.innerHTML = `
            <p><strong>CEP:</strong> ${data.cep}</p>
            <p><strong>Logradouro:</strong> ${data.logradouro}</p>
            <p><strong>Bairro:</strong> ${data.bairro}</p>
            <p><strong>Cidade:</strong> ${data.cidade}</p>
            <p><strong>Estado:</strong> ${data.estado}</p>
        `;
        
        adicionar.style.display = 'block';
    } catch (error) {
        resultado.innerHTML = `<p>Erro: ${error.message}</p>`;
    }
});

numeroInput.addEventListener('input', function(event) {
    const numero = numeroInput.value;

    if (!numero) {
        enderecoCompleto.innerHTML = "";
        showMessage("Por favor, insira o número do logradouro.", "#ef4444");
        return;
    }

    const logradouro = resultado.querySelector('p:nth-child(2)').textContent.split(': ')[1];
    const bairro = resultado.querySelector('p:nth-child(3)').textContent.split(': ')[1];
    const cidade = resultado.querySelector('p:nth-child(4)').textContent.split(': ')[1];
    const estado = resultado.querySelector('p:nth-child(5)').textContent.split(': ')[1];

    enderecoCompletoStr = `${logradouro}, ${numero} - ${bairro}, ${cidade} - ${estado}`
    enderecoCompleto.innerHTML = `<p><strong>\n\nEndereço Completo:</strong></p>
    <p>${enderecoCompletoStr}</p>`;
});

function showMessage(message, color) {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
        background: color,
        },
    }).showToast();
}

checkoutBtn.addEventListener("click", function(){
    if (!isOpen) {
        showMessage("Ops, o restaurante no momento está fechado!", "#ef4444");
        return;
    }

    if(cart.length === 0) return;

    if(cepInput.value === ""){
        cepWarn.classList.remove("hidden")
        cepInput.classList.add("border-red-500")
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}`
        )
    }).join("\n\n\n")

    const message = encodeURIComponent(`${cartItems} ${enderecoCompleto.innerText}`)
    const phone = "11914792104"

    window.open(`https://wa.me/${phone}?text=${message}`, "_black")

    cart = [];
    updateCartModal();
    showMessage("Pedido enviado com sucesso!", "#32CD32");

    clearDataInput();

    
})

function clearDataInput() {
    
    cepInput.value = "";
    resultado.innerHTML = "";
    adicionar.style.display = "none";
    enderecoCompleto.innerHTML = "";
    numeroInput.value = "";
    cartModal.style.display = "none";
}


function CheckRestauranteOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 12 && hora < 23;
}

const spanItem = document.getElementById("date-span")
const isOpen = CheckRestauranteOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}