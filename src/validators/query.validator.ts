import joi from "joi";

export class QueryValidator {
  static limit = joi.number().default(5);
  static page = joi.number().default(1);
  static sortedBy = joi.string().default("createdAt");

  static query = joi.object({
    limit: this.limit,
    page: this.page,
    sortedBy: this.sortedBy,
  });
}
