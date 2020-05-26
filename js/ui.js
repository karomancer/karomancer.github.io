

/**
 * Byline
 */

const splash = new Vue({
  el: "#splash",
  data: {
    byline,
  },
  methods: {
    changeByline: function () {
      this.byline = "Creative Coder";
    },
  },
});
