import { Router, type Request, type Response } from "express";
// import Zod validators
import {
  zUserId,
  zItemId,
  zItemPostBody,
  zItemPutBody,
  zItemDeleteBody
} from "../libs/zodValidators.js";

import { authenticateToken } from "../middlewares/authenMiddleware.js";
// import types
import type { Item, CustomRequest } from "../libs/types.ts";
// import database
import { items } from "../db/db.ts";
//import uuid
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET /api/vXXX/items/:userId 
router.get("/:userId", authenticateToken, (req: Request, res: Response) => {
  try {
    const payloaduser = (req as CustomRequest).user;
    const { userId } = req.params;

    if (!payloaduser?.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (payloaduser.userId === userId) {
      const data: Item[] = items.filter((item) => item.userId === userId);

      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "items for user ID " + userId + " not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: data
      });
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden access"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

// POST /api/vXXX/items/:userId, body = {new item data}
// add a new Item for userId
router.post("/:userId",async (req: Request, res: Response) => {
  try {
    const payloaduser = (req as CustomRequest).user;
    const { InputuserId } = req.params;
    const { product_name, unit_price, quantity, category } = req.body;

    if(!payloaduser?.userId){
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if(payloaduser.userId === InputuserId){
      const newItem: Item = {
        userId: InputuserId,
        itemId: uuidv4(),
        product_name : product_name,
        unit_price: unit_price,
        quantity: quantity,
        category: category
      };

      items.push(newItem);

      return res.status(201).json({
        success: true,
        message: "New Item has been added successfully",
        data: newItem
      });
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden access"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

// Delete /api/vXXX/items/:userId
// ลบข้อมูลโดยรับ itemId จาก request body
router.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const payloaduser = (req as CustomRequest).user;
    const { InputuserId } = req.params;
    const { itemId } = req.body;

    if (!payloaduser?.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (payloaduser.userId === InputuserId) {
      if (!itemId) {
        return res.status(400).json({
          success: false,
          message: ""
        });
      }

      const itemIndex = items.findIndex(
        (item) => item.itemId === itemId && item.userId === InputuserId
      );

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "There are no items with item ID "+ itemId + " for user Id " + InputuserId
        });
      }

      const deletedItem = items.splice(itemIndex, 1)[0];

      return res.status(200).json({
        success: true,
        message: "Item ID "+ itemId + " for user Id " + InputuserId + "has been delete successfully",
        data: deletedItem
      });
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden access"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

export default router;