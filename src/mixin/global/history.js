import React from "react";
import {ZonedDateTime} from "@js-joda/core";

export default {
    emergency: {
        buildOrderModal: orderId => {
            return {
                name: `Mission #${orderId}`,
                id: orderId,
                date: ZonedDateTime.now()
            }
        }
    }
}