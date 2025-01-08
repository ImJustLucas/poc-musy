import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Game } from "./schema/game.schema";
import { Model } from "mongoose";

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  async createOne(game: Game): Promise<Game> {
    return this.gameModel.create(game);
  }
}
