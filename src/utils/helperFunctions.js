const createResponse = (
    data = null,
    status = true,
    message = "Your Message",
    code = 200,
    ...args
) => {
    return { data: data, status: status, message: message, code: code, ...args };
};

const createError = (
    code = 200,
    message = "Error Message",
    status = false,
    data = null,
    error = null
) => {
    return {
        code: code,
        status: status,
        message: message,
        data: data,
        error: error,
    };
};

function validateError(fields, data) {
    let errorFields = [];
    for (const field of fields) {
        if (!data[field]) {
            // Field isn't present, end request
            errorFields.push(`${field} is missing`);
        }
    }
    if (errorFields.length) {
        return createError(
            200,
            "Please fill all required fields",
            false,
            [],
            JSON.stringify(errorFields)
        );
    }

    return false;
}

function requestPagination(cursor) {
    return cursor ? { skip: 1, cursor: { id: cursor } } : {};
}
function returnPagination(data, limit) {
    let nextCursor;
    const lastItem = data[limit - 1];

    if (lastItem) nextCursor = lastItem.id;
    return { nextCursor };
}

function requestAdminPagination(perPage, skip) {
    return perPage > 0 && skip >= 0
        ? { take: perPage, skip: skip * perPage }
        : {};
}

function returnAdminPagination(page, count, skip) {
    return {
        total: count,
        hasNextPage: skip + page < count,
        hasPreviousPage: skip > 0,
    };
}


function mergePaginationRecord(data) {
    return data["0"] ? { pagination: data["0"], ...data } : data;
}

const seprateUserBusinessFields = (data) => {
    const BusinessKeys = [
        "businessName",
        "description",
        "address",
        "category",
        "subCategory",
        "website",
    ];
    var businessData = {};
    for (var i = 0; i <= BusinessKeys.length; i++) {
        if (data[BusinessKeys[i]]) {
            businessData[BusinessKeys[i]] = data[BusinessKeys[i]];
            console.log("businessData", businessData);
            delete data[BusinessKeys[i]];
        }
    }
    console.log("businessData out", businessData);
    return { user: data, business: businessData };
};

function customString(length = 8) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports = {
    createResponse,
    createError,
    mergePaginationRecord,
    validateError,
    requestPagination,
    returnPagination,
    seprateUserBusinessFields,
    customString,
    returnAdminPagination,
    requestAdminPagination,
};
