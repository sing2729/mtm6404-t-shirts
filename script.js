function App() {
  const [shirts, setShirts] = React.useState(tshirts);

  function quantityHandler(event, index) {
    const selectedQuantity = Number(event.target.value);

    const updatedShirts = shirts.map(function (shirt, shirtIndex) {
      if (shirtIndex === index) {
        return {
          title: shirt.title,
          image: shirt.image,
          price: shirt.price,
          stock: shirt.stock,
          quantity: selectedQuantity
        };
      }

      return shirt;
    });

    setShirts(updatedShirts);
  }

  function buyHandler(index) {
    const updatedShirts = shirts.map(function (shirt, shirtIndex) {
      if (shirtIndex === index) {
        return {
          title: shirt.title,
          image: shirt.image,
          price: shirt.price,
          stock: shirt.stock - shirt.quantity,
          quantity: 1
        };
      }

      return shirt;
    });

    setShirts(updatedShirts);
  }

  const shirtCards = shirts.map(function (shirt, index) {
    const quantityOptions = [];

    for (let i = 1; i <= shirt.stock; i++) {
      quantityOptions.push(
        React.createElement("option", { key: i, value: i }, i)
      );
    }

    if (shirt.stock === 0) {
      return React.createElement(
        "div",
        { className: "shirt", key: index },
        React.createElement("h2", null, shirt.title),
        React.createElement("img", {
          src: "images/" + shirt.image,
          alt: shirt.title,
          width: "200"
        }),
        React.createElement("p", null, "Price: $" + shirt.price),
        React.createElement("p", null, "Stock Remaining: " + shirt.stock),
        React.createElement("p", null, "Out of Stock")
      );
    }

    return React.createElement(
      "div",
      { className: "shirt", key: index },
      React.createElement("h2", null, shirt.title),
      React.createElement("img", {
        src: "images/" + shirt.image,
        alt: shirt.title,
        width: "200"
      }),
      React.createElement("p", null, "Price: $" + shirt.price),
      React.createElement("p", null, "Stock Remaining: " + shirt.stock),
      React.createElement(
        "select",
        {
          value: shirt.quantity,
          onChange: function (event) {
            quantityHandler(event, index);
          }
        },
        quantityOptions
      ),
      React.createElement(
        "button",
        {
          onClick: function () {
            buyHandler(index);
          }
        },
        "Buy"
      )
    );
  });

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "T-Shirts Storefront"),
    shirtCards
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));