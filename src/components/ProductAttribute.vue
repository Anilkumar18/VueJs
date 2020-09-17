<template>
  <div>
    <p
      class="attributes"
      data-toggle="modal"
      data-target="#viewcartmodal"
      @click="showdetails()"
      v-if="attributeLength>1"
    >
      <a href="javascript:;" class="link_text">
        +{{attributeLength}}
        <span v-for="(element, index) in attribute">{{ element.codeName+'/' }}</span>
      </a>
    </p>
    <div class="form-group" v-if="attributeLength<2">
      <select
        class="selectvariant form-control"
        @change="onVariantChange($event)"
        v-model="attribute_key"
      >
        <option value>Select Variant</option>
        <option
          v-for="(attributeElement , index) in dropdownValues"
          v-bind:data-id="123"
          v-bind:value="attributeElement[0].value"
        >{{ attributeElement[0].value}}</option>
      </select>
    </div>
  </div>
</template>
<script>
module.exports = {
  created() {
    this.getInitialValue();
  },
  props: {
    attribute: Array,
    alt: String,
    variant: Array,
  },
  data() {
    return {
      dropdownValues: [],
      attributeLength: this.attribute.length,
      attribute_key: "",
      productvariantCollection: this.variant,
    };
  },
  methods: {
    getInitialValue() {
      let variantLength = this.attribute.length;
      if (variantLength < 2) {
        for (let i = 0; i < this.productvariantCollection.length; i++) {
          this.dropdownValues.push(
            this.productvariantCollection[i]["productVariantValues"]
          );
        }
      }
    },
    onVariantChange(event) {
      this.$emit("updateProductVariant", event.target.value);
    },
    showdetails() {
      this.$emit("showProductVariantDetails", 0, "");
    },
  },
};
</script>

