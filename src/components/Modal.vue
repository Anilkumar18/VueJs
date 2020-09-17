<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="viewcartmodal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-slideup modal-sm" role="document">
      <div class="col-md-7 m-auto">
      <div class="modal-content">
        <div class="modal-header d-flex">
          <h5
            class="modal-title"
            data-dismiss="modal"
            aria-label="Close"
            id="exampleModalLabel"
          >Quick Shop</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" class="close">X</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-2">
              <ul class="productimg_list">
                <li>
                  <img class="img-fluid" src="http://placehold.it/100?text=No-Image" />
                </li>
                <li>
                  <img class="img-fluid" src="http://placehold.it/100?text=No-Image" />
                </li>
                <li>
                  <img class="img-fluid" src="http://placehold.it/100?text=No-Image" />
                </li>
                <li>
                  <img class="img-fluid" src="http://placehold.it/100?text=No-Image" />
                </li>
                <li>
                  <img class="img-fluid" src="http://placehold.it/100?text=No-Image" />
                </li>
              </ul>
            </div>
            <div class="col-md-5">
              <div class="product-item_img">
                <div class="productmain_img">
                  <span>
                    <product-image :src="this.productDetails.images" :alt="this.productDetails.title"></product-image>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-5 align-self-center">
              <div class="product-item_detail">
                <h5 class="brand">Brand</h5>
                <h4 class="product_name" v-html="this.productDetails.title"></h4>
                <span class="add_fav">
                  <i class="far fa-heart"></i> Add to Favorites
                </span>
                <div class="star_rating">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <span class="rating">(997 ratings)</span>
                </div>
                <div class="rate_offder">
                  <ul>
                    <li>
                      <product-price
                        :value="this.productDetails.price"
                        :currency="'$'"
                        :priceclass="true"
                      ></product-price>
                    </li>
                    <li>
                      <product-price
                        :value="this.productDetails.compareAtPrice"
                        :currency="'$'"
                        :priceclass="false"
                      ></product-price>
                    </li>
                    <li>
                      <span
                        class="offer"
                        v-if="this.productDetails.discounts"
                        v-html="this.productDetails.discounts+'% off'"
                      ></span>
                      <span class="offer" v-else v-html="'0% off'"></span>
                    </li>
                  </ul>
                </div>
                <div class="d-flex btn-protype">
                  <a href="#" class="btn product_btn active" type="button">Whole Wheat</a>
                  <a href="#" class="btn product_btn" type="button">Multigrain</a>
                  <a href="#" class="btn product_btn" type="button">Oat</a>
                </div>
                <div class="d-flex btn-category">
                  <a href="#" class="btn product_btn active" type="button">100 g</a>
                  <a href="#" class="btn product_btn" type="button">200 g</a>
                  <a href="#" class="btn product_btn" type="button">500 g</a>
                </div>
                <div class="addcart_btn">
                  <a href="#" class="input-group d-flex">
                    <div class="leftside">
                      <div class="input-group-left">
                        <i class="fas fa-shopping-cart"></i>
                      </div>
                    </div>
                    <div id="input_div">
                      <input class="btn-qty" type="button" value="-" id="moins" onclick="minus()" />
                      <input class="qty btn-qty" type="text" value="1" id="count" />
                      <input class="btn-qty" type="button" value="+" id="plus" onclick="plus()" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
    <script>
export default {
  name: "Modal",
  props: {
    productDetails: {
      type: Object,
      default: {},
    },
    productID: String,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      productModalID: this.productID,
    };
  },
  methods: {
    getInitialValue() {
      console.log("yes");
    },
  },
};
</script>
    <style lang="css" scoped>
</style>