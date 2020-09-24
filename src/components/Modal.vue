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
          >Quick Shop </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodalPopup()">
            <span aria-hidden="true" class="close">X</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-2">
              <ul class="productimg_list">
                <li v-for="(product, index) in productDetails" :key="index">
                   <product-image :src="product.images" :alt="product.title"></product-image>
                </li>
               
              </ul>
            </div>
            <div class="col-md-5">
              <div class="product-item_img">
                <div class="productmain_img">
                  <span>
                    <product-image :src="this.variantDetails.images" :alt="this.variantDetails.title"></product-image>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-5 align-self-center">
              <div class="product-item_detail">
                <h5 class="brand">Brand</h5>
                <h4 class="product_name" v-html="this.variantDetails.title"></h4>
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
                        :value="this.variantDetails.price"
                        :currency="'$'"
                        :priceclass="true"
                      ></product-price>
                    </li>
                    <li>
                      <product-price
                        :value="this.variantDetails.compareAtPrice"
                        :currency="'$'"
                        :priceclass="false"
                      ></product-price>
                    </li>
                    <li>
                      <span
                        class="offer"
                        v-if="this.variantDetails.discounts"
                        v-html="this.variantDetails.discounts+'% off'"
                      ></span>
                      <span class="offer" v-else v-html="'0% off'"></span>
                    </li>
                  </ul>
                </div>
                 <div v-for="(optionValue, optionTitle) in this.productOptionList[0]" :key="optionTitle">
                  {{optionTitle}}
                  <div class="d-flex btn-protype">
                    <span v-for="(productvariants, variantsindex) in optionValue" :key="variantsindex" class="">
                      <a href="javascript:;" v-on:click="updateProductOption(optionTitle,productvariants)" :class="inArray(productvariants,optionTitle) ? 'btn product_btn active' : 'btn product_btn'">
                        {{productvariants}}  
                      </a>  
                    </span>
                </div>
                </div> 
                
                
                <div class="addcart_btn">
                  <a href="#" class="input-group d-flex">
                    <div class="leftside">
                      <div class="input-group-left">
                        <i class="fas fa-shopping-cart"></i>
                      </div>
                    </div>
                    <div id="input_div">
                      <input class="btn-qty" type="button" value="-" id="moins" @click="updateCart(false)" />
                      <input class="qty btn-qty" type="text" :value="itemQty" id="count" />
                      <input class="btn-qty" type="button" value="+" id="plus" @click="updateCart(true)" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closemodalPopup()" data-dismiss="modal">Close</button>
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
   created() {
    this.getInitialValue();
  },
  props: {
    productDetails: {
      type: Array,
      default: {},
    },
    productID: String,
    cartItemDetails: Number,
    productVariantDetails:{
      type: Object,
      default:{}  
    },
    productOptionList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      productModalID: this.productID,
      options: [],
      variantDetails: this.productVariantDetails,
      itemQty:this.cartItemDetails
    };
  },
  methods: {
    getInitialValue() {
      for(let i=0;i<this.variantDetails.productVariantValues.length;i++)
      {
        let option = [];
        option[this.variantDetails.productVariantValues[i].codeName]=this.variantDetails.productVariantValues[i].value
        this.options.push(option);
      }
    },
    updateCart(cartitemStatus) {
      let isnewproduct=false;
      if(cartitemStatus)
      {
        if(this.itemQty==0)
        {
          this.itemQty=1;
          isnewproduct=true;
        } 
        else
        {
          ++this.itemQty;
        } 
      }
      else
      {
        --this.itemQty;
      }
        
      this.$emit(
        "updateCartDetails",
        this.variantDetails,
        this.productID,
        cartitemStatus,
        isnewproduct
      );
    },
    closemodalPopup()
    {
       this.$emit(
        "closeProductpopup"
      );
    },
    updateProductOption(title,value)
    {
      for(let option=0;option<this.options.length;option++)
      {
        var keys = Object.keys( this.options[option] );
        if(keys==title)
        {
          this.options.splice(option, 1);
          let t=[];
          t[title]=value;
          this.options.push(t);
        }
      }
      let prod_var=0;
      do
      {
        let isProductVariant=this.checkProductVariant(this.productDetails[prod_var].productVariantValues);
        if(isProductVariant)
        {
          this.variantDetails=this.productDetails[prod_var];
        }
        prod_var++
      }while(prod_var<this.productDetails.length)
      this.itemQty=0;
    },
    inArray:function(checkValue,optionTitle) {
                    var length = this.options.length;
                    for(var i = 0; i < length; i++) {
                        if(this.options[i][optionTitle] === checkValue) return true;
                    }
                    return false;
    },
    checkProductVariant(productVariant)
    {
        for(let productvar=0;productvar<productVariant.length;productvar++)
        {
          if(!this.inArray(productVariant[productvar]['value'],productVariant[productvar]['codeName']))
          {
              return false;
          }
        }
        return true;
    }
  },
};
</script>
    <style lang="css" scoped>
</style>