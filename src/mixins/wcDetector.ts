export const DetectWC = {
  methods: {
    isWC: function () {
      return process.env.WC == "true" ? true : false;
    }
  }
};
