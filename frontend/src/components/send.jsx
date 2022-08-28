import axios from "axios";
export function senddata(json) {
  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let address =
    localStorage.getItem("Street") +
    " " +
    localStorage.getItem("Landmark") +
    " " +
    localStorage.getItem("City") +
    " " +
    localStorage.getItem("State") +
    " " +
    localStorage.getItem("Country");

  console.log("inside send.jsx", json);

  let paymentid = localStorage.getItem("browser_tahelka");

    axios
    .post("http://api.rjwada.com/items/inventory", {
      id: `${json.userid_id}.${paymentid}.${json.product_id}`,
      status: "published",
      sort: null,
      user_created: null,
      date_created: "2022-08-21T17:49:07.109Z",
      user_updated: null,
      date_updated: null,
      payment_id: `${paymentid}`,
      customer_id: `${json.userid_id}`,
      price: `${json.price}`,
      category: `${json.categoryId}`, 
      image_of_design: `${json.banner}`,
      color: "black", 
      size: `${json.size}`, 
      ordered_on: `${date}T${time}`, 
      in_progress_status: false,
      order_completed_status: false,
      address_of_delivery: `${address}`, 
      dispatch_date: "2022-08-30T11:49:00", 
      dispatch_status: false,
      order_delivered_on: "2022-08-31",
      seller_id: "10001seller1001",
      cancel_status: false,
      return_status: false,
      date_of_cancel: "2022-08-31",
      date_of_return: "2022-08-31",
      date_of_refund: "2022-08-31",
      quantity: `${json.quantity}`, 
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
