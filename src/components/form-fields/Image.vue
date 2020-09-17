<template>
  <img v-if="src!=null" :src="src" :alt="alt" class="card-img-top" />
  <img v-else src="http://placehold.it/100?text=No-Image" :alt="alt" class="card-img-top" />
</template>
<script>
module.exports = {
  props: {
    src: {
      type: Array,
      default: [],
    },
    alt: String,
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

