import { asyncErrorWrapper } from "../middleware/catchAsyncErrors.js";
import Layout from "../models/Layout.js";
import ErrorHandler from "../utilities/ErrorHandler.js";
import * as cloudinary from "cloudinary";

export const layoutUpdate = asyncErrorWrapper(async (req, res, next) => {
  try {
    const { type } = req.body;
    if (type === "layout") {
      const { banner } = req.body;
      if (!banner) {
        return next(new ErrorHandler("Please provide banner info", 400));
      }
      const layout = await Layout.findOne({});
      if (!layout) {
        await Layout.create({
          banner: {
            title: banner.title,
            subTitle: banner.subTitle,
          },
        });
      }
      if (banner.image.url.includes("data:image/")) {
        if (layout?.banner?.image?.public_id) {
          await cloudinary.v2.uploader.destroy(layout.banner.image.public_id);
        }
        const imageUploaded = await cloudinary.v2.uploader.upload(
          banner.image.url,
          {
            folder: "layout",
          }
        );

        const public_id = imageUploaded.public_id;
        const imageUrl = imageUploaded.secure_url;
        const layoutObj = {
          banner: {
            image: {
              public_id,
              url: imageUrl,
            },
            title: banner.title,
            subTitle: banner.subTitle,
          },
        };
        console.log(layoutObj);
        if (!layout) {
          await Layout.create({ banner: layoutObj.banner });
        }
        const returnLayout = await Layout.findOneAndUpdate({}, layoutObj, {
          new: true,
        });
        res.status(200).json({
          success: true,
          layout: returnLayout,
        });
      } else {
        const layoutObj = {
          banner: {
            title: banner.title,
            subTitle: banner.subTitle,
          },
        };
        const returnLayout = await Layout.findOneAndUpdate({}, layoutObj, {
          new: true,
        });
        res.status(200).json({
          success: true,
          layout: returnLayout,
        });
      }
    }

    if (type === "faq") {
      try {
        const { faq } = req.body;
        if (!Array.isArray(faq))
          return next(new ErrorHandler("Please provide faq in Array", 400));
        if (!question || !answer) {
          return next(
            new ErrorHandler("Please provide question and answer", 400)
          );
        }
        const layout = await Layout.findOne({});
        if (!layout) {
          await Layout.create({ faq: [{ question, answer }] });
          return res.status(200).json({
            success: true,
            layout,
          });
        }
        layout.faq.push({ question, answer });
        await layout.save();
        res.status(200).json({
          success: true,
          layout,
        });
      } catch (error) {
        next(new ErrorHandler(error, 500));
      }
    }

    if (type === "categories") {
      try {
        const { catogries } = req.body;
        if (!catogries) {
          return next(new ErrorHandler("Please provide catogries", 400));
        }
        const layout = await Layout.findOne({});
        if (!layout) {
          await Layout.create({ categories: catogries });
          return res.status(200).json({
            success: true,
            layout,
          });
        }
        await catogries.map((categories) => {
          layout.categories.push(catogries);
        });
        await layout.save();
        res.status(200).json({
          success: true,
          layout,
        });
      } catch (error) {}
    }
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// get layout route
export const getLayout = asyncErrorWrapper(async (req, res, next) => {
  try {
    const layout = await Layout.findOne({});
    if (!layout) {
      return next(
        new ErrorHandler("Please Create a default Layout to get", 404)
      );
    }
    res.status(200).json({
      success: true,
      layout,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});
