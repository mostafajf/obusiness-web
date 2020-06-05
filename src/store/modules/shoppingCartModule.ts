import { ProductDto } from "@/api/models/ProductDto";
import { DateTime } from "luxon";
import { CommonHelper } from "@/api/helpers/commonHelper";
import { PriceHelper } from "@/api/helpers/priceHelper";

export default {
  state: {
    items: [],
    deliveryFee: 0
  },
  mutations: {
    addItem(state, item: ProductDto) {
      const now = DateTime.local().toUTC();
      const find = state.items.filter(st =>
        ProductDto.equals(new ProductDto(st), new ProductDto(item))
      );
      if (find.length == 0) {
        item.uuid = CommonHelper.uuid();
        state.items?.splice(0, 0, item);
      } else {
        find[0].count += item.count;
        find[0].dateCreated = now;
      }
    },
    removeItem(state, itemId) {
      const find = state.items.find(st => st.uuid == itemId);
      state.cartItems.splice(state.items.indexOf(find), 1);
    },
    updateQuantity(state, { itemId, newQuantity }) {
      const find = state.items.find(st => st.uuid == itemId);
      if (find != null) {
        find.count = newQuantity;
      }
    },
    clear(state) {
      state.items = [];
    }
  },
  getters: {
    cartValue(state) {
      let sum = 0;
      state.items.forEach(item => {
        item = new ProductDto(item);
        let itemSum = 0;
        itemSum += item.price;
        itemSum += item.modifiers.reduce(
          (acc, md) => acc + md.price * md.count,
          0
        );
        for (const mod of item.modifiers) {
          itemSum += mod.subModifiers.reduce(
            (acc, smd) => acc + smd.Price * smd.count * mod.count,
            0
          );
        }
        sum += itemSum * item.count;
      });
      return sum;
    },
    totalTax(state) {
      const cartItems = state.items;
      let totalTax = 0.0;
      for (let i = 0; i < cartItems.length; i++) {
        const item = new ProductDto(cartItems[i]);
        if (!item.taxRate) {
          item.taxRate = 0;
        }

        const itemTaxAmount = PriceHelper.fix2digit(
          PriceHelper.computeItemTax(item.price, item.taxRate)
        );
        totalTax += itemTaxAmount * item.count;

        for (const modifier of item.modifiers) {
          totalTax +=
            PriceHelper.calculateUnitPriceTax(modifier, item.taxRate) *
            modifier.count *
            item.count;

          for (const subModifier of modifier.subModifiers.flatMap(
            sb => sb.modifiersList
          )) {
            totalTax +=
              PriceHelper.calculateUnitPriceTax(subModifier, item.taxRate) *
              subModifier.count *
              modifier.count *
              item.count;
          }
        }
      }

      return PriceHelper.fix2digit(totalTax);
    },
    itemsCount(state) {
      return state.items.reduce((acc, x) => x.count + acc, 0);
    },
    totalValue(state, getters) {
      let total = getters.cartValue + state.deliveryFee;
      //- Discount()

      if (total < 0) {
        total = 0;
      }

      // round to the nearest cent if it has more than 2 decimal places
      total = Math.round(total * 100) / 100;

      return PriceHelper.fix2digit(total);
    }
  }
};
