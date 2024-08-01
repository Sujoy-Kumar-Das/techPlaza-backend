import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/SendResponse';
import { productService } from './products.service';

const createProductController = catchAsync(async (req, res) => {
  const result = await productService.createProductService(req.body);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    message: 'Product created successfully',
    success: true,
  });
});

export const productController = {
  createProductController,
};
