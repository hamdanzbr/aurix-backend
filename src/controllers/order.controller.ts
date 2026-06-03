import {
  Request,
  Response,
} from "express";

import { createOrderSchema } from "../validations/order.validation";

import { cancelOrderService, createOrderService, getMyOrdersService, getOrderByIdService, getOrderStatsService } from "../services/order.service";

export const createOrderController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const data =
        createOrderSchema.parse(
          req.body
        );

      const userId =
        req.user
          ?.userId as string;

      const order =
        await createOrderService(
          userId,
          data
        );

      return res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };
export const getMyOrdersController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.userId as string;

      const page =
        Number(
          req.query.page
        ) || 1;

      const limit =
        Number(
          req.query.limit
        ) || 10;

      const filters = {
        keyword:
          req.query
            .keyword as string,

        status:
          req.query
            .status as string,

        sortBy:
          req.query
            .sortBy as string,

        startDate:
          req.query
            .startDate as string,

        endDate:
          req.query
            .endDate as string,

        page,
        limit,
      };

      const result =
        await getMyOrdersService(
          userId,
          filters
        );

      return res.status(200).json({
        success: true,

        data:
          result.orders,

        pagination: {
          page,
          limit,
          total:
            result.total,

          totalPages:
            Math.ceil(
              result.total /
                limit
            ),
        },
      });
    } catch (
      error: any
    ) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  interface OrderParams {
  orderId: string;
}

export const getOrderByIdController =
  async (
    req: Request<OrderParams>,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.userId as string;

      const order =
        await getOrderByIdService(
          userId,
          req.params.orderId
        );

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  export const cancelOrderController =
  async (
    req: Request<OrderParams>,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.userId as string;

      const order =
        await cancelOrderService(
          userId,
          req.params.orderId
        );

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  export const getOrderStatsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.userId as string;

      const stats =
        await getOrderStatsService(
          userId
        );

      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (
      error: any
    ) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };