const _ = require('lodash');

const uploadFileRule = (ctx) => {
    return {

        upload_type: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", ["上传方式"])
        },

    }
}



let UploadFileController = {

    async list(ctx) {

        try {

            let queryObj = {};

            let uploadFileList = await ctx.service.uploadFile.find({
                isPaging: 0
            }, {
                query: queryObj,
            });

            if (_.isEmpty(uploadFileList)) {
                uploadFileList = [];
                let configInfo = await ctx.service.uploadFile.create({
                    upload_type: 'local'
                })
                uploadFileList.push(configInfo);
            }
            // console.log('--uploadFileList--', uploadFileList);
            ctx.helper.renderSuccess(ctx, {
                data: uploadFileList[0]
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }
    },


    async update(ctx) {


        try {

            let fields = ctx.request.body || {};
            const formObj = {
                upload_type: fields.type,
            }

            ctx.validate(uploadFileRule(ctx), formObj);

            if (fields.type == 'local') {
                Object.assign(formObj, {
                    uploadPath: fields.uploadPath
                })
            } else if (fields.type == "qn") {
                Object.assign(formObj, {
                    qn_bucket: fields.qn_bucket,
                    qn_accessKey: fields.qn_accessKey,
                    qn_secretKey: fields.qn_secretKey,
                    qn_zone: fields.qn_zone,
                    qn_endPoint: fields.qn_endPoint,
                });
            } else if (fields.type == "oss") {
                Object.assign(formObj, {
                    oss_bucket: fields.oss_bucket,
                    oss_accessKey: fields.oss_accessKey,
                    oss_secretKey: fields.oss_secretKey,
                    oss_region: fields.oss_region,
                    oss_endPoint: fields.oss_endPoint,
                    oss_apiVersion: fields.oss_apiVersion
                });
            }

            await ctx.service.uploadFile.update(fields.id, formObj);

            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }

    },


    async removes(ctx) {

        try {
            let targetIds = ctx.query.ids;
            await ctx.service.uploadFile.removes(targetIds);
            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },

}

module.exports = UploadFileController;