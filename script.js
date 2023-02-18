function getMenu(){
fetch('https://free-food-menus-api-production.up.railway.app/burgers')
  .then(response => response.json())
  .then(data => {
    const foodItems = data.map(item => {
      return {
        image: item.img,
        price: item.price,
        rate: item.rate,
        name: item.name
      };
      
    });
    
    const container = document.querySelector('.container');
    foodItems.forEach(item => {
      const newItem = document.createElement('div');
      newItem.classList.add('food-item');
      
      

      newItem.innerHTML = `
        <img src='${item.image}' alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Rate: ${item.rate}</p>
      `;
      container.appendChild(newItem);
    });
  })
  .catch(error => console.error(error));

}

getMenu();


function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const burgers = [
        { name: 'Cheeseburger', price: 6.99 },
        { name: 'Bacon Cheeseburger', price: 8.99 },
        { name: 'Mushroom Swiss Burger', price: 7.99 },
        { name: 'Double Cheeseburger', price: 9.99 },
        { name: 'Western Burger', price: 8.99 },
        { name: 'Veggie Burger', price: 6.99 },
      ];

      const selectedBurgers = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        selectedBurgers.push(burgers[randomIndex]);
      }

      const order = { burgers: selectedBurgers };
      resolve(order);
    }, 2500);
  });
}
takeOrder().then(order => {
  console.log('Order placed:', order);
}).catch(error => {
  console.error('Error placing order:', error);
});

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderStatus = { order_status: true, paid: false };
      resolve(orderStatus);
    }, 1500);
  });
}
orderPrep().then(orderStatus => {
  console.log('Order prepared:', orderStatus);
}).catch(error => {
  console.error('Error preparing order:', error);
});

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderStatus = { order_status: true, paid: true };
      resolve(orderStatus);
    }, 1000);
  });
}

payOrder().then(orderStatus => {
  console.log('Order paid:', orderStatus);
}).catch(error => {
  console.error('Error paying for order:', error);
});


function thankyouFnc() {
  alert('Thank you for your order!');
}


takeOrder()
  .then(order => {
    console.log('Order placed:', order);
    return orderPrep();
  })
  .then(orderStatus => {
    console.log('Order prepared:', orderStatus);
    return payOrder();
  })
  .then(orderStatus => {
    console.log('Order paid:', orderStatus);
    if (orderStatus.paid) {
      thankyouFnc();
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
