import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/db";
import TableData from "../../models/tableDataModel";

export interface Data {
  _id: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: string;
  country: string;
  phone: string;
}

async function getApiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();
    const tableData: Array<Data> = await TableData.find();

    res.status(200).json(tableData);
  } catch (err) {
    res.status(500).json({
      error: "database error",
    });
  }
}
export default getApiHandler;
