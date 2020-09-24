<template>
  <div>
    <div class="header-section">
      <div class="col-md-10 m-auto">
        <div class="ml-auto add_top">
          <button
            class="add-to-cart"
            data-toggle="modal"
            data-target="#exampleModal4"
          >
            <i
              class="fas fa-shopping-basket"
              v-html="'$' + cartProductTotal"
            ></i>
          </button>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="container-fluid">
        <div class="col-md-10 m-auto">
          <div class="row">
            <div
              class="col-md-3 productDetails"
              v-for="(product, index) in productSelectedDetails"
              :key="index"
            >
              <div
                v-for="(productvariants, variantsindex) in product"
                :key="variantsindex"
              >
                <ProductListDisplay
                  :productID="variantsindex"
                  :productDetails="productvariants"
                  :productsVariantCollection="productDetails[index]"
                  :cartItemDetails="cartitemCollection(variantsindex)"
                  @showProductDetails="productDetailsPopUp"
                  @updateCartDetails="updateCartProductDetails"
                ></ProductListDisplay>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Button trigger modal -->
    </div>
    <modal
      v-if="showProductPopUp"
      :productVariantDetails="modalPopProductData"
      :productID="modalProductID"
      :productDetails="modalProductDetails"
      :productOptionList="productOptionList"
      :cartItemDetails="cartitemCollection(modalProductID)"
      @updateCartDetails="updateCartProductDetails"
      @closeProductpopup="clearmodalpopdata"
    ></modal>

    <div
      class="modal modal-1 fade"
      id="exampleModal4"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel4"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-slideout modal-sm" role="document">
        <div class="modal-content">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" class="close">x</span>
          </button>
          <div class="modal-header">
            <div class="d-flex">
              <div>
                <h3><i class="fas fa-shopping-cart"></i> In-store Pickup</h3>
              </div>
              <div class="ml-auto"><i class="fas fa-caret-up"></i></div>
            </div>
          </div>
          <div class="modal-body">
            <div
              class="d-flex align-item-center"
              v-for="(cartProduct, cartProductIndex) in cartProductDetails"
              :key="cartProductIndex"
            >
              <div class="img">
                <product-image
                  :src="cartProduct.Content.images"
                  class="img-fluid your-cart"
                ></product-image>
              </div>
              <div class="content">
                <div class="cart-title">
                  <h5 v-html="cartProduct.Content.title"></h5>
                </div>
                <div class="cart-para">
                  <span class="fit-para">
                    <i class="fas fa-trash-alt"  @click="deleteCartItem(cartProductIndex)"></i>
                  </span>
                </div>
                <div class="line_item-qty">
                  <div id="input_div">
                    <input
                      class="btn-qty"
                      type="button"
                      value="-"
                      id="moins"
                      @click="
                        updateCartProductDetails(
                          cartProduct.Content,
                          cartProduct.productID,
                          false
                        )
                      "
                    />
                    <input
                      class="qty btn-qty"
                      type="text"
                      :value="cartProduct.Qty"
                      id="count"
                    />
                    <input
                      class="btn-qty"
                      type="button"
                      value="+"
                      id="plus"
                      @click="
                        updateCartProductDetails(
                          cartProduct.Content,
                          cartProduct.productID,
                          true
                        )
                      "
                    />
                  </div>
                  <div class="qty-rate">
                    <p>
                      X
                      <product-price
                        :value="cartProduct.Content.price"
                        :currency="'$'"
                        :priceclass="true"
                      ></product-price>
                    </p>
                  </div>
                  <div class="rate ml-auto align-self-center">
                    <h6>
                      <product-price
                        :value="cartProductPrice(cartProduct)"
                        :currency="'$'"
                        :priceclass="true"
                      ></product-price>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div class="qty_list">
              <div class="d-flex">
                <div class="qty_item">
                  <p>
                    Qty: <span>{{ cartProductItems(cartProductDetails) }}</span>
                  </p>
                </div>
                <div class="qty_item ml-auto">
                  <p>
                    Total: <span>${{ cartProductTotal }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="view-cart">
            <div class="text-right">
              <h4>
                Subtotal: <span>${{ cartProductTotal }}</span>
              </h4>
            </div>
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal-2"
              data-dismiss="#exampleModal4"
              class="btn btn-addcart"
            >
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const apiBaseUrl = "https://ftx-commerce-sample-api.herokuapp.com";

export default {
  name: "ProductList",
  created() {
    this.getProfilesData();
  },
  data() {
    return {
      products: [],
      productDetails: [],
      productOptionsDetails: [],
      productSelectedDetails: [],
      modalPopProductData: [],
      modalProductID: "",
      modalProductDetails: [],
      showProductPopUp: false,
      productOptionList: [],
      cartProductDetails: [],
      cartProductTotal: 0,
    };
  },
  methods: {
    getProfilesData() {
      axios.get(apiBaseUrl + "/products").then(
        function (response) {
          this.products = response.data;
          this.generateProductDetails(response.data);
        }.bind(this)
      );
    },
    generateProductDetails(responseData) {
      for (let i = 0; i < responseData.length; i++) {
        var selected_obj = {};
        selected_obj[responseData[i]["productID"]] =
          responseData[i]["variants"][0];
        this.productSelectedDetails.push(selected_obj);
        var product_obj = {};
        product_obj[responseData[i]["productID"]] = responseData[i]["variants"];
        this.productDetails.push(product_obj);
      }
    },
    productDetailsPopUp(details) {
      this.modalPopProductData = details["modalvalue"];
      this.modalProductID = details["modalProductID"];
      this.showProductPopUp = true;
      axios.get(apiBaseUrl + "/products/" + details["modalProductID"]).then(
        function (response) {
          this.modalProductDetails = response.data.variants;
          let productVariant = response.data.variants;
          let optionArray = [];
          for (let i = 0; i < productVariant.length; i++) {
            for (
              let productvari = 0;
              productvari < productVariant[i].productVariantValues.length;
              productvari++
            ) {
              let option = {};
              var code =
                productVariant[i].productVariantValues[productvari].codeName;
              var attributevalue =
                productVariant[i].productVariantValues[productvari].value;
              option[code] = attributevalue;
              optionArray.push(option);
            }
          }
          this.productOptionList.splice(0, this.productOptionList.length);
          const result = Object.keys(Object.assign({}, ...optionArray));
          let options = {};
          for (let optionList = 0; optionList < result.length; optionList++) {
            options[result[optionList]] = this.fetchOptionValue(
              result[optionList],
              optionArray
            );
            this.productOptionList.push(options);
          }
        }.bind(this)
      );
    },
    fetchOptionValue(key, optionArray) {
      let option = [];
      for (let op = 0; op < optionArray.length; op++) {
        if (typeof optionArray[op][key] != "undefined") {
          option.push(optionArray[op][key]);
        }
      }
      option = [...new Set(option)];
      return option;
    },
    printArray: function (item, index) {
      this.modalProductDetails.push({ item });
      return { index: item };
    },
    getProductOptions(productID, productvariants) {
      var productOptions = [];
      var Options = [];
      for (let variants = 0; variants < productvariants.length; variants++) {
        for (
          let variantAttribute = 0;
          variantAttribute <
          productvariants[variants]["productVariantValues"].length;
          variantAttribute++
        ) {
          var product_option_list = [];
          var code =
            productvariants[variants]["productVariantValues"][variantAttribute][
              "codeName"
            ];
          var attributevalue =
            productvariants[variants]["productVariantValues"][variantAttribute][
              "value"
            ];
          product_option_list[code] = attributevalue;
          Options.push(product_option_list);
        }
      }
      productOptions[productID] = Options;
      this.productOptionsDetails.push(productOptions);
    },
    updateCartProductDetails(
      cartProductDetails,
      productID,
      status,
      isnewProduct = false
    ) {
      let cartProducts = this.cartProductDetails;
      if (cartProducts.length) {
        let qty = 1;
        let isProductExist = false;
        if (!isnewProduct) {
          for (
            let cart_item = 0;
            cart_item < cartProducts.length;
            cart_item++
          ) {
            if (cartProducts[cart_item]["productID"] == productID) {
              if (status) qty = ++cartProducts[cart_item]["Qty"];
              else qty = --cartProducts[cart_item]["Qty"];

              if (qty < 1) this.cartProductDetails.splice(cart_item, 1);

              this.cartProductDetails[cart_item]["Qty"] = qty;
              isProductExist = true;
            }
          }
        }
        if (!isProductExist)
          this.cartProductDetails.push({
            Content: cartProductDetails,
            productID: productID,
            Qty: qty,
          });
      } else {
        this.cartProductDetails.push({
          Content: cartProductDetails,
          productID: productID,
          Qty: 1,
        });
      }
    },
    cartProductPrice(item) {
      return item.Content.price * item.Qty;
    },
    cartProductItems(item) {
      let itemQty = 0;
      var cartitemTotal = 0;
      for (let i = 0; i < this.cartProductDetails.length; i++) {
        itemQty += this.cartProductDetails[i]["Qty"];
        cartitemTotal +=
          this.cartProductDetails[i].Content.price *
          this.cartProductDetails[i]["Qty"];
      }
      this.cartProductTotal = cartitemTotal;
      return itemQty + " items";
    },
    cartitemCollection(productID) {
      for (let i = 0; i < this.cartProductDetails.length; i++) {
        if (this.cartProductDetails[i]["productID"] == productID) {
          return this.cartProductDetails[i]["Qty"];
        }
      }
      return 0;
    },
    clearmodalpopdata() {
      this.modalPopProductData = [];
      this.modalProductID = [];
      this.showProductPopUp = false;
    },
    deleteCartItem(index)
    {
      this.cartProductDetails.splice(index, 1)
    }
  },
};
</script>



