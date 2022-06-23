import { Injectable, NotFoundException } from '@nestjs/common'
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { PatchBoardDto } from './dto/patch-board.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './board.entity'
import { Repository } from 'typeorm'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find()
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    })

    await this.boardRepository.save(board)

    return board
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    return found
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }

  async updateBoardStatus(patchBoardDto: PatchBoardDto): Promise<Board> {
    const { id, status } = patchBoardDto

    const board = await this.getBoardById(id)
    board.status = status

    await this.boardRepository.save(board)

    return board
  }
}
