<template>
  <span v-if="priceclass" v-html="'$'+value"></span>
  <span v-else-if="!priceclass" class="cross" v-html="'$'+value"></span>
</template>
<script>
module.exports = {
  props: {
    value: Number,
    currency: String,
    priceclass: Boolean,
  },
  data() {
    return {
      inputValue: this.getInitialValue(),
    };
  },
  methods: {
    getInitialValue() {
      let propValue = this.value;
      if (typeof propValue === "string") {
        // Replace any backslashes passed from the server
        propValue = propValue.replace(/\\/g, "");
      }
      return propValue;
    },
  },
};
</script>

