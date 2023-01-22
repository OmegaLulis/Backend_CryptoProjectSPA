import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {WatchList} from "./models/watchlist.model";
import {CreateAssetResponse} from "./response";

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(WatchList) private readonly watchlistRepository: typeof WatchList) {}

    async createAsset(user,dto): Promise<CreateAssetResponse>{
        const watchlist = {
            user: user.id,
            name: dto.name,
            assetID: dto.assetID,
        }
        await this.watchlistRepository.create(watchlist)
        return watchlist
    }

    async deleteAsset(userID: number,assetID: string): Promise<boolean>{
        await this.watchlistRepository.destroy({where: {id: assetID, user: userID}})
        return true
    }

}
