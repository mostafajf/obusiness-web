import { DateTime } from "luxon";
import { OperatingHours } from "../models/OperatingHours";
export class DatetimeHelper {
  static getCurrentDate(zone: string): DateTime {
    const now = DateTime.local();
    if (zone && now.setZone(zone).isValid) {
      return now.setZone(zone);
    }
    return now;
  }
  static openCloseTime(operatingHours: OperatingHours[]) {
    const date = DateTime.local();
    if (!operatingHours || operatingHours.length == 0) {
      return {
        openTime: null,
        closeTime: null
      };
    }
    let operatinHour;
    operatingHours.forEach(item => {
      if (item.dayOfWeek.toLowerCase() == date.toFormat("cccc").toLowerCase()) {
        operatinHour = item;
      }
    });
    if (operatinHour && operatinHour.openingTime && operatinHour.closingTime) {
      const operationTime = {
        openTime: DateTime.fromFormat(
          operatinHour.openingTime,
          "HH:mm:ss"
        ).toFormat("hh:mm a"),
        closeTime: DateTime.fromFormat(
          operatinHour.closingTime,
          "HH:mm:ss"
        ).toFormat("hh:mm a")
      };
      return operationTime;
    }
    return null;
  }
}
