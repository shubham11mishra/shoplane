$(document).ready(function() {
  var productList = window.localStorage.getItem("product-list");
  productList = productList === null || productList === "" ? [] : productList;
  productList = productList.length > 0 ? JSON.parse(productList) : [];

  var totalCount = 0;
  for (var i = 0; i < productList.length; i++) {
    totalCount = totalCount + productList[i].count;
  }

  $(".cart-count").html(totalCount);
})
$(document).ready(function () {
  let hamburger = $(".fa-bars");
  let mobNav = $(".nav-items-ham");
  hamburger.click(function () {
    mobNav.animate({
      width: "toggle",
    });
  });

  $(".image-container").slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
    ],
  });

  //RENDERING THE DATA

  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    function (data, status) {
      let response = data;
      for (let i = 0; i < response.length; i++) {
        createCards(response[i]);
      }
    }
  );

  //CREATING CARDS
  function createCards(data) {
    //Creating Product Card Body
    let card = $(
      '<a href="./product-details.html?p=' + data.id + '" class="card"></a>'
    );
    //Creating Product Image
    let thumbnail = $(
      "<img src=" + data.preview + " alt=" + data.brand + ' class="thumbnail">'
    );
    card.append(thumbnail);

    //Creating Product details section
    let details = $('<div class="details"></div>');
    card.append(details);

    //Creating Product Title
    let prodTitle = $('<h3 class="product-title"></h3>').html(data.name);
    details.append(prodTitle);

    //product brand
    let prodBrand = $('<h4 class="product-brand"></h4>').html(data.brand);
    details.append(prodBrand);

    //product price
    let prodPrice = $('<p class="product-price"></p>').html("Rs " + data.price);
    details.append(prodPrice);

    if (data.isAccessory === false) {
      let category = $("#clothing-wrapper");
      category.append(card);
      return card;
    } else {
      let category = $("#accessories-wrapper");
      category.append(card);
    }
  }
});

$(document).ready(function() {



  function cartCards(data){
      let card = $('<div class="checkout-card"></div>');
      let imgDiv = $('<div></div>');
      let img = $('<img class="checkout-product-img"/>').attr("src", data.preview);
      imgDiv.append(img);
      let prodDetailDiv = $('<div></div>');
      let prodTitle = $('<h4></h4>').html(data.name);
      let prodCount = $('<p></p>').html("x"+data.count);
      let totalAmt = $('<p></p>').html("Amount: Rs ")
      let amt = $('<span></span>').html(parseInt(data.count) * parseInt(data.price))
      totalAmt.append(amt);
      prodDetailDiv.append(prodTitle, prodCount, totalAmt);

      card.append(imgDiv);
      card.append(prodDetailDiv);
      return card;
  }


  var productList = window.localStorage.getItem('product-list');
  productList = productList === null || productList === '' ? [] : productList;
  productList = productList.length > 0 ? JSON.parse(productList) : [];


  let grandTotal = 0;
  for(let i=0; i<productList.length; i++) {
      $('#card-list').append(cartCards(productList[i]));


      var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);
      grandTotal = grandTotal + totalForCurrentProduct;
  }


  $("#item-count").html(productList.length);
  $("#total-amount").html(grandTotal);


   $("#place-order").click(function () {
     if(productList.length>0){
      alert("Order Placed Successfully");
      localStorage.setItem("product-list", []);
  
      location.assign("./thankyou.html");
     }
   
    //  var orderItemArr = [];
    //  for (var i = 0; i < productList.length; i++) {
    //    var prodObj = {
    //      id: productList[i].id,
    //      brand: productList[i].brand,
    //      name: productList[i].name,
    //      price: productList[i].price,
    //      preview: productList[i].preview,
    //      isAccessory: productList[i].isAccessory,
    //    };

    //    orderItemArr.push(prodObj);
    //  }


    //  var dataObj = {
    //    amount: grandTotal,
    //    products: orderItemArr,
    //  };
    //  $.post(
    //    "https://5d76bf96515d1a0014085cf9.mockapi.io/order",
    //    dataObj,
    //    function () {
    //      alert("Order Placed Successfully");
    //      localStorage.setItem("product-list", []);

    //      location.assign("./thankyou.html");
    //    }
    //  );
   });
})


    
