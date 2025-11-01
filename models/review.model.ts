import mongoose, { Document, Model, Schema } from "mongoose";
import ApiError from "../utils/ApiError.js";

export interface IReview extends Document {
    reviewer: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
    images?: string[];
    helpfulCount: number;
}

export interface IReviewModel extends Model<IReview> {
    calcAverageRatings(productId: mongoose.Types.ObjectId): Promise<void>;
}

const ReviewSchema = new Schema<IReview, IReviewModel>(
    {
        reviewer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Reviewer (User ID) is required"],
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required"],
        },
        rating: {
            type: Number,
            required: [true, "Review rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },
        comment: {
            type: String,
            trim: true,
            maxlength: [500, "Review message cannot exceed 500 characters"],
        },
        images: [String],
        helpfulCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

ReviewSchema.index({ productId: 1, reviewer: 1 }, { unique: true });

ReviewSchema.statics.calcAverageRatings = async function (productId) {
    const result = await this.aggregate([
        { $match: { productId } },
        {
            $group: {
                _id: "$productId",
                avgRating: { $avg: "$rating" },
                numOfReviews: { $sum: 1 },
            },
        },
    ]);

    const Product = mongoose.model("Product");

    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            averageRating: result[0].avgRating,
            totalReviews: result[0].numOfReviews,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            averageRating: 0,
            totalReviews: 0,
        });
    }
};

ReviewSchema.post("save", async function (doc, next) {
    await (doc.constructor as IReviewModel).calcAverageRatings(doc.productId);
    next();
});

ReviewSchema.post("deleteOne", async function (doc, next) {
    await (doc.constructor as IReviewModel).calcAverageRatings(doc.productId);
    next();
});

ReviewSchema.pre("validate", function (next) {
    if (this.rating <= 0) {
        return next(new ApiError(400, "Rating must be greater than 0"));
    }
    next();
});

const Review = mongoose.model<IReview, IReviewModel>("Review", ReviewSchema);
export default Review;
