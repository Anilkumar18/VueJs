<template>
  <div class="product">
    <div class="container-fluid">
      <div class="col-md-10 m-auto">
        <div class="row">
          <div
            class="col-md-3 productDetails"
            v-for="(product, index) in productSelectedDetails"
            :key="index"
          >
            <div v-for="(productvariants, variantsindex) in product" :key="variantsindex">
              <ProductListDisplay
                :productID="variantsindex"
                :productDetails="productvariants"
                :productsVariantCollection="productDetails[index]"
                @showProductDetails="productDetailsPopUp"
              ></ProductListDisplay>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Button trigger modal -->

    <modal
      v-if="showProductPopUp"
      :productDetails="modalPopProductData"
      :productID="modalProductID"
    ></modal>
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
        this.getProductOptions(responseData[i]["productID"],responseData[i]["variants"]);
        
      }
    },
    productDetailsPopUp(value, id) {
      this.showProductPopUp = true;
      this.modalPopProductData = value;
      this.modalProductID = id;     
    },
    printArray:function(item, index){
      this.modalProductDetails.push({item});
      return {index:item};
     },
     getProductOptions(productID,productvariants)
     {
       var productOptions = [];
       var Options = [];
       for(let variants=0;variants<productvariants.length;variants++)
       {
         for(let variantAttribute=0;variantAttribute<productvariants[variants]['productVariantValues'].length;variantAttribute++)
         {
           var product_option_list = [];
           var code = productvariants[variants]['productVariantValues'][variantAttribute]['codeName'];
           var attributevalue = productvariants[variants]['productVariantValues'][variantAttribute]['value'];
           product_option_list[code]=attributevalue;
           
           Options.push(product_option_list);
         }
       }
        productOptions[productID]=Options;
       this.productOptionsDetails.push(productOptions);
     }
  },
};
</script>



