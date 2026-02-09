import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB();

const TABLE_NAME = process.env.TABLE_NAME;
const PK_VALUE = "counter";

function resp(statusCode, body) {
	return {
		statusCode,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
		body: JSON.stringify(body),
	};
}

export const handler = async (event) => {
	const method =
		event?.requestContext?.http?.method || event?.httpMethod || "GET";

	if (method === "OPTIONS") return resp(200, { ok: true });

	try {
		if (method === "GET") {
			const r = await dynamodb
				.getItem({
					TableName: TABLE_NAME,
					Key: { pk: { S: PK_VALUE } },
					ConsistentRead: true,
				})
				.promise();

			const value = r.Item?.value?.N ? parseInt(r.Item.value.N, 10) : 0;
			return resp(200, { value });
		}

		if (method === "PUT") {
			const r = await dynamodb
				.updateItem({
					TableName: TABLE_NAME,
					Key: { pk: { S: PK_VALUE } },
					UpdateExpression: "ADD #v :inc",
					ExpressionAttributeNames: { "#v": "value" },
					ExpressionAttributeValues: { ":inc": { N: "1" } },
					ReturnValues: "UPDATED_NEW",
				})
				.promise();

			const value = parseInt(r.Attributes.value.N, 10);
			return resp(200, { value });
		}

		return resp(405, { error: "Method not allowed" });
	} catch (e) {
		return resp(500, { error: String(e) });
	}
};
