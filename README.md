# Cardápio de Hamburgueria com API de WhatsApp

### Objetivo do Projeto

O objetivo do projeto é criar um cardápio digital interativo para uma hamburgueria, permitindo que os clientes visualizem os itens disponíveis, adicionem ao carrinho e enviem o pedido diretamente para o WhatsApp da hamburgueria, incluindo o endereço de entrega. A ideia é facilitar o processo de pedidos, utilizando uma plataforma popular e de fácil acesso para o cliente, que é o WhatsApp.

### Justificativa do Projeto

Muitas hamburguerias ainda utilizam métodos tradicionais para receber pedidos, como telefone ou mensagens. Isso pode gerar erros e dificultar o processo de gerenciamento. Este sistema visa digitalizar o processo de pedidos, oferecendo uma experiência moderna, eficiente e acessível para o cliente. Ao usar o WhatsApp para enviar o pedido, o sistema permite um contato rápido e direto, o que melhora a experiência do usuário e reduz a carga de trabalho da equipe da hamburgueria.


1. **Visualização do Cardápio**: 
   O usuário pode visualizar os itens disponíveis no cardápio com suas descrições e preços. As informações dos itens estão armazenadas no código JavaScript em forma de array de objetos.
   
2. **Adição ao Carrinho**: 
   O usuário pode adicionar itens ao carrinho de compras clicando no botão "Adicionar ao Carrinho". O JavaScript manipula o estado do carrinho para atualizar a visualização.
   
3. **Envio para o WhatsApp**:
   Quando o usuário finaliza a seleção, ele clica no botão "Enviar Pedido", que aciona a API do WhatsApp para enviar o pedido.
   O pedido contém o nome do item, a quantidade, o preço e o endereço de entrega (obtido via API ViaCEP).
   A API do WhatsApp é chamada para enviar os dados diretamente para o número de WhatsApp da hamburgueria.


### Tecnologias Utilizadas

1. **HTML (Versão 5)**: Estrutura básica do projeto.

2. **CSS (TailwindCSS)**: Para o design e estilo visual da aplicação, proporcionando agilidade no desenvolvimento e criação de layouts responsivos.

3. **JavaScript (ES6+)**: Para funcionalidades interativas e integração com APIs. O projeto utiliza ECMAScript 6 (ES6), que inclui recursos como classes, arrow functions, e manipulação de arrays.

4. **API do WhatsApp**: Para enviar os pedidos diretamente para o WhatsApp da hamburgueria.

5. **API ViaCEP (Busca de Endereço)**: Para realizar a busca de endereço pelo CEP fornecido pelo cliente.


### Versões do Projeto

Versão do Projeto: 1.0.0

Última Atualização: Março de 2025

Autor: Mayara Brainer
