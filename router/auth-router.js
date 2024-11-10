const express = require('express');
const router = express.Router();
const authController = require("../controller/auth-controller");

router.post("/add-party-details", authController.AddPartyDetails);
router.get("/view-grey-parties", authController.ViewGreyParties);
router.get("/view-dye-parties", authController.ViewDyeParties);

router.post("/add-quality", authController.AddQuality)
router.get("/view-quality", authController.ViewQuality)

router.post("/add-grey-purchase", authController.AddGreyPurchase);
router.get("/view-grey-purchase",authController.ViewGreyPurchase)
router.get("/view-grey-purchase-by-challan/:challan",authController.ViewGreyPurchaseByChallan);
router.put('/modify-grey-purchase/:id', authController.ModifyGreyPurchase);

router.post("/add-grey-stock",authController.AddGreyStock);
router.get("/view-grey-stock",authController.ViewGreyStock);
router.get("/view-grey-stock-by-challan/:challan", authController.ViewGreyStockByChallan);
router.get("/available-grey-quality",authController.AvailableGreyQuality);
router.get("/view-pending-stock",authController.ViewPendingStock);

router.post("/add-dye-inward",authController.AddDyeInward);
router.get("/view-tejas-stock",authController.ViewTejasStock);

router.post("/login",authController.Login);
module.exports = router;