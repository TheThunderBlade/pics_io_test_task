import { IUser } from "../models/user.model";
import elasticClient from "../config/elasticSearch";

class eUserService {
  private _datasetName: string;
  private _user: IUser;
  constructor(datasetName: string, user: IUser) {
    this._datasetName = datasetName;
    this._user = user;
  }

  insertUser = async () => {
    const index = `index_${this._user.userName}_${this._datasetName}`;
    const params = {
      index,
      body: { userName: this._user.userName },
    };
    await elasticClient
      .index(params)
      .then(() => {
        console.log("Document added successfully");
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  };

  getUserByIndex = async () => {
    const index = `index_${this._user.userName}_${this._datasetName}`;
    const { hits } = await elasticClient.search({
        index,
        body: {
          query: {
            match_all: {},
          },
        },
      });
      return hits.hits;
  }
}

export default eUserService;
