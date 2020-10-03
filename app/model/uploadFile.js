'use strict'

const moment = require('moment');
module.exports = app => {
    const {
        DATE,
        STRING,
        ENUM,
        INTEGER,
        VIRTUAL
    } = app.Sequelize;
    const UploadFile = app.model.define('upload_file', {
        id: {
            type: INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        _id: {
            type: VIRTUAL,
            get() {
                return this.id;
            },
            set(value) {
                throw new Error('not set!');
            }
        },
        upload_type: ENUM('local', 'qn', 'oss'),
        uploadPath: STRING(500),
        qn_bucket: STRING(500),
        qn_accessKey: STRING(500),
        qn_secretKey: STRING(500),
        qn_zone: STRING(500),
        qn_endPoint: STRING(500),
        oss_bucket: STRING(500),
        oss_accessKey: STRING(500),
        oss_secretKey: STRING(500),
        oss_region: STRING(500),
        oss_endPoint: STRING(500),
        oss_apiVersion: STRING(500),

        createdAt: {
            type: DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
            type: DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'doracms_upload_file',
        underscored: true,
    });

    UploadFile.sync({
        force: false
    });

    return UploadFile;
};

