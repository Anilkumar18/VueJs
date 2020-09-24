<template>
  <div class="card">
    <product-image
      :src="productData.images"
      :alt="productData.title"
    ></product-image>
    <div class="card-body">
      <div class="d-flex">
        <h5 class="card-title">
          <product-price
            :value="productData.price"
            :currency="'$'"
            :priceclass="true"
          ></product-price>
          <product-price
            :value="productData.compareAtPrice"
            :currency="'$'"
            :priceclass="false"
          ></product-price>
        </h5>
        <span class="ml-auto">
          <i class="far fa-heart"></i>
        </span>
      </div>
      <p class="card-text" v-html="productData.title"></p>
      <product-attribute
        :attribute="productData.productVariantValues"
        :variant="variantCollection[processingProductID]"
        @updateProductVariant="productVariantChange"
        @showProductVariantDetails="displayproductDetails"
      ></product-attribute>
      <div v-if="itemQty == 0" class="addcart_btn">
        <a
          href="javascript:;"
          class="input-group d-flex"
          @click="updateCart(true, true)"
        >
          <div class="leftside">
            <div class="input-group-left">
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
          <div class="m-auto middle">
            <span class="btn add_btn">Add to cart</span>
          </div>
          <div class="rightside">
            <div class="input-group-right">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </a>
      </div>
      <div v-else class="addcart_btn">
        <div class="input-group d-flex">
          <div class="leftside">
            <div class="input-group-left">
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
          <div id="input_div">
            <button
              class="btn-qty"
              type="button"
              id="moins"
              @click="updateCart(false)"
            >
              -
            </button>
            <input
              class="qty btn-qty"
              type="text"
              :value="cartItemDetails"
              id="count"
            />
            <button
              class="btn-qty"
              type="button"
              id="plus"
              @click="updateCart(true)"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productID: String,
    cartItemDetails: Number,
    productDetails: {
      type: Object,
      default: {},
    },
    productsVariantCollection: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      productData: this.productDetails,
      variantCollection: this.productsVariantCollection,
      processingProductID: this.productID,
      itemQty:this.cartItemDetails
    };
  },
  methods: {
    productVariantChange(value) {
      let productCollection = this.productsVariantCollection[
        this.processingProductID
      ];
      for (let i = 0; i < productCollection.length; i++) {
        let productVariantValues = productCollection[i]["productVariantValues"];
        for (
          let variant = 0;
          variant < productVariantValues.length;
          variant++
        ) {
          if (productVariantValues[0].value == value) {
            this.productData = productCollection[i];
            this.itemQty=0;
          }
        }
      }
    },
    displayproductDetails(value, id) {
      let modalpopupdetails = {
        modalvalue: this.productData,
        modalProductID: this.processingProductID,
      };
      this.$emit("showProductDetails", modalpopupdetails);
    },
    updateCart(cartitemStatus, isnewproduct = false) {
      if(cartitemStatus)
        if(isnewproduct)
          this.itemQty=1;
        else
          ++this.itemQty;
      else
        --this.itemQty;

      this.$emit(
        "updateCartDetails",
        this.productData,
        this.processingProductID,
        cartitemStatus,
        isnewproduct
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
